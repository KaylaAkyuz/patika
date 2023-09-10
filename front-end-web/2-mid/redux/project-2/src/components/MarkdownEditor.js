import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMarkdownContent } from "../features/markdown/markdownSlice";

const MarkdownEditor = () => {
  const dispatch = useDispatch();
  const markdownContent = useSelector(
    (state) => state.markdown.markdownContent
  );

  const handleMarkdownChange = (event) => {
    const newMarkdownContent = event.target.value;
    dispatch(setMarkdownContent(newMarkdownContent));
  };

  return (
    <div className="markdown-editor">
      <textarea
        value={markdownContent}
        onChange={handleMarkdownChange}
        placeholder="Enter your Markdown here..."
      />
    </div>
  );
};

export default MarkdownEditor;
