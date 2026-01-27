import { useState } from "react";
import { fetchUserData, fetchAdvancedUsers } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------
  // Basic search
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
  // Advanced search
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
    <div className="max-w-6xl mx-auto p-6">
      {/* Search Form */}
      <form
        onSubmit={handleBasicSearch}
        className="bg-white p-6 rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800">GitHub User Search</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Location"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="number"
            placeholder="Minimum Repositories"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Basic Search
          </button>

          <button
            type="button"
            onClick={handleAdvancedSearch}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Advanced Search
          </button>
        </div>
      </form>

      {/* Loading and Error */}
      {loading && <p className="mt-6 text-gray-600 text-lg">Loading...</p>}
      {error && <p className="mt-6 text-red-600 text-lg">{error}</p>}

      {/* ----------------- */}
      {/* Basic Search Result */}
      {/* ----------------- */}
      {user && (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg flex items-center gap-6 hover:shadow-xl transition">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-28 h-28 rounded-full border-2 border-gray-200"
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              {user.name || user.login}
            </h3>
            <p className="text-gray-600 mt-1">{user.login}</p>
            <a
              href={user.html_url}
              target="_blank"
              className="text-blue-600 mt-2 inline-block font-medium hover:underline"
            >
              View Profile
            </a>
          </div>
        </div>
      )}

      {/* --------------------- */}
      {/* Advanced Search Results */}
      {/* --------------------- */}
      {users.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((u) => (
            <div
              key={u.id}
              className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center hover:shadow-2xl transition"
            >
              <img
                src={u.avatar_url}
                alt={u.login}
                className="w-24 h-24 rounded-full border-2 border-gray-200"
              />
              <h4 className="mt-3 text-lg font-semibold text-gray-800">{u.login}</h4>
              <a
                href={u.html_url}
                target="_blank"
                className="mt-2 text-blue-600 font-medium hover:underline"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
