import React from "react";
import { Marked } from "marked";
import { useSelector } from "react-redux";

const marked = new Marked();

const MarkdownPreview = () => {
  const markdownContent = useSelector(
    (state) => state.markdown.markdownContent
  );
  const parsedMarkdown = marked.parse(markdownContent, { sanitize: true });

  return (
    <div className="markdown-preview">
      <div dangerouslySetInnerHTML={{ __html: parsedMarkdown }} />
    </div>
  );
};

export default MarkdownPreview;
