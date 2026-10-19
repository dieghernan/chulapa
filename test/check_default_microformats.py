"""Optional real-parser check: install mf2py in a temporary environment, then pass fixtures."""
import sys
from pathlib import Path
import mf2py

root = Path(sys.argv[1])
for name in ['default', 'plain']:
    data = mf2py.parse(doc=(root / f'{name}.html').read_text(), url=f'https://example.com/project/{name}.html')
    entries = [item for item in data['items'] if 'h-entry' in item['type']]
    assert len(entries) == 1, name
    props = entries[0]['properties']
    assert props['name'] == [f'Title {name}' if name == 'default' else 'Plain title']
    assert props['url'] == [f'https://example.com/project/{name}.html']
    content = props['content'][0]
    for text in ['First section', 'Editorial paragraph', 'Author list one', 'Author list two', 'Second section', '  preserved spaces', 'Final editorial paragraph.']:
        assert text in content['value'], (name, text)
    assert 'https://example.com/source' in content['html']
    for token in ['Open Sidebar', 'Close Sidebar', 'id="toc"', 'id="sidetoc"', '<nav', '<button']:
        assert token not in content['html'], (name, token)
authored = mf2py.parse(doc=(root / 'authored-toc.html').read_text(), url='https://example.com/project/authored-toc.html')
entry = next(item for item in authored['items'] if 'h-entry' in item['type'])
assert 'id="markdown-toc"' in entry['properties']['content'][0]['html']
assert 'Final editorial paragraph.' in entry['properties']['content'][0]['value']
for name in ['archive', 'indexcategory', 'cloudtag', 'cloudcategory', 'cloudtag2', 'cloudcategory2']:
    data = mf2py.parse(doc=(root / f'{name}.html').read_text(), url=f'https://example.com/project/{name}.html')
    feeds = [item for item in data['items'] if 'h-feed' in item['type']]
    assert len(feeds) == 1 and not any('h-entry' in item['type'] for item in data['items']), name
    feed = feeds[0]
    assert feed['properties']['name'] == [f'Title {name}']
    assert 'content' not in feed['properties'] and 'published' not in feed['properties'], name
    entries = [item for item in feed.get('children', []) if 'h-entry' in item['type']]
    assert len(entries) == 3, name
    assert {item['properties']['name'][0] for item in entries} == {'Entry 01', 'Entry 02', 'Entry 03'}
    for item in entries:
        assert item['properties']['url'][0].startswith('https://example.com/project/example/2024/01/')
        assert item['properties']['published'][0].startswith('2024-01-')
print('mf2py: complete editorial content without theme TOCs; six feeds retain names, URLs and dated child entries.')
