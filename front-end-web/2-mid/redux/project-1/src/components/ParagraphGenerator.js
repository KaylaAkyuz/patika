import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchParagraphs } from "../features/paragraphs/paragraphsSlice";

const ParagraphGenerator = () => {
  const dispatch = useDispatch();
  const [paras, setParas] = useState(4);
  const [format, setFormat] = useState("text");

  useEffect(() => {
    dispatch(fetchParagraphs({ paras, format }));
  }, [dispatch, paras, format]);

  const handleGenerate = () => {
    dispatch(fetchParagraphs({ paras, format }));
  };

  return (
    <div className="paragraph-generator">
      <h2>Paragraph Generator</h2>
      <div className="inputs">
        <div className="input-group">
          <label htmlFor="paras">Number of Paragraphs:</label>
          <input
            type="number"
            id="paras"
            value={paras}
            onChange={(e) => setParas(parseInt(e.target.value))}
          />
        </div>
        <div className="input-group">
          <label htmlFor="format">Format:</label>
          <select
            id="format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="html">HTML</option>
          </select>
        </div>
        <button onClick={handleGenerate}>Generate</button>
      </div>
    </div>
  );
};

export default ParagraphGenerator;
