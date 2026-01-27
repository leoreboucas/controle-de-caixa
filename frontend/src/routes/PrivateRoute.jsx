import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // ou loader

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
