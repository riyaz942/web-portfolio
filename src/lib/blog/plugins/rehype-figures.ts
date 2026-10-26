import type { Element, Parents, Root } from "hast";
import { visit } from "unist-util-visit";

const isImg = (n: unknown): n is Element =>
  !!n && (n as Element).type === "element" && (n as Element).tagName === "img";

/** Lazy-loads every image; a lone image in a paragraph becomes `<figure>`, captioned from its title. */
export default function rehypeFigures() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index: number | undefined, parent: Parents | undefined) => {
      if (node.tagName !== "p" || parent === undefined || index === undefined) return;
      const kids = node.children.filter((c) => !(c.type === "text" && c.value.trim() === ""));
      if (kids.length !== 1 || !isImg(kids[0])) return;

      const img = kids[0];
      const caption = typeof img.properties?.title === "string" ? img.properties.title : "";
      delete img.properties?.title;

      const figure: Element = {
        type: "element",
        tagName: "figure",
        properties: {},
        children: [img],
      };
      if (caption) {
        figure.children.push({
          type: "element",
          tagName: "figcaption",
          properties: {},
          children: [{ type: "text", value: caption }],
        });
      }
      parent.children[index] = figure;
    });

    visit(tree, "element", (node: Element) => {
      if (isImg(node)) node.properties = { ...node.properties, loading: "lazy" };
    });
  };
}
