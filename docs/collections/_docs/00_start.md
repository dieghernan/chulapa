---
title: Start a site with <span class="chulapa">Chulapa</span>
subtitle: Publish your first site, then make it your own
excerpt: Create a blog, edit your first post and add a photograph using GitHub in your browser.
show_toc: true
---

## Start with the GitHub template

You can create your first site entirely in your browser. You need a free
[GitHub account](https://github.com/signup), but no software installation.
GitHub stores your files and publishes them as a website. Jekyll turns your
text files into web pages; <span class="chulapa">Chulapa</span> supplies their design.

Use [<span class="chulapa">Chulapa</span> 101](https://github.com/dieghernan/chulapa-101),
a ready-made blog with sample articles, an About page and search.
[Preview the blog](https://dieghernan.github.io/chulapa-101/) to see what you will get.
Follow the steps below before exploring other installation methods.

### 1. Create your site

1. Sign in to GitHub and [open the template](https://github.com/dieghernan/chulapa-101/generate).
2. Choose a **Repository name**, for example `my-blog`, and create a public
   repository. A repository is the folder containing your site's files on GitHub.
3. In your new repository, open **Settings > Pages**. Under **Build and
   deployment**, choose **GitHub Actions** as the source.

### 2. Change the name and author

Open the **Code** tab of your repository, click `_config.yml`, then use the
pencil button to edit it. This file holds settings for the whole site.
Find the existing entries below and replace their values; do not add a second
copy. For a GitHub user named `ana` and a repository named `my-blog`:

```yaml
title: "Ana's blog"
description: "Stories and photographs from my travels"
repository: ana/my-blog
url: "https://ana.github.io"
```

Use your own username and repository name. Find the existing `author` section
and change `name` to your name. Keep the indentation of the other entries:

```yaml
author:
  name: "Ana"
```

Click **Commit changes**, enter a short description such as “Set my site
name”, and save directly to the default branch (`main` or `master`). A commit
is a saved change. Saving starts the publishing process automatically.

You can leave the other settings as they are for now. The template sets the
website's path for you, so you do not need to edit `baseurl`.

### 3. Open your published website

Open the **Actions** tab to follow publishing progress. Wait until the latest
website publishing run finishes successfully, then go to **Settings > Pages**
to find your website address. Open it in a new tab: you should see the sample
blog with your site's name.

If a run fails, open it to see the error. Check your last edit, especially
indentation in `_config.yml`; see [troubleshooting](./05-faq).

### 4. Write your first post

In the **Code** tab, open `_posts/`, choose a sample `.md` file and click the
pencil button. Files ending in `.md` use Markdown, a simple way to write text
with headings, links and images.

Keep the settings between the opening `---` lines and change the `title`.
Replace the text below the second `---` with your own story, for example:

```markdown
This is my first story.

## A place I visited

I enjoyed **walking by the river**.

[Read more about the place](https://example.org/)
```

Save with **Commit changes**. After publishing finishes, refresh your website
and open the edited article. For a new article rather than an edited sample,
see [Create a post](./04-layouts#create-a-post).

Also edit `_pages/about.md` to introduce yourself and replace the sample
contact details. Keep the home page filename `index.html`.

### 5. Add a photograph

1. In your repository, open `assets/img/`, choose **Add file > Upload files**,
   and upload a photograph named, for example, `river.jpg`. Save the upload.
2. Edit your post and add the following where you want the image to appear.
   Change the description to describe your photograph:

{% raw %}
```liquid
![A riverside path beneath green trees]({{ '/assets/img/river.jpg' | relative_url }})
```
{% endraw %}

3. Save the post, wait for publishing and check that the photograph appears.

The description helps readers who cannot see the image. The `relative_url`
part makes the image address work when your site is published under a repository
name. Use an image you have permission to publish and add a credit if required.

### 6. Choose a design

You can keep the current design or choose one from the [skin previews](../skins).
A skin is a ready-made combination of colors and fonts.
In `_config.yml`, find `chulapa-skin` and change its existing `skin` value:

```yaml
chulapa-skin:
  skin: journal
```

Keep any other entries in that section. Save, wait for publishing and refresh
your website to see the new design. See [personalization](./03-theming) for
more choices.

## What to do next

Your site is now ready for your own content. Replace the remaining sample
articles, images and contact links before sharing it.

- [Global settings](./02-config): change site details, menu and footer links.
- [Layouts and snippets](./04-layouts): add posts, pages, galleries and videos.
- [Theming](./03-theming): choose colors and fonts.
- [Frequently asked questions](./05-faq): solve common editing and publishing problems.

For optional local preview and further customization of this template, see
[its README](https://github.com/dieghernan/chulapa-101#add-your-content).

## Explore minimal examples

**For readers who already use Jekyll.** These examples are smaller starting
points for different kinds of sites. Unlike the template above, they do not
include automatic publishing. Each folder has configuration and sample content.

### Choose a starting point

| Site | What you get | Preview | Files |
| --- | --- | --- | --- |
| Personal blog | A recent-post card index and a first story | [Blog demo](../demo/starter-personal-blog) | [Copy the files](https://github.com/dieghernan/chulapa/tree/main/examples/personal-blog) |
| Technical blog | A post with code, diagrams, equations and a TOC | [Technical demo](../demo/starter-technical-blog) | [Copy the files](https://github.com/dieghernan/chulapa/tree/main/examples/technical-blog) |
| Portfolio | A projects collection, card index and two project pages | [Portfolio demo](../demo/starter-portfolio) | [Copy the files](https://github.com/dieghernan/chulapa/tree/main/examples/portfolio) |
| Project | A landing page with source and getting-started buttons | [Project demo](../demo/starter-project) | [Copy the files](https://github.com/dieghernan/chulapa/tree/main/examples/project) |

These examples follow the theme's default branch. Mermaid is available in the
development version after v2.1.0 and is not in the v2.1.0 gem or pinned release.
For reproducible theme updates, append an existing release tag to `remote_theme`.
See [installation](./01-install) for release and gem options.

### Make it your own

1. Copy the **contents** of one example folder into your own site repository.
   Keep `_posts` or `_projects` at the site root, alongside `_config.yml`.
2. Edit `title`, `description` and `repository`. Set `url` to your site's origin
   and `baseurl` to `/repository` for a project site or `""` for a root site.
3. Replace the sample content and placeholder links. A blog post goes in
   `_posts/YYYY-MM-DD-title.md`; a portfolio project goes in `_projects/`.
4. Choose a [skin](./03-theming) or keep the example's preset. The presets are
   `journal`, `gitdev`, `lux` and `flatly`, respectively.

You do not need to copy theme layouts, includes or assets. The remote theme
supplies them during the build. The Gemfile includes the dependencies needed
for a local build.

### Preview locally

Install Ruby and Bundler, then run these commands from your copied site:

```sh
bundle install
bundle exec jekyll serve --url http://localhost:4000 --baseurl ""
```

Open <http://localhost:4000>. The local URL options leave your publication
settings unchanged. Restart the server after changing `_config.yml`.
Remote-theme downloads require network access.

### Publish and extend

For a new site with a publishing workflow already included, start with the
[chulapa-101 template](https://github.com/dieghernan/chulapa-101). Use the small
examples above to explore layouts or copy their content into your site.

Follow the [GitHub Actions deployment instructions](./01-install#2-remote-theme-method).
Copying an example alone does not configure hosting. These folders do not
include a deployment workflow.

Once your content is in place, add [search and comments](./02-config), explore
[layouts and snippets](./04-layouts) or see [sites using Chulapa](../showcase).
For filtering or a documentation sidebar, you will need additional customization.
