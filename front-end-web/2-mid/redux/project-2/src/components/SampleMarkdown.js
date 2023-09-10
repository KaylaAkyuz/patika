import React from "react";
import { useDispatch } from "react-redux";
import { setMarkdownContent } from "../features/markdown/markdownSlice";

const SampleMarkdown = () => {
  const dispatch = useDispatch();
  const sampleMarkdown = `# Sample Markdown

**Hello, Markdown Viewer!**

This is an example of Markdown content.

* Item 1
* Item 2
* Item 3


1. Item 1
2. Item 2
3. Item 3

*italic*, **bold**,
\`monospace\`, ~~strikethrough~~ . and [link](https://example.com).

> Blockquote

\`\`\`javascript
console.log('Code block');
\`\`\``;

  const handleShowSample = () => {
    dispatch(setMarkdownContent(sampleMarkdown));
  };

  return (
    <div className="sample-markdown">
      <button onClick={handleShowSample}>?</button>
    </div>
  );
};

export default SampleMarkdown;
