import { RepoProps } from "@/models";
import axios from "axios";

export const getRepos = async (): Promise<RepoProps[]> => {
  const lastWeekDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const response = await axios.get(
    "https://api.github.com/search/repositories",
    {
      params: {
        sort: "stars",
        order: "desc",
        q: `created:>${lastWeekDate}`,
      },
    }
  );

  return response.data.items.map((repo: any) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language,
  }));
};
