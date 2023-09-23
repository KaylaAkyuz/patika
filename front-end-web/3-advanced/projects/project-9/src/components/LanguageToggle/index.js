import React from "react";
import { Button } from "antd";

const LanguageToggle = ({ onToggleLanguage, isJapanese }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "1rem",
      }}
    >
      <Button onClick={onToggleLanguage}>
        {isJapanese ? "Switch to English" : "日本語に切り替える"}
      </Button>
    </div>
  );
};

export default LanguageToggle;
