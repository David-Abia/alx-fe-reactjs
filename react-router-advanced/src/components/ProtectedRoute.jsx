import { Navigate } from "react-router-dom";

// Minimal ProtectedRoute that DOES NOT use useAuth
export default function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}
