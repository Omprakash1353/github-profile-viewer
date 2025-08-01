import { useQuery } from "@tanstack/react-query";
import { fetchUserData, fetchUserOrgs, fetchUserRepos } from "../api";
import { Org, Repo, User } from "../types";

export const useUserProfile = (id: string) => {
  const { data: userData, isLoading: isLoadingUser } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => fetchUserData(id!),
    enabled: !!id,
  });

  const { data: userOrgs, isLoading: isLoadingOrgs } = useQuery<Org[]>({
    queryKey: ["userOrgs", id],
    queryFn: () => fetchUserOrgs(id!),
    enabled: !!id,
  });

  const { data: userRepos, isLoading: isLoadingRepos } = useQuery<Repo[]>({
    queryKey: ["userRepos", id],
    queryFn: () => fetchUserRepos(id!),
    enabled: !!id,
  });

  const isLoading = isLoadingUser || isLoadingOrgs || isLoadingRepos;

  return { userData, userOrgs, userRepos, isLoading };
};
