/**
 * Shared-element view transition between a blog card's cover and the post's
 * hero cover. Names are assigned only for the duration of one transition, so
 * unrelated navigations (home, older/newer post) never morph a cover.
 */

export const BLOG_COVER_VT_NAME = "blog-cover";

export const cardCoverSelector = (slug: string) => `[data-blog-card-cover="${slug}"]`;
export const heroCoverSelector = (slug: string) => `[data-blog-hero-cover="${slug}"]`;

export function clearBlogCoverNames() {
  document
    .querySelectorAll<HTMLElement>("[data-blog-card-cover], [data-blog-hero-cover]")
    .forEach((el) => {
      el.style.viewTransitionName = "";
    });
}

/** Names the element and returns true, unless it is missing or off screen. */
export function nameBlogCover(selector: string): boolean {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  if (rect.bottom <= 0 || rect.top >= window.innerHeight) return false;
  clearBlogCoverNames();
  el.style.viewTransitionName = BLOG_COVER_VT_NAME;
  return true;
}

/** Waits (briefly) for the cover image to decode so the new snapshot isn't blank. */
export async function decodeCoverImage(selector: string, timeout = 300) {
  const img = document.querySelector<HTMLImageElement>(`${selector} img`);
  if (!img || img.complete) return;
  await Promise.race([
    img.decode().catch(() => {}),
    new Promise((resolve) => setTimeout(resolve, timeout)),
  ]);
}
