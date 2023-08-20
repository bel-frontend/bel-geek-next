import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import CodeHightLihght from "./CodeHightLihght";
import style from "./style.module.scss";

export const MD = ({ children, className = "" }: any) => {
  return (
    <ReactMarkdown
      className={[style.container, className].join(" ")}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          return (
            <CodeHightLihght
              code={String(children).replace(/\n$/, "")}
              language="javascript"
            />
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
