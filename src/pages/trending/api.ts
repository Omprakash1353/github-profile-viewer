import { TrendingData } from "./types";

export const fetchTrendingRepos = async (): Promise<TrendingData> => {
  const response = await fetch(
    "https://api.github.com/search/repositories?q=created:>2024-01-01&sort=stars&order=desc&per_page=25"
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
