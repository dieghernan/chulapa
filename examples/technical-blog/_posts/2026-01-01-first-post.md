---
title: Document a workflow
layout: default
header_type: post
show_date: true
show_toc: true
mermaid: true
mathjax: true
include_on_feed: true
---

Describe a workflow with a diagram, an equation and a code example.

## Workflow

The process starts with writing and ends with publishing.

```mermaid
flowchart LR
  accTitle: Publishing workflow
  accDescr: Write content, build the site and publish it.
  A[Write] --> B[Build] --> C[Publish]
```

## Code

```js
const steps = ["Write", "Build", "Publish"];
console.log(steps.join(" -> "));
```

## Equation

$$a^2 + b^2 = c^2$$
