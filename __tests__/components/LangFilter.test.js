import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { LangFilter } from "@/components";

// Mocks
const mockLanguages = ["JavaScript", "Python", "C#"];
const mockSelectedLanguages = ["Python", "C#"];

const mockSetSelectedLanguages = jest.fn();

describe("LangFilter", () => {
  test("Checkboxes rendering", () => {
    const { getByText } = render(
      <LangFilter
        selectedLanguages={mockSelectedLanguages}
        setSelectedLanguages={mockSetSelectedLanguages}
        languages={mockLanguages}
      />
    );

    mockLanguages.forEach((language) => {
      const checkbox = getByText(language);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox.tagName).toBe("LABEL");
    });
  });

  test("Languages selecting / deselecting", () => {
    const { getByLabelText } = render(
      <LangFilter
        selectedLanguages={mockSelectedLanguages}
        setSelectedLanguages={mockSetSelectedLanguages}
        languages={mockLanguages}
      />
    );

    const jsCheckBox = getByLabelText("JavaScript");
    const pyCheckbox = getByLabelText("Python");

    // Select JavaScript
    fireEvent.click(jsCheckBox);

    expect(mockSetSelectedLanguages).toHaveBeenCalledWith([
      ...mockSelectedLanguages,
      "JavaScript",
    ]);

    // Deselect Python
    fireEvent.click(pyCheckbox);
    expect(mockSetSelectedLanguages).toHaveBeenCalledWith(["C#"]);
  });
});
