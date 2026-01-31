import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Redireciona para a página inicial ou dashboard com base na autenticação
export default function NotFoundRedirect() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return <Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />;
}
