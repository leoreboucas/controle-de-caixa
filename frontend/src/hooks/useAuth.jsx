import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../services/firebase";

// Hook personalizado para gerenciar autenticação do usuário
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitorar mudanças no estado de autenticação
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Retornar estado de autenticação
  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
}
