import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { ReposList } from "@/components";

describe("ReposList component", () => {
  const mockStarRepo = jest.fn();
  const repos = [
    {
      id: "1",
      name: "Repo 1",
      description: "Description 1",
      url: "https://github.com/testrepo1",
      language: "JavaScript",
      stars: 10,
      starred: false,
    },
    {
      id: "2",
      name: "Repo 2",
      description: "Description 2",
      url: "https://github.com/testrepo2",
      language: "TypeScript",
      stars: 20,
      starred: true,
    },
  ];

  it("renders a list of repositories", () => {
    const { getByText } = render(
      <ReposList items={repos} starRepo={mockStarRepo} />
    );

    expect(getByText("Repo 1")).toBeInTheDocument();
    expect(getByText("Repo 2")).toBeInTheDocument();
  });

  it("calls starRepo function when star button is clicked", () => {
    const { getByText } = render(
      <ReposList items={repos} starRepo={mockStarRepo} />
    );

    const starButton1 = getByText("Star");
    fireEvent.click(starButton1);
    expect(mockStarRepo).toHaveBeenCalledWith(repos[0]);

    const unstarButton2 = getByText("Unstar");
    fireEvent.click(unstarButton2);
    expect(mockStarRepo).toHaveBeenCalledWith(repos[1]);
  });

  it("displays the correct star count", () => {
    const { getByText } = render(
      <ReposList items={repos} starRepo={mockStarRepo} />
    );

    expect(getByText("10")).toBeInTheDocument();
    expect(getByText("21")).toBeInTheDocument(); // 20 stars + 1 starred
  });
});
