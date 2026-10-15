---
title: Find changes missing from your website
subtitle: Check the saved edit, publishing run and public address
---

Use this guide when you have edited your site's files but the public website
still shows old content or a new article is missing. Keep the existing setup
while checking the steps below.

## Check the saved edit and branch

In the repository's **Code** tab, open the edited file. Confirm that your change
is saved in a commit, not only in the editor. Check the branch selector: the
starter publishes from `main` or `master`. For another setup, check the publishing
workflow or **Settings > Pages** for its source.

If your edit is on a separate branch or an unmerged pull request, use your
normal review/merge process to place it on the publishing branch. A preview
site and the public website can show different commits.

## Check the publishing run

Open **Actions** and find the publishing run for that commit and branch. Wait
for it to finish. If it fails, open the failed step and read the first relevant
error; do not change unrelated settings to try to fix it.

For a `_config.yml` syntax error, follow [Fix a YAML configuration error](./43-yaml-errors).
For missing plugins or theme dependencies, use your
[installation method](./01-install) or the [migration checks](./07-migration#common-migration-problems).

## Check the right website

Open the website address in **Settings > Pages**, then refresh the affected
page. Check that you are visiting the public site rather than GitHub's file
preview or another deployment. For a project site, retain its repository path.
If the build succeeded but publication failed, inspect the deployment step too.

For a local preview, restart Jekyll after changing `_config.yml`. A successful
local build alone does not publish those files to GitHub Pages.

## Check a missing post

Verify the file is in `_posts/` and named `YYYY-MM-DD-title.md`, with a real,
non-future date. Check any explicit `date` or `published: false` in its settings
as well. Normal builds omit future-dated and unpublished posts.

Use [Create a post](./15-create-post) to compare the file structure. Check its
actual public address, including any `permalink`: the Markdown source path is
not the post URL. If the article opens directly but is absent from an index,
check that index's filters and limits in the [layout reference](./04-layouts#index-category).
For a missing photograph, use [the image checks](./17-add-image#publish-and-check).

After correcting the identified problem, commit to the publishing branch,
wait for a successful deployment and verify the changed text or article again.
