import React from 'react';
import { Link } from 'react-router-dom';

// Estilos para os links de navegação
const linkNavStyle =
  "text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors";

// Componente NavBar para navegação principal
function NavBar( {user, handleLogout }) {
  return (
    <nav className="flex items-center gap-6">
  

      {user ? (
            <>
                <Link to="/daily-report" className={linkNavStyle}>
                  Registro de Caixa
                </Link>
              
              <Link to="/products" className={linkNavStyle}>
                Produtos
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkNavStyle}>
                      Login
                    </Link>
              
                    <Link
                      to="/signin"
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                    >
                      Criar Conta
                    </Link>
            </>
            )}
    </nav>
  );
}

export default NavBar;