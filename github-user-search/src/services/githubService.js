import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
});

// Basic user fetch
export const fetchUserData = async (username) => {
  const response = await githubApi.get(`/users/${username}`);
  return response.data;
};

// Advanced search with username, location, minRepos
export const fetchAdvancedUsers = async ({
  username = "",
  location = "",
  minRepos = "",
  page = 1,
}) => {
  let queryParts = [];

  if (username) queryParts.push(username);
  if (location) queryParts.push(`location:${location}`);
  if (minRepos) queryParts.push(`repos:>=${minRepos}`);

  const query = queryParts.join("+");

  const response = await githubApi.get(
    `/search/users?q=${query}&per_page=10&page=${page}`
  );

  // Fetch extra details for each user (like public_repos, location)
  const detailedUsers = await Promise.all(
    response.data.items.map(async (user) => {
      const userDetails = await githubApi.get(`/users/${user.login}`);
      return userDetails.data;
    })
  );

  return {
    users: detailedUsers,
    total_count: response.data.total_count,
  };
};
