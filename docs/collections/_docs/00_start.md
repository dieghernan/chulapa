---
title: Publish your first site with <span class="chulapa">Chulapa</span>
subtitle: See your own blog online using only your browser
excerpt: Create a blog from the template, change its title and edit a sample article, then open your published website.
show_toc: false
---

By the end of this tutorial, you will open a public blog with your own site title
and an edited article. Use the supplied example throughout; you can choose colors
and add photographs after publishing.

## Start with the GitHub template

Sign in to a free [GitHub account](https://github.com/signup) and use your browser,
preferably on a computer. No software installation is needed.
The [<span class="chulapa">Chulapa</span> 101 example](https://dieghernan.github.io/chulapa-101/)
shows the blog you will personalize.

Your copy will be public. Do not add passwords, private photographs or other
information you do not want to share.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

### 1. Create your site

[Open the template](https://github.com/dieghernan/chulapa-101/generate).
In **Repository name**, enter `my-blog`, choose **Public** and create the repository.
A repository is the folder containing your site's files on GitHub.

**Check:** the repository belongs to your account and shows a list of files.

### 2. Enable publishing

In your new repository, open **Settings > Pages**. Under **Build and deployment**,
select **GitHub Actions** as the source. The template already includes the files
needed to publish; you do not need to add a workflow.

**Check:** Pages shows GitHub Actions as its publishing source.

<span id="2-change-the-name-and-author"></span>

### 3. Name your blog

Return to **Code**, open `_config.yml` and click the pencil button. This is the
file for your site settings. Find these existing entries and replace their values.
For a GitHub account called `ana` and a repository called `my-blog`:

```yaml
title: "My first blog"
repository: ana/my-blog
url: "https://ana.github.io"
```

Use your own account and repository names. Replace the existing entries; do not
paste another copy or replace the whole file. Keep the other settings and spaces,
including `baseurl`: the template sets the site's path for you.

Click **Commit changes**. This saves a version of the file. Save to your
repository's default branch (`main` or `master` in the template); publishing
starts automatically. You can edit the article while it runs.

Next, open `index.html` in **Code** and click the pencil. Change only its existing
`title` line, between the opening `---` lines, to:

```yaml
title: "My first blog"
```

Keep the filename `index.html` and all other content. Save with **Commit changes**
on the same branch. This changes the heading visitors see on your home page.

**Check:** both saved files contain “My first blog” as their title.

### 4. Write your first post

In **Code**, open `_posts/`, choose a sample article and click the pencil button.
Keep its filename and the settings between the two `---` lines. Change only its
`title` entry to:

```yaml
title: "Hello, this is my website"
```

Replace the article text below the second `---` line with:

```markdown
Today I am publishing my first story.
```

Click **Commit changes** and save to the same default branch.

**Check:** the saved article contains your title and sentence.

<span id="3-open-your-published-website"></span>

### 5. Open your published website

Open **Actions** and find the publishing run for your latest saved change. Wait
for it to finish successfully. Publishing may take a few minutes.

Open the website address shown in **Settings > Pages**. Check the site title,
then open your edited article. If you are viewing files on `github.com`, return
to Pages and open the website address instead.

**You have published your first site:** its title is “My first blog” and the article
shows “Hello, this is my website” with your sentence below it.

If the run fails or your changes do not appear, follow
[the publishing checks](./05-faq#why-can-i-not-see-my-changes), then return here
to check the result.

## What to do next

Before sharing the site, replace the remaining sample articles and contact details
in `_pages/about.md`. Keep the home page filename `index.html`.

Choose a next task when you need it:

- [Add a photograph](./04-layouts#add-an-image).
- [Choose a design](./03-theming#skins).
- [Create a page](./04-layouts#create-a-page).

<details markdown="1">
<summary>Links from earlier versions of this guide</summary>

These destinations preserve links to tasks that used to follow the tutorial.
They are not additional steps needed to publish your first site.

- <span id="5-add-a-photograph"></span>[Add a photograph](./04-layouts#add-an-image).
- <span id="6-choose-a-design"></span>[Choose a design](./03-theming#skins).
- <span id="explore-minimal-examples"></span>[Explore minimal examples](./08-starter-examples).
- <span id="choose-a-starting-point"></span>[Choose a starting point](./08-starter-examples).
- <span id="make-it-your-own"></span>[Set up a copied starter](./09-run-starter#prepare-your-copy).
- <span id="preview-locally"></span>[Preview a starter locally](./09-run-starter#preview-the-site).
- <span id="publish-and-extend"></span>[Publish a copied starter](./09-run-starter#publish-the-site).

For your name and other profile details, use [site author settings](./02-config#site-author).

</details>
