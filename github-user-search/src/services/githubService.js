import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
});

/**
 * BASIC SEARCH – fetch a single user by username
 */
export const fetchUserData = async (username) => {
  const response = await githubApi.get(`/users/${username}`);
  return response.data;
};

/**
 * ADVANCED SEARCH – search users with filters
 */
export const fetchAdvancedUsers = async ({
  username,
  location,
  minRepos,
  page = 1,
}) => {
  let query = "";

  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const response = await githubApi.get(
    `/search/users?q=${query}&page=${page}&per_page=10`
  );

  return response.data;
};
