import { useState } from "react";
import { fetchUserData, fetchAdvancedUsers } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");

  const [user, setUser] = useState(null);      // Basic search result
  const [users, setUsers] = useState([]);      // Advanced search results

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------
  // Basic search function
  // -----------------------
  const handleBasicSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUser(null);
    setUsers([]);

    if (!username) {
      setError("Please enter a username");
      setLoading(false);
      return;
    }

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------
  // Advanced search function
  // -----------------------
  const handleAdvancedSearch = async () => {
    setLoading(true);
    setError("");
    setUser(null);
    setUsers([]);

    try {
      const results = await fetchAdvancedUsers(username, location, minRepos);

      if (results.length === 0) {
        setError("No users found matching your criteria");
      }

      setUsers(results);
    } catch {
      setError("Looks like we can't find any users");
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
            onClick={handleAdvancedSearch}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Advanced Search
          </button>
        </div>
      </form>

      {/* Loading and error messages */}
      {loading && <p className="mt-4 text-gray-700">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {/* ----------------- */}
      {/* Basic Search Result */}
      {/* ----------------- */}
      {user && (
        <div className="mt-6 p-4 border rounded shadow flex items-center gap-4">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-24 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">{user.name || user.login}</h3>
            <a href={user.html_url} target="_blank" className="text-blue-600">
              View Profile
            </a>
          </div>
        </div>
      )}

      {/* --------------------- */}
      {/* Advanced Search Results */}
      {/* --------------------- */}
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
                <a href={u.html_url} target="_blank" className="text-blue-600">
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
