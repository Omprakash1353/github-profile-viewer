export interface Repo {
  id: number;
  full_name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  owner: {
    avatar_url: string;
  };
  private: boolean;
}

export interface TrendingData {
  items: Repo[];
}
