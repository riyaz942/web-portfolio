import { describe, expect, it } from "vitest";
import { renderMarkdown } from "../markdown";

describe("renderMarkdown", () => {
  it("collects h2/h3 headings with unique ids", async () => {
    const { headings, html } = await renderMarkdown("## Choosing the parts\n\n### Switches\n\n## Choosing the parts");
    expect(headings).toEqual([
      { id: "choosing-the-parts", text: "Choosing the parts", depth: 2 },
      { id: "switches", text: "Switches", depth: 3 },
      { id: "choosing-the-parts-1", text: "Choosing the parts", depth: 2 },
    ]);
    expect(html).toContain('href="#choosing-the-parts"');
    expect(html).toContain('class="heading-anchor"');
  });
  it.each([["TIP", "tip", "Tip"], ["NOTE", "note", "Note"], ["WARNING", "warning", "Warning"]])(
    "renders > [!%s] as a callout", async (marker, cls, title) => {
      const { html } = await renderMarkdown(`> [!${marker}]\n> Buy extra switches.`);
      expect(html).toContain(`class="callout callout-${cls}"`);
      expect(html).toContain(`<p class="callout-title">${title}</p>`);
      expect(html).toContain("Buy extra switches.");
      expect(html).not.toContain(`[!${marker}]`);
    });
  it("leaves plain blockquotes alone", async () => {
    expect((await renderMarkdown("> just a quote")).html).toContain("<blockquote>");
  });
  it("turns a lone image with a title into a captioned figure", async () => {
    const { html } = await renderMarkdown('![Plate mounted](/images/blogs/x/plate.webp "Plate mounted, ready")');
    expect(html).toMatch(/<figure><img[^>]*alt="Plate mounted"[^>]*loading="lazy"/);
    expect(html).toContain("<figcaption>Plate mounted, ready</figcaption>");
    expect(html).not.toContain("<p><figure");
  });
  it("wraps the Key takeaways section only", async () => {
    const { html } = await renderMarkdown("## Key Takeaways\n\n- a\n- b\n\n## Wrap-up\n\nbye");
    expect(html).toMatch(/<section class="takeaways"><h2[^>]*>.*Key Takeaways.*<\/h2>\s*<ul>[\s\S]*<\/ul>\s*<\/section>/);
    expect(html.indexOf("Wrap-up")).toBeGreaterThan(html.indexOf("</section>"));
  });
  it("opens external links in a new tab only", async () => {
    const { html } = await renderMarkdown("[qmk](https://qmk.fm) [b](/blogs/a) [s](#sec)");
    const external = html.match(/<a [^>]*href="https:\/\/qmk\.fm"[^>]*>/)![0];
    expect(external).toContain('target="_blank"');
    expect(external).toContain('rel="noopener noreferrer"');
    expect(html).toContain('<a href="/blogs/a">');
    expect(html).toContain('<a href="#sec">');
  });
  it("highlights code at build time and tolerates unknown languages", async () => {
    expect((await renderMarkdown("```bash\nqmk flash\n```")).html).toMatch(/data-language="bash"[\s\S]*<span style=/);
    await expect(renderMarkdown("```nonsense\nx\n```")).resolves.toBeTruthy();
  });
  it("renders GFM tables and drops raw HTML", async () => {
    const { html } = await renderMarkdown("| a | b |\n|---|---|\n| 1 | 2 |\n\n<script>alert(1)</script>");
    expect(html).toContain("<table>");
    expect(html).not.toContain("<script");
  });
});
