import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import NavBar from "../NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Menu, X } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          to={user ? "/dashboard" : "/"}
          className="flex items-center"
        >
          <img src="/favicon.jpg" alt="Logo" className="h-12 w-30" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex">
          <NavBar user={user} handleLogout={handleLogout} />
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden rounded-lg p-2 text-gray-700 transition hover:bg-gray-100"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <NavBar
            user={user}
            handleLogout={handleLogout}
            mobile
            closeMenu={() => setMenuOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
