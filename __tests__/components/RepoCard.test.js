import { render, fireEvent } from "@testing-library/react";
import { RepoCard } from "@/components";
import "@testing-library/jest-dom";

// Mocks
const repo = {
  id: "1",
  name: "Trending repo",
  description: "Description",
  url: "",
  language: "JavaScript",
  stars: 10,
  starred: false,
};
const mockStarRepo = jest.fn();

describe("RepoCard", () => {
  test("RepoCard rendering", () => {
    const { getByText } = render(
      <RepoCard item={repo} starRepo={mockStarRepo} />
    );

    expect(getByText(repo.name)).toBeInTheDocument();
    expect(getByText(repo.description)).toBeInTheDocument();
    expect(getByText("Star")).toBeInTheDocument();
    expect(getByText(`${repo.stars}`)).toBeInTheDocument();
  });

  test("Trigger mockStarRepo", () => {
    const { getByText } = render(
      <RepoCard item={repo} starRepo={mockStarRepo} />
    );

    const starButton = getByText("Star");
    fireEvent.click(starButton);
    expect(mockStarRepo).toHaveBeenCalledTimes(1);
    expect(mockStarRepo).toHaveBeenCalledWith(repo);
  });

  test("displays 'Unstar' when item is already starred", () => {
    const starredItem = { ...repo, starred: true };
    const { getByText } = render(
      <RepoCard item={starredItem} starRepo={mockStarRepo} />
    );

    expect(getByText("Unstar")).toBeInTheDocument();
  });
});
