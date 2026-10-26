import type { Element, Root } from "hast";
import type { Transformer } from "unified";
import { visit } from "unist-util-visit";
import type { TocHeading } from "../types";

function hasClass(node: Element, name: string): boolean {
  const cls = node.properties?.className;
  return Array.isArray(cls) && cls.includes(name);
}

/** Heading text, minus the appended anchor link. */
function headingText(node: Element): string {
  let out = "";
  for (const child of node.children) {
    if (child.type === "text") out += child.value;
    else if (child.type === "element" && !hasClass(child, "heading-anchor")) out += headingText(child);
  }
  return out;
}

/** Collects h2/h3 headings (ids come from rehype-slug) into `file.data.headings`. */
export default function rehypeCollectHeadings(): Transformer<Root> {
  return (tree, file) => {
    const headings: TocHeading[] = [];
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;
      const id = node.properties?.id;
      if (typeof id !== "string") return;
      headings.push({
        id,
        text: headingText(node).trim(),
        depth: node.tagName === "h2" ? 2 : 3,
      });
    });
    (file.data as { headings?: TocHeading[] }).headings = headings;
  };
}

export { headingText };
