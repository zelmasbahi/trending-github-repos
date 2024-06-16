import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { RepoProps } from "@/models";
import { getRepos } from "@/services";
import { ReposList, LangFilter } from "@/components";
import { leftJoin, getFilterOptions } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps: GetStaticProps<{
  repos: RepoProps[];
}> = async () => {
  const res = await getRepos();
  return { props: { repos: res } };
};

export default function Home({
  repos,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [starredRepos, setStarredRepos] = useState<RepoProps[]>([]);
  const [showStarred, setShowStarred] = useState<boolean>(false);

  const [languageOptions, setLanguageOptions] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const [filteredRepos, setFilteredRepos] = useState<RepoProps[]>(repos || []);

  useEffect(() => {
    const savedStarredRepos = JSON.parse(
      localStorage.getItem("myStarred") || "[]"
    ) as RepoProps[];
    setStarredRepos(savedStarredRepos);
  }, []);

  useEffect(() => {
    const updatedRepos = showStarred
      ? starredRepos
      : leftJoin(repos, starredRepos, "id");

    const filtered =
      selectedLanguages.length > 0
        ? updatedRepos.filter((repo) =>
            selectedLanguages.includes(repo.language as string)
          )
        : updatedRepos;

    setFilteredRepos(filtered);

    const availableLanguages = getFilterOptions(updatedRepos);
    setLanguageOptions(availableLanguages);
  }, [selectedLanguages, repos, starredRepos, showStarred]);

  useEffect(() => {
    setSelectedLanguages([]);
  }, [showStarred]);

  const starRepo = (repo: RepoProps) => {
    const newMyStarred = starredRepos.some((r) => r.id === repo.id)
      ? starredRepos.filter((r) => r.id !== repo.id)
      : [...starredRepos, { ...repo, starred: true }];

    setStarredRepos(newMyStarred);
    localStorage.setItem("myStarred", JSON.stringify(newMyStarred));
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <h1 className="text-3xl">Last week popular repos on Github</h1>
      <div className="p-4 w-full">
        <button
          className="float-right"
          onClick={() => setShowStarred(!showStarred)}
        >
          {showStarred ? "View all" : "View my starred"}
        </button>
        <div className="w-3/4">
          <LangFilter
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
            languages={languageOptions}
          />
        </div>
      </div>
      <ReposList items={filteredRepos} starRepo={starRepo} />
    </main>
  );
}
