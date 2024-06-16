import { RepoListProps, RepoProps } from "@/models";
import RepoCard from "./RepoCard";

export default function ReposList({ items, starRepo }: RepoListProps) {
  return (
    <ul className="w-full">
      {items.length > 0 &&
        items.map((repo: RepoProps) => (
          <RepoCard
            key={repo.id}
            item={repo}
            starRepo={starRepo}
            isStarred={repo.starred}
          />
        ))}
    </ul>
  );
}
