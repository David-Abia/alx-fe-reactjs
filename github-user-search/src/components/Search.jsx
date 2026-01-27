import { useState } from "react";
import {
  fetchUserData,
  fetchAdvancedUsers,
} from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  // BASIC SEARCH
  const handleBasicSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUsers([]);
    setUser(null);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  // ADVANCED SEARCH
  const handleAdvancedSearch = async (loadMore = false) => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchAdvancedUsers({
        username,
        location,
        minRepos,
        page: loadMore ? page + 1 : 1,
      });

      setUsers(loadMore ? [...users, ...data.items] : data.items);
      setPage(loadMore ? page + 1 : 1);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* SEARCH FORM */}
      <form
        onSubmit={handleBasicSearch}
        className="bg-white p-4 rounded-lg shadow space-y-4"
      >
        <h2 className="text-xl font-bold">GitHub User Search</h2>

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

      {/* STATES */}
      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {/* BASIC SEARCH RESULT */}
      {user && (
        <div className="mt-6 p-4 border rounded shadow">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-24 rounded-full"
          />
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <a
            href={user.html_url}
            target="_blank"
            className="text-blue-600"
          >
            View Profile
          </a>
        </div>
      )}

      {/* ADVANCED SEARCH RESULTS */}
      {users.length > 0 && (
        <div className="mt-6 space-y-4">
          {users.map((u) => (
            <div
              key={u.id}
              className="p-4 border rounded flex items-center gap-4"
            >
              <img
                src={u.avatar_url}
                className="w-16 rounded-full"
                alt={u.login}
              />
              <div>
                <h4 className="font-semibold">{u.login}</h4>
                <a
                  href={u.html_url}
                  target="_blank"
                  className="text-blue-600"
                >
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
