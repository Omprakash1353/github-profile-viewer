import { User, Org, Repo } from "./types";

export const fetchUserData = async (id: string): Promise<User> => {
  const res = await fetch(`https://api.github.com/users/${id}`);
  return res.json();
};

export const fetchUserOrgs = async (id: string): Promise<Org[]> => {
  const res = await fetch(`https://api.github.com/users/${id}/orgs`);
  return res.json();
};

export const fetchUserRepos = async (id: string): Promise<Repo[]> => {
  const res = await fetch(
    `https://api.github.com/users/${id}/repos?per_page=100`
  );
  return res.json();
};
