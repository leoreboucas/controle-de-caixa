import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-7xl px-6 py-16 animate-fade-in">
        <section className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          {/* TEXTO */}
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl leading-tight">
              Controle financeiro simples, claro e eficiente
            </h1>

            <p className="text-base text-gray-600 max-w-lg">
              Gerencie os registros de caixa da sua empresa, acompanhe o
              desempenho mensal e mantenha seus produtos organizados — tudo em
              um único sistema.
            </p>

            <div className="flex gap-4 pt-2">
              <Link
                to="/signin"
                className="
                  rounded-lg bg-indigo-600 px-6 py-2.5
                  text-sm font-medium text-white
                  transition-all duration-200
                  hover:bg-indigo-500 hover:shadow-md
                  active:scale-95
                "
              >
                Criar conta
              </Link>

              <Link
                to="/login"
                className="
                  rounded-lg border border-gray-300 px-6 py-2.5
                  text-sm font-medium text-gray-700
                  transition hover:bg-gray-100
                "
              >
                Entrar
              </Link>
            </div>
          </div>

          {/* CARD DE DESTAQUES */}
          <div
            className="
              rounded-xl border border-gray-200 bg-white p-6 shadow-sm
              transition-all duration-300
              hover:shadow-md hover:-translate-y-1
            "
          >
            <ul className="space-y-4 text-sm text-gray-700">
              {[
                "Registros diários de caixa com despesas e receitas",
                "Relatórios mensais automáticos baseados nos caixas",
                "Cadastro e gerenciamento de produtos",
                "Acesso seguro com login e Google",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-24 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} • Sistema de Gestão Financeira
        </footer>
      </div>
    </main>
  );
}

export default Home;
