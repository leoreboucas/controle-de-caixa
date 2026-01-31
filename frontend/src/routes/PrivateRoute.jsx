import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Rota privada que verifica autenticação antes de renderizar o componente filho
export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // ou loader

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
