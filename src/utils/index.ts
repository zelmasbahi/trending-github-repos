import { RepoProps } from "@/models";

// Custom  data structures handlers
export function leftJoin(
  apiRepos: RepoProps[],
  starredRepos: RepoProps[],
  id: keyof RepoProps
): RepoProps[] {
  const lookupMap = new Map(starredRepos.map((item) => [item[id], item]));
  return apiRepos.map((item) => ({
    ...lookupMap.get(item[id]),
    ...item,
  }));
}

export function getFilterOptions(array: RepoProps[]): string[] {
  const languages = new Set<string>();

  array.forEach((item) => {
    if (item.language) {
      languages.add(item.language);
    }
  });

  return Array.from(languages).filter((language) => language);
}
