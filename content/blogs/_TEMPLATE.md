---
title: ""            # Post title. Sentence case, specific, under ~70 characters.
slug: ""             # URL segment: lowercase words joined by hyphens. Must equal this file's name without ".md".
description: ""      # 1-2 sentences, ~150 characters. Used on cards, the meta description, social cards and RSS.
publishedAt: ""      # "YYYY-MM-DD". The listing sorts newest first. Keep the quotes.
updatedAt: ""        # "YYYY-MM-DD" after a meaningful edit, otherwise leave as "". Shown on the post, used in JSON-LD and the sitemap.
tags: []             # 2-5 lowercase tags, e.g. [hardware, keyboards]. Shown as chips (not filterable yet).
coverImage: ""       # e.g. /images/blogs/<slug>/cover.webp (ideally 1200x630). Leave "" to get a generated gradient cover.
coverAlt: ""         # Alt text for the cover. Required whenever coverImage is set.
draft: true          # true = visible only in `npm run dev`. Change to false to publish.
---

<!--
AI AUTHORING GUIDE
==================
Copy this file to content/blogs/<slug>.md, fill in the frontmatter above, replace the example
body below with the real post, and delete this whole comment. (The renderer drops HTML comments,
so leaving it in is harmless, but remove it anyway.)

The blog lives on https://riyaz-ahmed.com and posts render at /blogs/<slug>. Adding a post never
needs a code change: it is a Markdown file plus images.

VOICE
- First person, practical and honest about mistakes. Riyaz's own experience is the point.
- Concrete over generic: real part names, real numbers, what actually went wrong.
- Plain words. No filler intros, no "in this post we will explore".

DEFAULT SKELETON (tutorials with learnings)
1. Hook: one or two sentences on what was built or solved and why it was interesting.
2. Context: why I did this, what I started with.
3. The steps or the problem: numbered steps for tutorials; for deep dives, symptom, investigation, cause, fix.
4. What I learned: woven into the steps, and pulled out in callouts.
5. ## Key takeaways: a short bullet list (see below).
6. A short wrap-up: what I'd do differently, what's next.
For short or opinion pieces drop the numbered steps and the context section. Keep the hook, the
argument or story, and the takeaways.

HEADINGS AND THE TABLE OF CONTENTS
- Never write a "# " H1. The title comes from the frontmatter.
- Use "## " for sections and "### " for subsections. Only these two levels feed the "On this page"
  table of contents, so keep the titles short (2-5 words).
- Every heading gets an anchor link automatically.

CODE
- Always put a language on code fences: ```bash, ```ts, ```c, ```json, ```text (use text for plain output).
- Highlighting happens at build time and each block gets a Copy button. Use `inline code` for
  commands, file names and keys inside sentences.

IMAGES
1. Put the raw photos for the post in content/blogs/raw/<slug>/ (this folder is git-ignored; originals are never committed).
2. Run `npm run blog:images -- <slug>`. It writes compressed .webp files (max 1600px wide) to
   public/images/blogs/<slug>/. Do not convert images by hand. If it reports a skipped file
   (for example an iPhone HEIC), export that photo as JPEG and run it again.
3. Reference images as /images/blogs/<slug>/<name>.webp.
4. Name the cover photo cover.* (for example cover.jpg). The script also makes og.jpg from it for social cards.
   Then set coverImage: /images/blogs/<slug>/cover.webp and coverAlt in the frontmatter.
5. Every image needs alt text and a caption. The caption goes in the title position:
   ![Alt text describing the photo](/images/blogs/<slug>/plate-mounted.webp "Caption shown under the image")
   Readers can click an image to enlarge it.

CALLOUTS (styled with the site colors: Tip and Note are cyan, Warning is pink)
> [!TIP]
> Something that saves the reader time.

> [!NOTE]
> Extra context that is useful but not essential.

> [!WARNING]
> Something that can break hardware, lose data or waste an evening.

TABLES
Use GitHub-style tables for parts lists and comparisons. Keep the columns few and the cells short.

KEY TAKEAWAYS
End the post (before any short wrap-up) with a section titled exactly "## Key takeaways" followed
by a bullet list of 3-5 items. The page styles that section as a highlighted box.

LINKS
Plain Markdown links. External links open in a new tab automatically. Link to other posts as /blogs/<slug>.

FILENAME AND SLUG
The file is content/blogs/<slug>.md and the frontmatter slug must be identical. The build fails with
a message naming the file if a required field is missing, a date is malformed or the slug differs.

PUBLISHING
Set draft: false, set publishedAt, then run `npm run build`. The post appears on /blogs, at
/blogs/<slug>, in the sitemap and in the RSS feed (/blogs/rss.xml). Drafts only show in `npm run dev`.

CROSS-POSTING (dev.to, Hashnode)
This site is the canonical home. When copying a post elsewhere, change image paths to absolute URLs
(https://riyaz-ahmed.com/images/blogs/<slug>/<name>.webp) and set the platform's canonical URL to
https://riyaz-ahmed.com/blogs/<slug>.
-->

A one or two sentence hook: what I built or fixed, and why it was worth writing down.

## Why I did this

Context in a paragraph or two. What I started with, and what I wanted out of it.

## The steps

1. First step, with the command or action.
2. Second step.
3. Third step.

### A subsection

Use `###` for a sub-step or a detour. Inline `code` works inside sentences.

```bash
npm run blog:images -- my-post-slug
```

![Alt text describing the photo](/images/blogs/my-post-slug/example.webp "Caption shown under the image")

| Part | Why I picked it |
|---|---|
| Example part | One short reason |

> [!TIP]
> Something that would have saved me time.

> [!WARNING]
> Something that can go wrong, and how to avoid it.

## Key takeaways

- The one thing I'd tell a friend starting this.
- The mistake that cost me the most time.
- What I'd do differently next time.
