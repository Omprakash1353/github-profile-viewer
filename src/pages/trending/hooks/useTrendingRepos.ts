import { useQuery } from "@tanstack/react-query";
import { fetchTrendingRepos } from "../api";
import { TrendingData } from "../types";

export const useTrendingRepos = () => {
  return useQuery<TrendingData>({
    queryKey: ["trendingRepos"],
    queryFn: fetchTrendingRepos,
    staleTime: 1000 * 60 * 5,
  });
};
