import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
});

export const fetchUserData = async (username) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export const fetchAdvancedUsers = async (username, location, minRepos) => {
  const parts = [];
  if (username) parts.push(username);
  if (location) parts.push(`location:${location}`);
  if (minRepos) parts.push(`repos:>=${minRepos}`);

  const query = parts.join("+"); 

  if (!query) return []; 

  const response = await api.get(`/search/users?q=${query}&per_page=10`);
  return response.data.items;
};
