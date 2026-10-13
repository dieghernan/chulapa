---
title: Start a site with <span class="chulapa">Chulapa</span>
subtitle: Publish your first site, then make it your own
excerpt: Create a blog, edit your first post and add a photograph using GitHub in your browser.
show_toc: true
---

## Start with the GitHub template

You only need a free [GitHub account](https://github.com/signup) and your browser.
The [<span class="chulapa">Chulapa</span> 101 template](https://github.com/dieghernan/chulapa-101)
includes a blog, sample articles, an About page and search.
[Preview it](https://dieghernan.github.io/chulapa-101/), then follow these steps.

### 1. Create your site

1. Sign in to GitHub and [open the template](https://github.com/dieghernan/chulapa-101/generate).
2. Choose a **Repository name**, for example `my-blog`, and create a public
   repository. A repository is the folder containing your site's files on GitHub.
3. In your new repository, open **Settings > Pages**. Under **Build and
   deployment**, choose **GitHub Actions** as the source.

### 2. Change the name and author

In **Code**, open `_config.yml` and click the pencil button. Replace these
existing values with your own details; do not add duplicate entries.
For GitHub user `ana` and repository `my-blog`:

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

Click **Commit changes** to save to the default branch (`main` or `master`).
This starts publishing automatically. Leave the other settings, including
`baseurl`, unchanged for now; the template sets the website path for you.

### 3. Open your published website

In **Actions**, wait for the latest publishing run to succeed. Open the website
address in **Settings > Pages**: your blog should show its new name.
If publishing fails, open the failed run and check its error; see
[troubleshooting](./05-faq#why-can-i-not-see-my-changes).

### 4. Write your first post

In **Code**, open a sample article in `_posts/` and click the pencil button.
Change `title` in the settings between the `---` lines, keeping the other
settings. Replace the text below that block with your story:

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

Keep the `relative_url` part so the image address works on your site. Describe
the photograph for readers who cannot see it, and add a credit if required.

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

**Optional, if you already use Jekyll.** These examples include configuration
and sample content, but no publishing workflow. For a first site, use the
template above.

### Choose a starting point

| Site | What you get | Preview | Files |
| --- | --- | --- | --- |
| Personal blog | A recent-post card index and a first story | [Blog demo](../demo/starter-personal-blog) | [Copy the files](https://github.com/dieghernan/chulapa/tree/main/examples/personal-blog) |
| Technical blog | A post with code, diagrams, equations and a TOC | [Technical demo](../demo/starter-technical-blog) | [Copy the files](https://github.com/dieghernan/chulapa/tree/main/examples/technical-blog) |
| Portfolio | A projects collection, card index and two project pages | [Portfolio demo](../demo/starter-portfolio) | [Copy the files](https://github.com/dieghernan/chulapa/tree/main/examples/portfolio) |
| Project | A landing page with source and getting-started buttons | [Project demo](../demo/starter-project) | [Copy the files](https://github.com/dieghernan/chulapa/tree/main/examples/project) |

These examples use the development version. Mermaid is not included in v2.1.0.
See [installation](./01-install) to choose a fixed release.

### Make it your own

1. Copy the **contents** of one example folder into your own site repository.
   Keep `_posts` or `_projects` at the site root, alongside `_config.yml`.
2. Edit `title`, `description` and `repository`. Set `url` to your site's origin
   and `baseurl` to `/repository` for a project site or `""` for a root site.
3. Replace the sample content and placeholder links. A blog post goes in
   `_posts/YYYY-MM-DD-title.md`; a portfolio project goes in `_projects/`.
4. Keep the example's design or [choose another skin](./03-theming).

### Preview locally

Install Ruby and Bundler, then run these commands from your copied site:

```sh
bundle install
bundle exec jekyll serve --url http://localhost:4000 --baseurl ""
```

Open <http://localhost:4000>. You need an internet connection for the theme
download. Restart the server after editing `_config.yml`.

### Publish and extend

To publish a minimal example, follow the
[GitHub Actions instructions](./01-install#2-remote-theme-method); copying its
files does not publish it. Filtering and documentation sidebars require extra
customization. For inspiration, see [sites using Chulapa](../showcase).
