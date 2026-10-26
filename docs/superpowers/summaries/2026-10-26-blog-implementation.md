# Blog implementation: session summary

**Date:** 2026-10-26
**Branch:** `feature/blog` (from `upgrade/next`). Not pushed, no PR.
**Plan:** `docs/superpowers/plans/2026-10-26-blog.md`
**Spec:** `docs/superpowers/specs/2026-10-26-blog-design.md`

## What was built

All 9 plan tasks were done in order, with every step ticked in the plan. There are 11 commits on the branch: the 9 task commits, one commit ticking the final-verification boxes, and one review fix commit.

| Task | Commit message | What it added |
|---|---|---|
| 1 | `feat(blog): add post loader with frontmatter validation` | vitest setup, `src/lib/blog/posts.ts` and `types.ts`, fixtures. Also commits your `SITE_URL` change. |
| 2 | `feat(blog): add build-time markdown pipeline` | `markdown.ts` and four plugins: callouts, figures, takeaways, collect-headings. |
| 3 | `feat(blog): add metadata, JSON-LD and RSS builders` | `format.ts`, `seo.ts`, `rss.ts`. |
| 4 | `feat(blog): add image prep and prebuild OG/size checks` | `npm run blog:images -- <slug>`, a `prebuild` script, `sharp`. |
| 5 | `docs(blog): add AI authoring template and sample draft post` | `content/blogs/_TEMPLATE.md`, `hello-world.md` (draft), README section. |
| 6 | `feat(blog): add /blogs card-grid listing` | Listing page, `BlogCover`, empty state. |
| 7 | `feat(blog): add post page with sticky TOC, code copy and lightbox` | `/blogs/<slug>`, TOC with scroll-spy, copy buttons, shared `ImageLightbox`. |
| 8 | `feat(blog): add RSS feed and sitemap entries` | `/blogs/rss.xml`, sitemap entries. |
| 9 | `feat(blog): link blog from the contact section` | Blog card in "Let's Connect". |
| fix | `fix(blog): fail loudly on bad cover paths and malformed frontmatter` | Fixes from the whole-branch review (see below). |

## Verification (all passing at the end)

- `npx vitest run`: 39/39. Also 39/39 with `TZ=America/Los_Angeles`.
- `npm run lint`: clean. `npx tsc --noEmit`: clean.
- `npm run build` with only the draft sample:
  - `out/blogs.html` shows "First post coming soon."
  - `out/blogs/rss.xml` is valid XML with no items.
  - `out/sitemap.xml` has `/blogs` once.
  - `grep -rl hello-world out/` prints nothing.
- With the sample temporarily set to `draft: false` (then reverted), the post page had BlogPosting JSON-LD, `og:type=article` and the canonical URL. Its RSS item and sitemap entry were present too.
- Browser (claude-in-chrome, 1440px):
  - The listing renders, a card click navigates, and Home returns.
  - The post page works: TOC highlight, click-to-section, callouts, highlighted code, copy button, captioned image with lightbox, and the takeaways box.
  - The `/projects` lightbox still works after the extraction.
  - The contact section lays out correctly. Blog is a same-tab client-side navigation, and Home restores the exact scroll position.

## Whole-branch review

A fresh reviewer (most capable model) found no Critical issues. All five plan Review Focus items were verified correct. It raised two Important issues, both fixed test-first:

1. **Missing or relative `coverImage`** used to ship a broken cover and social card with only a build warning. It now fails the build with the post's filename.
2. **Malformed YAML frontmatter** (for example an unquoted colon in a title) used to produce an error that didn't name the file. It now does.

## Rulings I made (deviations from the plan)

| Where | Decision | Cost if wrong |
|---|---|---|
| Setup | No separate worktree: plain branch, because a worktree wouldn't carry your uncommitted `site.ts` edit. | None |
| Setup | Commit trailer says `Claude Sonnet 5.5`, not the plan's `Claude Opus 5.5`, because Sonnet is the model doing the work. | One `git rebase --exec` to rewrite trailers |
| Task 3 | The plan's "escape `<` as `<`" is garbled, so I used the `<` escape. | None |
| Task 1 | `vitest@5` failed with ERESOLVE (needs `@types/node` ^22 or newer, project has ^20). Installed `vitest@^3.2.7` instead of bumping `@types/node`. | Upgrade both together later |
| Task 2 | The external-links test pinned attribute order (`target` before `rel`), and the plugin emits `rel` first. I made the assertion order-insensitive. | None |
| Task 7 | A short last section (like "Key takeaways") was never highlighted in the TOC. I added a scroll listener that activates the last heading at page bottom. | Remove about 8 lines |
| Final fix | `gray-matter` caches before parsing, so a second load of broken frontmatter returned empty data. I pass `{}` as options to bypass the cache. | Remove the `{}` argument |

## Deferred minors (reviewer findings, not fixed)

