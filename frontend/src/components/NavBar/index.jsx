import React from "react";
import { Link } from "react-router-dom";

const baseLink =
  "text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600";

function NavBar({ user, handleLogout, mobile = false, closeMenu }) {
  const layout = mobile
    ? "flex flex-col divide-y divide-gray-100"
    : "flex items-center gap-6";

  const itemStyle = mobile ? "px-5 py-4 hover:bg-gray-50" : "";

  const handleClick = () => {
    if (mobile && closeMenu) closeMenu();
  };

  return (
    <nav className={layout}>
      {user ? (
        <>
          <Link
            to="/daily-report"
            onClick={handleClick}
            className={`${baseLink} ${itemStyle}`}
          >
            Registro de Caixa
          </Link>

          <Link
            to="/products"
            onClick={handleClick}
            className={`${baseLink} ${itemStyle}`}
          >
            Produtos
          </Link>

          <button
            onClick={() => {
              handleLogout();
              handleClick();
            }}
            className={`${
              mobile
                ? "px-5 py-4 text-left text-red-600 hover:bg-red-50"
                : "rounded-md px-3 py-1.5 text-gray-600 hover:bg-gray-100"
            } text-sm font-medium transition`}
          >
            Sair
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            onClick={handleClick}
            className={`${baseLink} ${itemStyle}`}
          >
            Login
          </Link>

          <div className={mobile ? "px-5 py-4" : ""}>
            <Link
              to="/signin"
              onClick={handleClick}
              className="block rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Criar Conta
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;
