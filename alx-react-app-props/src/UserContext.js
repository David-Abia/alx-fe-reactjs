import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [name, setName] = useState("Jane Doe");
  const [email] = useState("jane.doe@example.com");

  return (
    <UserContext.Provider value={{ name, email }}>
      <div>
        <input
          type="text"
          placeholder="Update name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {children}
    </UserContext.Provider>
  );
}