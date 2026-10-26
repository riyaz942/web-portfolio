---
title: "Hello, world: a tour of this blog"
slug: hello-world
description: A sample draft that exercises every feature the blog supports, from callouts to captioned images.
publishedAt: "2026-10-26"
updatedAt: ""
tags: [meta, writing]
coverImage: ""
coverAlt: ""
draft: true
---

This is a sample post. It only shows up in `npm run dev`, and it exists to prove that every part of the blog renders properly.

## Headings and structure

Sections use `##`, and each one gets an anchor link plus an entry in the table of contents. Read more about the build tooling at [Next.js](https://nextjs.org).

### Subsections

Subsections use `###` and show up indented in the table of contents.

| Feature | Where it shows up |
|---|---|
| Table of contents | Sticky sidebar on desktop, collapsible box on mobile |
| Callouts | Tip, note and warning boxes |
| Code | Highlighted at build time with a copy button |

## Callouts and code

> [!TIP]
> Callouts are plain blockquotes with a marker on the first line.

> [!WARNING]
> Warnings are pink, and should be used sparingly.

```bash
npm run dev
```

```ts
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

![A doodled background pattern from the home page](/images/creative-section/background-doodle.webp "Images get captions from the title, and open larger when clicked")

## Key takeaways

- Posts are Markdown files with a frontmatter header.
- Drafts stay out of production builds.
- Everything is rendered at build time.
