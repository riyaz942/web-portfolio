import type { Blockquote, Paragraph, Root } from "mdast";
import { visit } from "unist-util-visit";

const TITLES = { note: "Note", tip: "Tip", warning: "Warning" } as const;
type CalloutKind = keyof typeof TITLES;

const MARKER = /^\[!(NOTE|TIP|WARNING)\][ \t]*\r?\n?/i;

/** Turns `> [!TIP]` blockquotes into `<aside class="callout callout-tip">`. */
export default function remarkCallouts() {
  return (tree: Root) => {
    visit(tree, "blockquote", (node: Blockquote) => {
      const first = node.children[0];
      if (first?.type !== "paragraph") return;
      const text = first.children[0];
      if (text?.type !== "text") return;
      const match = MARKER.exec(text.value);
      if (!match) return;

      const kind = match[1].toLowerCase() as CalloutKind;
      text.value = text.value.slice(match[0].length);
      if (text.value === "") first.children.shift();
      if (first.children.length === 0) node.children.shift();

      const title: Paragraph = {
        type: "paragraph",
        children: [{ type: "text", value: TITLES[kind] }],
        data: { hProperties: { className: ["callout-title"] } },
      };
      node.children.unshift(title);
      node.data = {
        hName: "aside",
        hProperties: { className: ["callout", `callout-${kind}`] },
      };
    });
  };
}
