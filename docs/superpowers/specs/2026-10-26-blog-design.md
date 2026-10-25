# Blog section — design

**Date:** 2026-10-26
**Status:** Draft, awaiting approval
**Branch at time of writing:** `upgrade/next`

## Intent

Riyaz wants a personal tech blog living inside the existing portfolio site. The home page stays the portfolio; `/blogs` lists posts and `/blogs/<slug>` shows one. There are no posts yet. Posts will be written as Markdown files in this repo, usually drafted with the help of an AI assistant, so the repo needs a template that an AI can read and follow to produce a correctly shaped post.

Topics are work- and technology-related, and the formats are mixed: step-by-step tutorials woven with personal learnings, deep dives into problems, shorter pieces. The first planned post is a single long tutorial-plus-learnings post about building his first mechanical keyboard (photo-heavy, parts list, steps, "what I'd do differently").

**Why own the blog instead of only using dev.to/Hashnode:** the portfolio site is the canonical home (owns URLs, sends readers to the portfolio, builds the domain's search ranking). Posts may later be cross-posted to dev.to/Hashnode with a canonical URL pointing back here. That cross-posting is a manual step outside this project, but the template should keep it easy.

## Goals

1. `/blogs` listing page and `/blogs/<slug>` post page, consistent with the existing site's look (dark `#333` background, cyan→pink accent gradient, same sticky header pattern as `/projects`).
2. Posts authored as Markdown files with a frontmatter header; adding a post = adding a file (plus images) and rebuilding. No code changes per post.
3. A Markdown template file with frontmatter and an AI authoring guide, so a fresh AI session can write a correct post from it.
4. Solid metadata: per-post title/description, Open Graph + Twitter card, canonical URL, article structured data (JSON-LD), sitemap entries, RSS feed.
5. A "Blog" entry point on the home page's contact section ("Let's Connect") alongside GitHub, LinkedIn, Email, Resume.

## Non-goals (for now)

Comments, search, newsletter signup, view counts/analytics, post series/multi-part linking, a CMS, automated cross-posting to dev.to. All should remain addable later without rework, but none are built now.

## Anti-goals

- Blog pages must not inherit the home page's heavy animation (loader, Lottie, parallax background). Reading should be fast and calm. Light page transitions like `/projects` are fine.
- Adding a post must not require editing TypeScript.
- Must not break the static export (`output: "export"`, deployed at `https://riyaz-ahmed.com`, served from the domain root). No server, no runtime data fetching.
- Draft posts must never appear in the production build (listing, post pages, sitemap, RSS).

## Constraints

- Next.js 15 App Router, React 19, TypeScript, Tailwind 4, static export with `images.unoptimized: true`. Node 20.
- Existing conventions to follow: `generateStaticParams` + `generateMetadata` pattern in `src/app/projects/[id]/page.tsx`; route-level `layout.tsx` with metadata title template (`src/app/projects/layout.tsx`); `src/app/sitemap.ts` and `robots.ts`; `SITE_URL` from `src/constants/site.ts`; view-transition navigation helpers in `src/hooks/useViewTransition.ts`; `ScrollRestore` component.
- Images on the site are `.webp`; blog images should be too, and since Next image optimization is off, they must be pre-compressed.

## Decided by Riyaz

- **Authoring:** Markdown files in this repo.
- **URLs:** `/blogs` (listing), `/blogs/<slug>` (post).
- **Listing layout:** card grid, matching the `/projects` card style. Each card shows cover image, title, short description, tags, date, and reading time. (Mockup "A" in the brainstorm session.)
- **Post layout:** single column of article content with a **sticky table of contents beside it on desktop** that highlights the current section while scrolling; on mobile the TOC becomes a collapsible "On this page" box above the content. (Mockup "A".)
- **No series feature.** Long topics are one long post with a TOC.
- **Home page entry point:** a "Blog" item in the contact section's link grid (`src/data/contactItems.ts` / `src/components/ContactSection.tsx`).

## Content model (frontmatter)

Every post starts with this frontmatter. Field names are a proposal the builder may refine, but the set of information is decided.

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Post title. |
| `slug` | yes | URL segment, lowercase-hyphenated, unique. Should match the filename. |
| `description` | yes | 1–2 sentences, ~150 chars. Used on listing cards, meta description, social cards, RSS. |
| `publishedAt` | yes | `YYYY-MM-DD`. Listing sorts newest first. |
| `updatedAt` | no | `YYYY-MM-DD`. Shown on the post if present; used in JSON-LD/sitemap. |
| `tags` | yes | 2–5 lowercase tags. Displayed as chips (not filterable in v1). |
| `coverImage` | no | Path like `/images/blogs/<slug>/cover.webp`, ideally 1200×630. Used on card, post header, and social card. |
| `coverAlt` | no | Alt text for the cover. Required if `coverImage` is set. |
| `draft` | no | Default `false`. `true` = visible only in `next dev`, excluded from production build entirely. |

Reading time is computed from the body, not stored.

The build should fail loudly (clear error naming the file) on missing required fields, a malformed date, or duplicate slugs. That matters because an AI will be writing these files.

## Markdown features the post page must render

Plain Markdown with GitHub-flavored extensions. Not MDX; posts contain no components.

- `##` / `###` headings, each with an anchor link; these feed the TOC. The post title comes from frontmatter, so bodies contain no `#` H1.
- Tables (parts lists, comparisons).
- GitHub-style callouts: `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]` (at minimum TIP and WARNING), styled with the site accent colors (cyan for tip/note, pink for warning).
- Fenced code blocks with language-aware syntax highlighting at build time (no client-side highlighter), plus a copy button.
- Inline code, lists including numbered steps, blockquotes, links (external links open in a new tab).
- Images with captions. Caption convention to be chosen by the builder and documented in the template (e.g., the image's title attribute `![alt](src "caption")`). Clicking an image opens a larger view (simple lightbox), which matters for close-up build photos.
- A "Key takeaways" box. This can be a convention (e.g., a final `## Key takeaways` section the page styles distinctly) rather than custom syntax; builder's choice, documented in the template.

## Pages

### `/blogs` (listing)
- Sticky header like `/projects`: back-to-Home button, divider, "Blog" in gradient.
- Page heading "My Blog" (gradient on "Blog") with a one-line subtitle (copy is the builder's call; Riyaz can tweak).
- Responsive card grid (1 / 2 / 3 columns), same card styling and hover glow as project cards, entrance animation like `/projects`.
- **Cover fallback (my call):** a post without `coverImage` gets a generated cover using the cyan→pink gradient with the post title, so cards never look empty. The same fallback applies to the post header.
- **Empty state:** until the first post exists, show a friendly "First post coming soon" message, not a blank grid.

### `/blogs/<slug>` (post)
- Header with back-to-Blog button.
- Tags, title, date (+ "Updated" date if present), reading time, cover image.
- Article body using the features above, with comfortable reading typography (a readable measure of ~65–75 characters per line).
- Sticky TOC on desktop (from `##` and `###`), active-section highlighting; collapsible box on mobile.
- Footer: older / newer post links.

### Home page
- Add a "Blog" item to `contactItems` with a fitting icon in `ContactIcon`. It's an internal link, so it opens in the same tab (the current `target="_blank"` logic keys off the label and must not apply here). **My call:** the grid is currently 2×2; with five items the builder should make the layout look intentional (e.g., the Blog card spanning both columns, or placed first) rather than leaving an orphan card.

## Metadata, SEO, and feeds

- `src/app/blogs/layout.tsx` with metadata (title "Blog", description) following the projects layout pattern.
- Per post, via `generateMetadata`: `title`, `description`, `alternates.canonical` = `${SITE_URL}/blogs/<slug>`, Open Graph `type: "article"` with `publishedTime`, `modifiedTime`, `tags`, and the cover image (fallback `/og-image.png`); Twitter `summary_large_image`.
- JSON-LD `BlogPosting` script on each post (headline, description, image, datePublished, dateModified, author "Riyaz Ahmed", url).
- `sitemap.ts`: add `/blogs` and each published post (with `lastModified`).
- RSS 2.0 feed at `/blogs/rss.xml`, generated at build (static route handler with `dynamic = "force-static"`, or a build script), with full absolute URLs. Advertise it via `<link rel="alternate" type="application/rss+xml">` in the blogs layout.

## The authoring template

A file at `content/blogs/_TEMPLATE.md` (location is my call; files starting with `_` are ignored by the loader). It contains:

1. The frontmatter block with every field, inline comments explaining each, `draft: true` by default.
2. An **AI authoring guide** (as a Markdown comment or a clearly marked section the AI deletes) covering:
   - Voice: first person, practical, honest about mistakes; Riyaz's own experience is the point.
   - Default skeleton: hook → why I did this / context → the steps or the problem (numbered steps for tutorials) → what I learned (woven in, plus callouts) → `## Key takeaways` → short wrap-up. Which parts to drop for shorter or opinion pieces.
   - Rules: no `#` H1; `##` for sections and `###` for subsections (these become the TOC, so keep titles short); always set a language on code fences; every image needs alt text and a caption; images live in `public/images/blogs/<slug>/`, as `.webp`, compressed, roughly 1600px wide max; how to write callouts, tables, and the takeaways section.
   - Filename = `<slug>.md`, and the slug must match the frontmatter.
   - Cross-posting note: when copying to dev.to/Hashnode, convert image paths to absolute `https://riyaz-ahmed.com/...` URLs and set the platform's canonical URL to the post's URL here.
3. A short example section demonstrating each supported element, so the AI (and Riyaz) can see the syntax.

The README should get a short "Writing a blog post" section pointing to the template.

## Image preparation (my call)

Phone photos come off the camera as multi-MB JPEG/HEIC files, and an AI writing a post can't meet the webp/size rules without a tool. So:

- Add an `npm run` script (e.g., `blog:images <slug>`) using `sharp` (a dev dependency) that converts everything in a raw-photo folder for that post into compressed `.webp` files at most 1600px wide, written to `public/images/blogs/<slug>/`. Raw originals are not committed. The builder picks the input-folder convention and adds it to `.gitignore`.
- At build time, generate a JPG social image from each post's cover for Open Graph/Twitter, since `.webp` support in link previews (LinkedIn in particular) is unreliable. The frontmatter stays as decided.
- The template tells the AI to run the script, not to hand-convert images.
- The build warns (but doesn't fail) on blog images that aren't `.webp` or exceed roughly 500 KB.

## Left to the builder

- Markdown pipeline choice (e.g., unified/remark/rehype or similar), syntax-highlighting library and theme (should suit the dark site), and the callout implementation, as long as everything is rendered at build time.
- Exact frontmatter parsing/validation approach and where the loader lives (e.g., `src/lib/blog.ts`).
- Component breakdown, exact typography scale, TOC scroll-spy implementation, lightbox implementation.
- Whether to reuse view-transition helpers for listing↔post navigation (light transitions only).
- Adding `.superpowers/` to `.gitignore` (brainstorm mockups live there).
- A sample post: the builder should create one draft example post (e.g., `content/blogs/hello-world.md`, `draft: true`) to exercise every feature in dev, and keep it out of production.

## Success looks like

- Riyaz (or an AI given only `_TEMPLATE.md`) writes `building-my-first-keyboard.md` plus images, flips `draft` to `false`, runs `npm run build`, and the post appears on `/blogs` and at `/blogs/building-my-first-keyboard` with TOC, callouts, highlighted code, captioned zoomable photos, correct social preview, and entries in the sitemap and RSS.
- The home page is unchanged apart from the new Blog link.
- `npm run build` and `npm run lint` pass.
