export interface User {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  location: string;
  email: string;
  blog: string;
  twitter_username: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  created_at: string;
  message?: string;
}

export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  size: number;
  private: boolean;
  updated_at: string;
  open_issues_count: number;
}

export interface Org {
  login: string;
  avatar_url: string;
}
