import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypeCollectHeadings from "./plugins/rehype-collect-headings";
import rehypeFigures from "./plugins/rehype-figures";
import rehypeTakeaways from "./plugins/rehype-takeaways";
import remarkCallouts from "./plugins/remark-callouts";
import type { RenderedPost, TocHeading } from "./types";

/** Renders a post body to HTML at build time. Raw HTML in the Markdown is dropped. */
export async function renderMarkdown(markdown: string): Promise<RenderedPost> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkCallouts)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: { className: ["heading-anchor"], ariaLabel: "Link to section" },
    })
    .use(rehypeCollectHeadings)
    .use(rehypeTakeaways)
    .use(rehypeFigures)
    .use(rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] })
    .use(rehypePrettyCode, {
      theme: "github-dark-dimmed",
      keepBackground: true,
      defaultLang: "plaintext",
    })
    .use(rehypeStringify)
    .process(markdown);

  return {
    html: String(file),
    headings: (file.data.headings as TocHeading[] | undefined) ?? [],
  };
}