1. **Silent date rollover** (`src/lib/blog/posts.ts`, date parsing). An unquoted impossible YAML date such as `2026-02-30` loads as `2026-03-02`, and unquoted timestamps with an offset can shift a day. Fix: load YAML with the JSON schema so dates stay strings and hit the strict check.
2. **Keyboard accessibility** (`src/components/blog/PostBody.tsx`, `src/components/ImageLightbox.tsx`). Zoomable images aren't focusable. The lightbox has no Escape-to-close, no `role="dialog"` or `aria-modal`, and no label on the close button. Fix: wrap images in a button and add the dialog attributes and an Escape listener. This also changes `/projects`, so call it out as an intended behaviour change.
3. **Copy button polish** (`PostBody.tsx`). It has no `aria-label` and no live region for "Copied", and it overlaps the end of long first lines. Fix: add both, plus right padding on `.blog-prose pre`.
4. **Draft images are public** (`scripts/blog-prebuild.mjs`, `public/images/blogs/`). Images for a draft post, and the generated `og.jpg`, ship in `out/` at guessable URLs. Fix: skip drafts in `ensureOgImages`, and either prune draft image folders after build or say in the template that committed images are public.
5. **Metadata merge** (`src/lib/blog/seo.ts`, `src/app/blogs/layout.tsx`).
   - Post pages lose the layout's RSS `<link rel="alternate">` and the root `siteName`.
   - `/blogs` has no canonical, and shares as "Riyaz Ahmed | Portfolio".
   - Fix: add `types` and `siteName` in `buildPostMetadata`, and give the blogs layout its own `openGraph`, `twitter` and `alternates.canonical`.
6. **Ignored image types** (`scripts/blog-images.mjs`). `.gif`, `.tif`, `.avif` and `.dng` files are skipped with no message. Fix: print a one-line note.
7. **Output filenames** (`scripts/blog-images.mjs`). Camera casing and spaces are kept, so `IMG 1234.JPG` becomes `IMG 1234.webp`. `Cover.JPG` becomes `Cover.webp`, which 404s on case-sensitive hosts if the frontmatter says `cover.webp`. Fix: lowercase and slugify.
8. **Tags** (`posts.ts`). Duplicates aren't removed, which causes React duplicate-key warnings and repeated RSS categories. The spec's 2–5 count isn't enforced.
9. **Footnotes** (`src/lib/blog/plugins/rehype-collect-headings.ts`). GFM footnotes add a "Footnotes" TOC entry, and their `sr-only` heading shows visibly. Fix: skip headings inside `section[data-footnotes]`.
10. **Eager `sharp` import** (`scripts/lib/og-image.mjs`). If the native binary fails to load, the build fails even with no cover images. Fix: `await import("sharp")` inside `writeOgImage`.

## Known limits and things not confirmed

- **375px layout** was checked by measuring a 375px iframe, because Chrome wouldn't shrink below 1440px. Please eyeball `/blogs`, a post, and the home contact section on a real phone or devtools.
- **View-transition animation** (listing, post and home) can't be judged from screenshots. Please check it by eye.
- **TOC fast flick:** a very fast scroll that skips a whole heading band keeps the previous highlight until the next heading crossing.
- **Dev 500s:** `/blogs/<unknown>` returns 500 in `next dev`, the same as `/projects/<unknown>` (`output: "export"` dev behaviour).
- **Placeholder page:** with zero published posts, the build emits a `noindex` `out/blogs/_no-posts.html`. It's required by static export, isn't in the sitemap or RSS, and some hosts may serve it with a 200.
- **Existing home overflow:** the home page overflows horizontally by about 9px at 375px, from the hero background layers (`absolute w-[110%]` divs and an `object-cover` img). It's unrelated to this branch.
- **Unsanitized links:** `javascript:` and `data:` URLs pass through the Markdown pipeline unsanitized. React 19 neutralizes `javascript:` hrefs and srcs, and the author is the repo owner, so it's not exploitable as built. It would matter only if the HTML were ever emitted outside React, such as full-text RSS.
- **Smaller items:** `getAllPosts()` re-parses every file per page (negligible at this scale). `PostBody` runs `html-react-parser` on the client too. RSS would be invalid if a title contained a C0 control character.

## Not done

- No push, no PR, and no merge. You said not to, so I skipped the finishing-a-development-branch step.
- None of the ten deferred minors above were implemented.
- No real blog post exists yet. Only the `hello-world` draft is in `content/blogs/`.
- This summary file is uncommitted.

## Suggested next steps

1. Eyeball the items under "Known limits and things not confirmed".
2. Decide which deferred minors to do before publishing the first post. #4 (draft images), #7 (filename casing) and #5 (metadata) matter most. #2 (accessibility) is a good small follow-up.
3. Write the first real post from `content/blogs/_TEMPLATE.md`, then set `draft: false` and build.
4. If you want accurate trailers, run `git rebase --exec` to change them. I'll do that if you tell me which attribution you want.
