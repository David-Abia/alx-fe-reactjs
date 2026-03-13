import { useContext } from "react";
import UserContext from "./UserContext";

function UserProfile() {
  const userData = useContext(UserContext);

  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>

      <input
        type="text"
        placeholder="Update name"
      />
    </div>
  );
}

export default UserProfile;