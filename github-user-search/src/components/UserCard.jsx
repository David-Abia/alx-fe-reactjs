const UserCard = ({ user }) => {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm bg-white">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-14 h-14 rounded-full"
      />

      <div>
        <h3 className="font-semibold text-lg">{user.login}</h3>
        <p className="text-sm text-gray-600">
          📍 {user.location || "Not specified"}
        </p>
        <p className="text-sm text-gray-600">
          📦 Repos: {user.public_repos}
        </p>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm hover:underline"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default UserCard;
