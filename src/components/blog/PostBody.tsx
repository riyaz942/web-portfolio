"use client";

import parse, {
  attributesToProps,
  domToReact,
  Element,
  type DOMNode,
  type HTMLReactParserOptions,
} from "html-react-parser";
import { AnimatePresence } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import ImageLightbox from "@/components/ImageLightbox";

function CodeBlock({
  preProps,
  children,
}: {
  preProps: Record<string, unknown>;
  children: React.ReactNode;
}) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(preRef.current?.textContent ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (insecure context or denied); leave the label alone.
    }
  };

  return (
    <div className="relative">
      <pre {...preProps} ref={preRef}>
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute top-2 right-2 rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default function PostBody({ html }: { html: string }) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const content = useMemo(() => {
    const options: HTMLReactParserOptions = {
      replace(node) {
        if (!(node instanceof Element)) return;

        if (node.name === "pre") {
          return (
            <CodeBlock preProps={attributesToProps(node.attribs)}>
              {domToReact(node.children as DOMNode[], options)}
            </CodeBlock>
          );
        }

        if (node.name === "img") {
          const { src, alt = "" } = node.attribs;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              {...attributesToProps(node.attribs)}
              alt={alt}
              className="cursor-zoom-in"
              onClick={() => setLightbox({ src, alt })}
            />
          );
        }
      },
    };
    return parse(html, options);
  }, [html]);

  return (
    <>
      <div className="blog-prose">{content}</div>
      <AnimatePresence>
        {lightbox && (
          <ImageLightbox
            src={lightbox.src}
            alt={lightbox.alt}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
