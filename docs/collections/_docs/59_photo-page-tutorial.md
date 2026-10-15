---
title: Publish an illustrated page and add it to the menu
subtitle: A second browser-only tutorial for your published blog
excerpt: Create a photo page with the starter's image, add its menu link and check the published result.
show_toc: false
---

In this tutorial, you will publish a page called **My photo walk**, with a
photograph of Madrid and a **Photo walk** menu link. Follow the supplied names
and text so you can check each result; personalize them after finishing.

Start with the blog you published in [Publish your first site](./00-start).
You need its repository open on GitHub and the existing
`assets/img/madrid-at-night.jpg` photograph from the
<span class="chulapa">Chulapa</span> 101 template. No local software is needed.
If that file is missing, restore the starter photograph before starting.

## 1. Create the photo page

In your repository's **Code** tab, choose **Add file > Create new file**.
Name the file `_pages/photo-walk.md` and paste this complete example:

{% raw %}
```markdown
---
layout: default
header_type: base
title: "My photo walk"
permalink: /photo-walk/
---

## An evening in Madrid

![Buildings illuminated at night in Madrid]({{ '/assets/img/madrid-at-night.jpg' | relative_url }})

This is my first illustrated page.
```
{% endraw %}

Keep both `---` lines and the image expression exactly as shown. The expression
makes the photograph's address work when the site is under a repository path.
The words in square brackets describe the photograph for readers who cannot see it.

Click **Commit changes** and save on the same default branch used in the first
tutorial. Do not overwrite an existing file or page at `/photo-walk/`; this
exercise assumes that address is unused.

**Check:** `_pages/photo-walk.md` appears in your repository with the title,
heading, photograph expression and sentence above.

## 2. Add the menu link

Open `_config.yml` in **Code** and click the pencil button. Find the existing
`navbar` section, its `nav` list, and the **Categories** entry. Immediately
after its `url: /categories/` line, add these two lines:

```yaml
  - title: Photo walk
    url: /photo-walk/
```

Align the new dash with the existing menu-entry dashes and align `url` with
`title`. Keep About, Archive, Tags, Categories and the other site settings.
Do not add another `navbar` section or prefix `/photo-walk/` with your
repository name. Click **Commit changes** on the same branch.

**Check:** the existing menu entries remain, followed by Photo walk with
`url: /photo-walk/`. The menu label and page title can differ; here we use
Photo walk for the menu and My photo walk for the page.

## 3. Open your published page

In **Actions**, wait for the publishing run for your latest saved change to
finish successfully. Open the website address from **Settings > Pages**.
Follow **Photo walk** in the menu. On a narrow screen, open the menu first.

**Check:** the page shows **My photo walk**, **An evening in Madrid**, the Madrid
photograph and **This is my first illustrated page.** Open Home, then follow
Photo walk again to confirm that visitors can reach it from the site.

You have published a new illustrated page and made it reachable from the menu.
You can now replace its text and photograph while keeping its public address.

If the result is missing, use [the publishing checks](./42-unpublished-changes)
and return to the checks above. If the image is missing, compare its exact
filename and expression with step 1. Creating the file and adding a menu link
are separate edits; check that both were saved.

## After this exercise

For your own variations, use [Create a page](./16-create-page),
[Add an image](./17-add-image) and [Edit a menu link](./10-edit-menu).
These task guides cover choices beyond this fixed example.
