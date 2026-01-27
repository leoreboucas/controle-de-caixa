import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase"; // ajuste o path se necessário
import NavBar from "../NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <header className="h-16 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div>
          {user ? (
            <Link to="/dashboard" className="text-lg font-semibold text-indigo-600">
              LOGO
            </Link>
          ) : (
            <Link to="/" className="text-lg font-semibold text-indigo-600">
              LOGO
            </Link>
          )}
        </div>

        {/* Navegação + Logout */}
        <div className="flex items-center gap-6">
          <NavBar user={user} handleLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
}

export default Header;
