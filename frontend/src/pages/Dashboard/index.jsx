import React from "react";
import DashboardCard from "../../components/DashboardCard";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* CABEÇALHO */}
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Relatório Mensal
            </h1>
            <p className="text-sm text-gray-500">
              Parcial consolidado dos caixas registrados
            </p>
          </div>

          {/* SELETOR DE MÊS (mock) */}
          <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700">
            Setembro / 2025
          </div>
        </section>

        {/* RESUMO MENSAL */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <DashboardCard title="Receita Bruta" value="R$ 28.400,00" />
          <DashboardCard title="Despesas Totais" value="R$ 6.350,00" />
          <DashboardCard
            title="Receita Líquida"
            value="R$ 22.050,00"
            highlight
          />
          <DashboardCard title="Média Diária" value="R$ 1.468,00" />
          <DashboardCard title="Caixas Registrados" value="19" />
        </section>

        {/* CONTEÚDO */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* CAIXAS RECENTES */}
          <div className="lg:col-span-2 rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">
                Caixas Recentes
              </h2>

              <Link
                to="/daily-report/new"
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                Registrar novo caixa
              </Link>
            </div>

            <div className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3 hover:bg-gray-50"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Caixa • 18/09/2025
                    </p>
                    <p className="text-xs text-gray-500">
                      Receita líquida do dia
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-green-600">
                    R$ 1.120,00
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* PRODUTOS */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-700">
              Produtos Cadastrados
            </h2>

            <ul className="space-y-3">
              {["Café", "Pão", "Refrigerante", "Bolo"].map((produto) => (
                <li
                  key={produto}
                  className="flex justify-between text-sm text-gray-600"
                >
                  <span>{produto}</span>
                  <span className="font-medium text-gray-800">R$ 10,00</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
