import { leftJoin, getFilterOptions } from "@/utils";

describe("leftJoin function", () => {
  const apiRepos = [
    {
      id: "1",
      name: "Repo 1",
      description: "Description 1",
      url: "url1",
      stars: 100,
      language: "JavaScript",
    },
    {
      id: "2",
      name: "Repo 2",
      description: "Description 2",
      url: "url2",
      stars: 200,
      language: "TypeScript",
    },
  ];

  const starredRepos = [
    {
      id: "1",
      name: "Repo 1",
      description: "Description 1",
      url: "url1",
      stars: 100,
      language: "JavaScript",
      starred: true,
    },
  ];

  it("should merge starredRepos into apiRepos based on id", () => {
    const result = leftJoin(apiRepos, starredRepos, "id");
    expect(result).toEqual([
      {
        id: "1",
        name: "Repo 1",
        description: "Description 1",
        url: "url1",
        stars: 100,
        language: "JavaScript",
        starred: true,
      },
      {
        id: "2",
        name: "Repo 2",
        description: "Description 2",
        url: "url2",
        stars: 200,
        language: "TypeScript",
      },
    ]);
  });

  it("should not modify apiRepos if there are no matches in starredRepos", () => {
    const nonStarredRepos = [
      {
        id: "3",
        name: "Repo 3",
        description: "Description 3",
        url: "url3",
        stars: 300,
        language: "Python",
      },
    ];

    const result = leftJoin(apiRepos, nonStarredRepos, "id");
    expect(result).toEqual(apiRepos);
  });
});

describe("getFilterOptions function", () => {
  const repos = [
    {
      id: "1",
      name: "Repo 1",
      description: "Description 1",
      url: "url1",
      stars: 100,
      language: "JavaScript",
    },
    {
      id: "2",
      name: "Repo 2",
      description: "Description 2",
      url: "url2",
      stars: 200,
      language: "TypeScript",
    },
    {
      id: "3",
      name: "Repo 3",
      description: "Description 3",
      url: "url3",
      stars: 300,
      language: "JavaScript",
    },
    {
      id: "4",
      name: "Repo 4",
      description: "Description 4",
      url: "url4",
      stars: 400,
      language: null,
    },
  ];

  it("should return unique languages from the repos array", () => {
    const result = getFilterOptions(repos);
    expect(result).toEqual(["JavaScript", "TypeScript"]);
  });

  it("should return an empty array if no repos have languages", () => {
    const reposWithoutLanguages = [
      {
        id: "1",
        name: "Repo 1",
        description: "Description 1",
        url: "url1",
        stars: 100,
        language: null,
      },
      {
        id: "2",
        name: "Repo 2",
        description: "Description 2",
        url: "url2",
        stars: 200,
        language: undefined,
      },
    ];

    const result = getFilterOptions(reposWithoutLanguages);
    expect(result).toEqual([]);
  });

  it("should ignore null and undefined languages", () => {
    const reposWithInvalidLanguages = [
      {
        id: "1",
        name: "Repo 1",
        description: "Description 1",
        url: "url1",
        stars: 100,
        language: "JavaScript",
      },
      {
        id: "2",
        name: "Repo 2",
        description: "Description 2",
        url: "url2",
        stars: 200,
        language: null,
      },
      {
        id: "3",
        name: "Repo 3",
        description: "Description 3",
        url: "url3",
        stars: 300,
        language: undefined,
      },
      {
        id: "4",
        name: "Repo 4",
        description: "Description 4",
        url: "url4",
        stars: 400,
        language: "TypeScript",
      },
    ];

    const result = getFilterOptions(reposWithInvalidLanguages);
    expect(result).toEqual(["JavaScript", "TypeScript"]);
  });
});
