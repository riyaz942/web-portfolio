import type { Element, ElementContent, Root, RootContent } from "hast";
import { headingText } from "./rehype-collect-headings";

const isH2 = (n: RootContent): n is Element => n.type === "element" && n.tagName === "h2";

/** Wraps the `## Key takeaways` heading and its siblings (up to the next h2) in `<section class="takeaways">`. */
export default function rehypeTakeaways() {
  return (tree: Root) => {
    const start = tree.children.findIndex(
      (n) => isH2(n) && headingText(n).trim().toLowerCase() === "key takeaways",
    );
    if (start === -1) return;

    let end = tree.children.findIndex((n, i) => i > start && isH2(n));
    if (end === -1) end = tree.children.length;

    const section: Element = {
      type: "element",
      tagName: "section",
      properties: { className: ["takeaways"] },
      children: tree.children.slice(start, end) as ElementContent[],
    };
    tree.children.splice(start, end - start, section);
  };
}
