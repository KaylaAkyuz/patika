import React from "react";
import { useSelector } from "react-redux";
import { selectParagraphs } from "../features/paragraphs/paragraphsSlice";

const ParagraphDisplay = () => {
  const paragraphs = useSelector(selectParagraphs);

  return (
    <div className="paragraph-display">
      <h2>Generated Paragraphs</h2>
      {paragraphs
        ? paragraphs.split("\n\n").map((paragraph, index) => (
            <p key={index} className="generated-paragraph">
              {paragraph}
            </p>
          ))
        : ""}
    </div>
  );
};

export default ParagraphDisplay;
