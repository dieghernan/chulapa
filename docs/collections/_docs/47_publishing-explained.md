---
title: How publishing fits together
subtitle: The relationship between your files, the theme and the live website
---

A saved file and a published web page are different things. The repository holds
the source; a build turns it into a website; a hosting service makes the result
available to visitors. This distinction explains why an edit can be visible on
GitHub before it appears on your site.

## The parts and their roles

GitHub stores the files in a repository. Jekyll turns the content and settings
into web pages. <span class="chulapa">Chulapa</span> supplies their design and
supported features. GitHub Pages hosts the finished website.

With the starter template, GitHub Actions runs the publishing workflow when
changes reach its publishing branch. Actions runs the build and deployment;
it is not the theme or the place where readers visit the finished pages.
Other Jekyll sites can use different build and hosting services.

## Why saving does not always change the website

A commit records an edit in a branch. The public site reflects a successfully
published build, which can take time and can fail. An edit on a separate branch
or a pull-request preview does not by itself replace the public website.

The Markdown filename is also not necessarily the public page address. Jekyll's
permalink settings and a site's repository path can affect that address.
Preserving those settings matters when migrating an established site.

## Local preview and browser editing

A local preview runs on your own computer. It can help you check a change, but
it does not publish that change for visitors. The starter's browser-based path
uses GitHub's editor and Actions instead, so a first publication does not require
installing Ruby or understanding the build tooling in advance.

For a guided first result, use [Publish your first site](./00-start). For an
existing edit that has not appeared, use [Find missing changes](./42-unpublished-changes).
