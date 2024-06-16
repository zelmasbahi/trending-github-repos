export interface RepoProps {
  id: string;
  name: string;
  description: string;
  url: string;
  language?: string;
  stars: number;
  starred?: boolean;
}

export type StarRepo = (item: RepoProps) => void;

export interface RepoCardProps {
  item: RepoProps;
  isStarred?: boolean;
  starRepo: StarRepo;
}

export interface RepoListProps {
  items: RepoProps[];
  starRepo: StarRepo;
}
