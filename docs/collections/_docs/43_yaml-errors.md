---
title: Fix a YAML configuration error
subtitle: Correct the edit that stopped the site build
---

Use this guide when your publishing run or local preview reports a YAML error,
especially after editing `_config.yml` or a post's settings block.

## Locate the failed edit

Open the failed run in **Actions**, then its failed build step. Note the filename
and line mentioned in the error. Compare that area and the preceding lines with
your last commit; a missing quote can make the parser report a later line.

For a local setup, run `bundle exec jekyll build` in your site directory to see
the error. You do not need a local installation just to read the Actions log.

## Correct the formatting

Edit the existing file rather than replacing it with a full sample configuration.
Use spaces for indentation, keeping sibling settings aligned. Complete any
unclosed quotes and remove duplicate top-level sections by merging their entries.

Quote text containing a colon followed by a space, for example:

```yaml
title: "Notes: fieldwork"
```

Quote hexadecimal colors so `#` is not interpreted as a comment. For example,
within your existing `chulapa-skin.vars` mapping:

```yaml
primary: "#285d70"
```

Keep the surrounding indentation when applying that line; do not create a
second `chulapa-skin` mapping. Use actual booleans such as `false`, not the string
`"false"`, for boolean settings.

A [YAML checker](https://www.yamllint.com/) can help locate formatting mistakes.
A syntax pass alone does not prove the configuration is correct: check duplicate
keys and compare skin names, provider identifiers and field locations with
[Global settings](./02-config) and [Theming](./03-theming).

## Rebuild and verify

Commit the correction to the publishing branch and check the next **Actions**
run. For a local preview, restart Jekyll after changing `_config.yml`. Once the
build and deployment succeed, check the changed setting on the public website.
If parsing succeeds but the setting has no effect, inspect its documented
location and defaults rather than repeatedly changing the YAML formatting.
