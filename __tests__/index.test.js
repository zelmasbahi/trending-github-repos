import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Main, { getStaticProps } from "../src/pages/index";
import "@testing-library/jest-dom";
import { getRepos } from "@/services";
// Mock getRepos function

jest.mock("../src/services/index.ts", () => ({
  getRepos: jest.fn(),
}));

// Mocks
const mockRepos = [
  {
    id: "1",
    name: "Repo 1",
    description: "Description 1",
    url: "https://github.com/repo1",
    language: "JavaScript",
    stars: 10,
    starred: false,
  },
  {
    id: "2",
    name: "Repo 2",
    description: "Description 2",
    url: "https://github.com/repo2",
    language: "Python",
    stars: 20,
    starred: false,
  },
];

describe("Main page", () => {
  beforeEach(() => {
    getRepos.mockResolvedValue(mockRepos);
  });

  test("Rendering main page", async () => {
    // Mock getStaticProps function
    const { props } = await getStaticProps({});
    await waitFor(() => {
      expect(props.repos.length).toBe(2);
    });

    const { getByText, getAllByRole } = render(<Main repos={props.repos} />);

    expect(getByText("Last week popular repos on Github")).toBeInTheDocument();
    expect(getByText("View my starred")).toBeInTheDocument();

    const repoCards = getAllByRole("listitem");

    expect(repoCards).toHaveLength(2);
  });

  test("Language filter", async () => {
    const { getByText, getAllByRole } = render(<Main repos={mockRepos} />);

    // Select JavaScript
    const javaScriptCheckbox = getByText("JavaScript");
    fireEvent.click(javaScriptCheckbox);

    const repoCards = getAllByRole("listitem");
    expect(repoCards).toHaveLength(1);
    expect(getByText("Repo 1")).toBeInTheDocument();
  });

  test("Repo starring/unstarring", async () => {
    const { getByText, getAllByText } = render(<Main repos={mockRepos} />);
    const starButton = getAllByText("Star")?.[0];

    // Star repo
    fireEvent.click(starButton);
    await waitFor(() => {
      expect(getAllByText("Unstar")?.[0]).toBeInTheDocument();
    });

    // Unstar repo
    fireEvent.click(starButton);
    await waitFor(() => {
      expect(getAllByText("Star")?.[0]).toBeInTheDocument();
    });
  });

  test("Showstarred", () => {
    const { getByText } = render(<Main repos={mockRepos} />);
    const viewStarredButton = getByText("View my starred");

    // Order is important here
    fireEvent.click(viewStarredButton);
    expect(viewStarredButton.textContent).toBe("View all");

    fireEvent.click(viewStarredButton);
    expect(viewStarredButton.textContent).toBe("View my starred");
  });
});
