import React from "react";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "./App";
import emojiData from "./emojiList.json";
import Clipboard from "clipboard";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders the title", async () => {
    await waitFor(() =>
      expect(screen.getByText("Emoji Search")).toBeInTheDocument()
    );
  });

  it("renders the emoji list", async () => {
    const emojiList = document.querySelectorAll(".component-emoji-result-row");
    const firstEmoji = emojiList[0];

    expect(emojiList.length).toBeGreaterThan(0);
    expect(firstEmoji.textContent).toContain("100");
    expect(firstEmoji.textContent).toContain("Click to copy emoji");
  });

  it("filters the emoji list", async () => {
    const inputContainer = screen
      .getByRole("textbox")
      .closest(".component-search-input");
    const input = inputContainer.querySelector("input");

    userEvent.type(input, "smile");

    await waitFor(() => {
      const filteredEmojiList = document.querySelectorAll(
        ".component-emoji-result-row"
      );

      expect(filteredEmojiList.length).toBeGreaterThan(0);

      filteredEmojiList.forEach((emoji) => {
        const emojiDataItem = emojiData.find(
          (item) => item.symbol === emoji.getAttribute("data-clipboard-text")
        );
        const keywords = emojiDataItem ? emojiDataItem.keywords.split(" ") : [];

        const inputText = input.value.toLowerCase();
        const keywordMatch = keywords.some((keyword) =>
          keyword.toLowerCase().includes(inputText)
        );

        expect(keywordMatch).toBe(true);
      });
    });
  });

  it("copies the emoji to clipboard", async () => {
    const emojiList = document.querySelectorAll(".copy-to-clipboard");
    const firstEmoji = emojiList[0];

    // Mock the clipboard onClick method, testing external clipboard.js is out of scope
    const clipboardSpy = jest.spyOn(Clipboard.prototype, "onClick");

    userEvent.click(firstEmoji);

    await waitFor(() => {
      expect(clipboardSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          delegateTarget: firstEmoji,
        })
      );
    });

    clipboardSpy.mockRestore();
  });
});
