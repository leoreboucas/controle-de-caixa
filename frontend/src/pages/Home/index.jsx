import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-7xl px-6 py-16">
        <section className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">
              Controle financeiro simples, claro e eficiente
            </h1>

            <p className="mt-4 text-base text-gray-600">
              Gerencie os registros de caixa da sua empresa, acompanhe o
              desempenho mensal e mantenha seus produtos organizados — tudo em
              um único sistema.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/signin"
                className="rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
              >
                Criar conta
              </Link>

              <Link
                to="/login"
                className="rounded-md border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Entrar
              </Link>
            </div>
          </div>

          {/* Ilustração / Destaques */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                Registros diários de caixa com despesas e receitas
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                Relatórios mensais automáticos baseados nos caixas
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                Cadastro e gerenciamento de produtos
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                Acesso seguro com login e Google
              </li>
            </ul>
          </div>
        </section>

        <footer className="mt-24 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} • Sistema de Gestão Financeira
        </footer>
      </div>
    </main>
  );
}

export default Home;
