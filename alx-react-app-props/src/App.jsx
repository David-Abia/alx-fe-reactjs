import ProfilePage from "./ProfilePage";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <ProfilePage />
    </UserProvider>
  );
}

export default App;