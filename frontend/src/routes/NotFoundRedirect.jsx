import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function NotFoundRedirect() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return <Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />;
}
