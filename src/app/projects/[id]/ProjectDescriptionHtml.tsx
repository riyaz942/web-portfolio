"use client";

import parse, {
  domToReact,
  type DOMNode,
  type Element,
  type HTMLReactParserOptions,
} from "html-react-parser";

/**
 * Allowed tags in project `description` HTML strings:
 * - `<h3>` — section headings
 * - `<p>` — body; use `data-tone="lead"` for stronger copy (replaces legacy `highlight`)
 * - `<ul>` / `<li>` — bullet lists
 * - `<br>`
 * - `<div data-layout="list-block">` — wraps optional intro `<p>` + `<ul>` with tight vertical spacing
 */

const ALLOWED_TAGS = new Set(["h3", "p", "ul", "li", "br"]);

const BANNED_TAGS = new Set([
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "link",
  "meta",
]);

function isElement(node: DOMNode): node is Element {
  return node.type === "tag";
}

function childrenToReact(
  nodes: Element["children"],
  options: HTMLReactParserOptions,
) {
  return domToReact(nodes as DOMNode[], options);
}

export function ProjectDescriptionHtml({ content }: { content: string }) {
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (!isElement(domNode)) {
        return undefined;
      }

      if (BANNED_TAGS.has(domNode.name)) {
        return <></>;
      }

      if (domNode.name === "div" && domNode.attribs["data-layout"] === "list-block") {
        return (
          <div className="space-y-2.5">
            {childrenToReact(domNode.children, options)}
          </div>
        );
      }

      if (!ALLOWED_TAGS.has(domNode.name)) {
        return <>{childrenToReact(domNode.children, options)}</>;
      }

      if (domNode.name === "h3") {
        return (
          <h3 className="text-lg font-semibold text-foreground mt-8 first:mt-0">
            {childrenToReact(domNode.children, options)}
          </h3>
        );
      }

      if (domNode.name === "p") {
        const lead = domNode.attribs["data-tone"] === "lead";
        return (
          <p
            className={`text-[0.95rem] leading-relaxed ${
              lead ? "text-foreground/90" : "text-muted"
            }`}
          >
            {childrenToReact(domNode.children, options)}
          </p>
        );
      }

      if (domNode.name === "ul") {
        return (
          <ul className="space-y-1.5 pl-1">
            {childrenToReact(domNode.children, options)}
          </ul>
        );
      }

      if (domNode.name === "li") {
        return (
          <li className="flex items-start gap-2.5 text-[0.9rem] text-muted leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 shrink-0" />
            <span className="min-w-0">
              {childrenToReact(domNode.children, options)}
            </span>
          </li>
        );
      }

      if (domNode.name === "br") {
        return <br />;
      }

      return undefined;
    },
  };

  return <div className="space-y-5">{parse(content, options)}</div>;
}
