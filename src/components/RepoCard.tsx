import { RepoCardProps } from "@/models";

export default function RepoCard({ item, starRepo }: RepoCardProps) {
  return (
    <li className="p-4 border-t list-none rounded-2">
      <div className="flex justify-between items-center">
        <button onClick={() => starRepo(item)}>
          {item.starred ? "Unstar" : "Star"}
        </button>
        <span className="ml-2">{item.stars + (item.starred ? 1 : 0)}</span>
      </div>
      <h2 className="text-xl text-sky-600">
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          {item.name}
        </a>
      </h2>
      {item.description && (
        <p className="my-1 pr-4 w-3/4">{item.description}</p>
      )}
    </li>
  );
}
