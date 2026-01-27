import { useState } from "react";
import { fetchUserData, fetchAdvancedUsers } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Basic search
  const handleBasicSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUser(null);
    setUsers([]);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  // Advanced search
  const handleAdvancedSearch = async (loadMore = false) => {
    setLoading(true);
    setError("");

    try {
      const { users: newUsers } = await fetchAdvancedUsers({
        username,
        location,
        minRepos,
        page: loadMore ? page + 1 : 1,
      });

      setUsers(loadMore ? [...users, ...newUsers] : newUsers);
      setPage(loadMore ? page + 1 : 1);
    } catch {
      setError("Looks like we cant find any users matching the criteria");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Search Form */}
      <form
        onSubmit={handleBasicSearch}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >
        <h2 className="text-2xl font-bold">GitHub User Search</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Location"
            className="border p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="number"
            placeholder="Minimum Repositories"
            className="border p-2 rounded"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Basic Search
          </button>
          <button
            type="button"
            onClick={() => handleAdvancedSearch()}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Advanced Search
          </button>
        </div>
      </form>

      {/* States */}
      {loading && <p className="mt-4 text-gray-700">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {/* Basic Search Result */}
      {user && (
        <div className="mt-6 p-4 border rounded shadow flex items-center gap-4">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-24 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">{user.name || user.login}</h3>
            <p>Location: {user.location || "N/A"}</p>
            <p>Repositories: {user.public_repos}</p>
            <p>Followers: {user.followers}</p>
            <a
              href={user.html_url}
              target="_blank"
              className="text-blue-600"
            >
              View Profile
            </a>
          </div>
        </div>
      )}

      {/* Advanced Search Results */}
      {users.length > 0 && (
        <div className="mt-6 space-y-4">
          {users.map((u) => (
            <div
              key={u.id}
              className="p-4 border rounded shadow flex items-center gap-4"
            >
              <img
                src={u.avatar_url}
                alt={u.login}
                className="w-16 rounded-full"
              />
              <div>
                <h4 className="font-semibold">{u.login}</h4>
                <p>Location: {u.location || "N/A"}</p>
                <p>Repositories: {u.public_repos}</p>
                <p>Followers: {u.followers}</p>
                <a href={u.html_url} target="_blank" className="text-blue-600">
                  View Profile
                </a>
              </div>
            </div>
          ))}

          <button
            onClick={() => handleAdvancedSearch(true)}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
