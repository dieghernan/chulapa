"""Offline tests: no external notifications or HTTP requests."""
from email.message import Message
from pathlib import Path
import tempfile
import json
import sys
import unittest
from unittest.mock import Mock, patch
from urllib.parse import parse_qs
from urllib.request import Request

import webmentions as wm

SOURCE = wm.SITE + '/new-post/'
TARGET = 'https://other.example/post/'
ENDPOINT = 'https://receiver.example/webmention'


def article(body, source=SOURCE):
    return (f'<html><head><link rel="canonical" href="{source}">'
            '<script type="application/ld+json">{"@type":"BlogPosting"}</script>'
            '</head><body><nav><a href="https://nav.example/">Nav</a></nav>'
            f'<article class="e-content">{body}</article>'
            '<footer><a href="https://footer.example/">Footer</a></footer></body></html>')


class WebmentionsTests(unittest.TestCase):
    def setUp(self):
        self.html = article(f'<p>Hello <a href="{TARGET}#section">world</a></p>')
        self.post = {'digest': wm.Page(self.html).digest, 'targets': [TARGET]}
        self.posts = {SOURCE: self.post}
        self.calls = []

    def request(self, url, data=None):
        self.calls.append((url, data))
        if url == SOURCE:
            return url, Message(), self.html
        if url == TARGET:
            return url, Message(), f'<link rel="webmention" href="{ENDPOINT}">'
        if url == ENDPOINT:
            self.assertEqual(parse_qs(data.decode()), {'source': [SOURCE], 'target': [TARGET]})
            return url, Message(), ''
        self.fail(url)

    def test_first_run_sends_existing_links(self):
        state = wm.process(self.posts, None, request=self.request)
        self.assertEqual(len(self.calls), 3)
        wm.process(self.posts, state, request=self.request)
        self.assertEqual(len(self.calls), 3)

    def test_new_post_sends_once_and_edited_post_resends(self):
        state = {'version': 2, 'posts': {}}
        wm.process(self.posts, state, request=self.request)
        self.assertEqual(len(self.calls), 3)
        wm.process(self.posts, state, request=self.request)
        self.assertEqual(len(self.calls), 3)
        self.html = self.html.replace('Hello', 'Updated')
        self.post['digest'] = wm.Page(self.html).digest
        wm.process(self.posts, state, request=self.request)
        self.assertEqual(len(self.calls), 6)

    def test_failed_submission_remains_pending(self):
        def fail(url, data=None):
            if data:
                raise TimeoutError('receiver unavailable')
            return self.request(url, data)
        state = {'version': 2, 'posts': {}}
        wm.process(self.posts, state, request=fail)
        self.assertNotIn(TARGET, state['posts'][SOURCE])
        wm.process(self.posts, state, request=self.request)
        self.assertIn(TARGET, state['posts'][SOURCE])

    def test_stale_live_article_is_not_sent(self):
        state = {'version': 2, 'posts': {}}
        self.html = self.html.replace('Hello', 'Old')
        wm.process(self.posts, state, request=self.request)
        self.assertEqual(self.calls, [(SOURCE, None)])
        self.assertEqual(state['posts'][SOURCE], {})

    def test_link_headers_preserve_quoted_separators_and_escapes(self):
        cases = [
            f'<{ENDPOINT}>; title="Webmention, endpoint"; rel="webmention"',
            f'<https://ignored.example/>; title="Other, link"; rel="alternate", <{ENDPOINT}>; rel=webmention',
            f'<{ENDPOINT}>; title="A; B, C"; rel="alternate Webmention"',
            '<' + ENDPOINT + r'>; title="A \"quoted, endpoint\""; rel="webmention"',
            f'<{ENDPOINT}>; rel="webmention"; title="A, B", <https://ignored.example/>; rel=alternate',
        ]
        for header in cases:
            with self.subTest(header=header):
                headers = Message()
                headers['Link'] = header
                self.assertEqual(wm.discover(TARGET, lambda u: (TARGET, headers, '')), ENDPOINT)
        headers = Message()
        headers['Link'] = f'<{ENDPOINT}?options=a,b>; title="Comma in URI"; rel=webmention'
        self.assertEqual(wm.discover(TARGET, lambda u: (TARGET, headers, '')), ENDPOINT + '?options=a,b')

    def test_quoted_title_cannot_supply_a_false_relation(self):
        headers = Message()
        headers['Link'] = '<https://ignored.example/>; title="A; rel=webmention, B"; rel=alternate'
        self.assertIsNone(wm.discover(TARGET, lambda u: (TARGET, headers, '')))
        headers['Link'] = f'<{ENDPOINT}>; title="Webmention, endpoint"; rel="webmention"'
        self.assertEqual(wm.discover(TARGET, lambda u: (TARGET, headers, '')), ENDPOINT)

    def test_no_endpoint_is_recorded(self):
        def unsupported(url, data=None):
            return url, Message(), self.html if url == SOURCE else '<p>No endpoint</p>'
        state = {'version': 2, 'posts': {}}
        wm.process(self.posts, state, request=unsupported)
        self.assertIn(TARGET, state['posts'][SOURCE])

    def test_header_discovery_precedes_relative_html_endpoint(self):
        headers = Message()
        headers['Link'] = '<https://ignored.example/>; rel="alternate", </wm>; rel="other webmention"'
        result = wm.discover(TARGET, lambda u: (TARGET, headers, f'<a rel="webmention" href="{ENDPOINT}">'))
        self.assertEqual(result, 'https://other.example/wm')
        result = wm.discover(TARGET, lambda u: (TARGET, Message(), '<a rel="webmention" href="../wm">'))
        self.assertEqual(result, 'https://other.example/wm')

    def test_excluded_endpoints_are_never_returned(self):
        for host in ('fed.brid.gy', 'sub.fed.brid.gy', 'FED.BRID.GY.'):
            html = f'<link rel="webmention" href="https://{host}/wm">'
            self.assertIsNone(wm.discover(TARGET, lambda u: (TARGET, Message(), html)))
        self.assertFalse(wm.allowed('https://fed.brid.gy@fed.brid.gy/wm'))
        self.assertFalse(wm.allowed('javascript:alert(1)'))
        self.assertFalse(wm.allowed('https://?query'))

    def test_redirects_block_bridgy_and_post_replay(self):
        handler = wm.SafeRedirects()
        with self.assertRaises(ValueError):
            handler.redirect_request(Request(TARGET), None, 302, '', {}, 'https://fed.brid.gy/wm')
        with self.assertRaises(ValueError):
            handler.redirect_request(Request(ENDPOINT, data=b'x'), None, 307, '', {}, TARGET)
        with self.assertRaises(ValueError):
            handler.redirect_request(Request(TARGET), None, 302, '', {}, SOURCE)

    def test_private_address_rejected(self):
        private = [(2, 1, 6, '', ('127.0.0.1', 443))]
        with patch.object(wm.socket, 'getaddrinfo', return_value=private):
            with self.assertRaises(ValueError):
                wm.validate_request(TARGET)


    def test_relation_tokens_are_case_insensitive(self):
        for token in ('Webmention', 'WEBMENTION', 'webmention'):
            for tag in ('link', 'a'):
                html = f'<{tag} rel="alternate {token}" href="{ENDPOINT}">'
                self.assertEqual(wm.discover(TARGET, lambda u: (TARGET, Message(), html)), ENDPOINT)
            headers = Message()
            headers['Link'] = f'<{ENDPOINT}>; REL="alternate {token}"'
            self.assertEqual(wm.discover(TARGET, lambda u: (TARGET, headers, '')), ENDPOINT)

    def test_connections_pin_validated_address_and_preserve_tls_hostname(self):
        public = [(wm.socket.AF_INET, wm.socket.SOCK_STREAM, 6, '', ('93.184.216.34', 443))]
        private = [(wm.socket.AF_INET, wm.socket.SOCK_STREAM, 6, '', ('127.0.0.1', 443))]
        for handler, scheme in ((wm.PublicHTTPHandler(), 'http'), (wm.PublicHTTPSHandler(), 'https')):
            with self.subTest(scheme=scheme):
                sock = Mock()
                context = Mock()
                handler._context = context
                def open_connection(factory, req, **kwargs):
                    connection = factory('other.example', timeout=15, **kwargs)
                    connection.connect()
                    self.assertEqual(connection.host, 'other.example')
                with patch.object(wm.socket, 'getaddrinfo', side_effect=[public, private]) as dns, \
                     patch.object(wm.socket, 'socket', return_value=sock), \
                     patch.object(handler, 'do_open', side_effect=open_connection):
                    getattr(handler, scheme + '_open')(Request(scheme + '://other.example/post/'))
                self.assertEqual(dns.call_count, 1)
                sock.connect.assert_called_once_with(('93.184.216.34', 443))
                if scheme == 'https':
                    context.wrap_socket.assert_called_once_with(sock, server_hostname='other.example')

    def test_redirect_destination_is_validated_before_any_connection(self):
        handler = wm.SafeRedirects()
        redirected = handler.redirect_request(Request(TARGET), None, 302, '', {}, 'https://redirect.example/')
        private = [(wm.socket.AF_INET, wm.socket.SOCK_STREAM, 6, '', ('127.0.0.1', 443))]
        with patch.object(wm.socket, 'getaddrinfo', return_value=private), \
             patch.object(wm.socket, 'socket') as create_socket:
            with self.assertRaises(ValueError):
                wm.PublicHTTPSHandler().https_open(redirected)
        create_socket.assert_not_called()

    def test_proxy_is_rejected_without_bypassing_it(self):
        with patch.object(wm, 'getproxies', return_value={'https': 'http://proxy.example:8080'}), \
             patch.object(wm, 'build_opener') as opener:
            with self.assertRaisesRegex(ValueError, 'direct egress'):
                wm.fetch(TARGET)
        opener.assert_not_called()

    def test_all_content_pages_and_editorial_links_only(self):
        body = (f'<p><a href="{TARGET}#a">A</a><a href="{TARGET}#b">B</a>'
                '<a href="/chulapa/internal/">Own site</a><a href="https://fed.brid.gy/web/a">Fed</a>'
                '<a href="mailto:a@example.com">Mail</a><img src="https://image.example/a.png"></p>')
        with tempfile.TemporaryDirectory() as folder:
            Path(folder, 'post.html').write_text(article(body))
            Path(folder, 'page.html').write_text(article(body, wm.SITE + '/docs/guide').replace('BlogPosting', 'WebPage'))
            posts = wm.posts_in(folder)
        self.assertEqual(set(posts), {SOURCE, wm.SITE + '/docs/guide'})
        self.assertEqual(posts[SOURCE]['targets'], [TARGET])

    def test_blog_is_external_but_docs_are_internal(self):
        self.assertTrue(wm.allowed(wm.ORIGIN + '/blog/post'))
        self.assertTrue(wm.allowed(wm.ORIGIN + '/chulapa-other'))
        self.assertFalse(wm.allowed(wm.SITE))
        self.assertFalse(wm.allowed(wm.SITE + '/docs/guide#anchor'))
        self.assertFalse(wm.allowed('http://DIEGHERNAN.github.io./chulapa/demo'))

    def test_first_cli_run_checkpoints_valid_state(self):
        process = wm.process
        checkpoints = []
        with tempfile.TemporaryDirectory() as folder:
            Path(folder, 'page.html').write_text(self.html, encoding='utf-8')
            state_path = Path(folder, 'state.json')

            def deliver(posts, state, checkpoint):
                def save():
                    checkpoint()
                    checkpoints.append(json.loads(state_path.read_text(encoding='utf-8')))
                return process(posts, state, request=self.request, checkpoint=save)

            with patch.object(sys, 'argv', ['webmentions.py', '--site', folder,
                                          '--state', str(state_path)]), \
                 patch.object(wm, 'process', side_effect=deliver):
                wm.main()
            self.assertEqual(checkpoints[0]['posts'][SOURCE][TARGET], self.post['digest'])

    def test_minimal_layout_uses_content_boundaries(self):
        html = (f'<a href="https://nav.example/">Nav</a>'
                '<div id="chulapa-content" tabindex="-1"></div>'
                f'<p><a href="{TARGET}">Content</a></p>'
                '<footer class="footer-chulapa text-center">'
                '<a href="https://footer.example/">Footer</a></footer>')
        page = wm.Page(html)
        self.assertEqual(page.targets, {TARGET})
        self.assertEqual(page.digest, wm.Page(html.replace('Footer</a>', 'Changed</a>')).digest)

    def test_invalid_state_and_empty_site_fail_closed(self):
        with self.assertRaises(ValueError):
            wm.process(self.posts, {'version': 9, 'posts': {}})
        with tempfile.TemporaryDirectory() as folder:
            with self.assertRaises(ValueError):
                wm.posts_in(folder)


if __name__ == '__main__':
    unittest.main()
