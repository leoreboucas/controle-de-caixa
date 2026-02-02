import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/DashboardCard";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { getIdToken } from "firebase/auth";
import { getDailyReport } from "../../services/dailyreport";
import { getProducts } from "../../services/products";
import {
  filterReportsByMonth,
  groupReportsByMonth,
  months,
} from "../../utils/monthSelected";
import { inputBase } from "../../utils/inputbase";

const sortByDateDesc = (reports) =>
  [...reports].sort((a, b) => new Date(b.date) - new Date(a.date));

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [dailyReports, setDailyReports] = useState([]);
  const [filteredMonth, setFilteredMonth] = useState([]);
  const [products, setProducts] = useState([]);
  const [netProfitTotal, setNetProfitTotal] = useState(0);
  const [grossProfitTotal, setGrossProfitTotal] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalDailyReports, setTotalDailyReports] = useState(0);

  useEffect(() => {
    const handleDailyReport = async () => {
      if (!user) return;

      const token = await getIdToken(user);
      const dailyReport = await getDailyReport(token);
      const sorted = sortByDateDesc(dailyReport.data);

      setDailyReports(sorted);
      setFilteredMonth(sorted);
    };

    if (user) handleDailyReport();
  }, [user]);

  useEffect(() => {
    const handleProducts = async () => {
      if (!user) return;

      const token = await getIdToken(user);
      const products = await getProducts(token);
      setProducts(products.data);
    };

    if (user) handleProducts();
  }, [user]);

  useEffect(() => {
    if (!filteredMonth.length) return;

    setGrossProfitTotal(
      filteredMonth
        .reduce((sum, e) => sum + e.grossProfit, 0)
        .toFixed(2)
        .replace(".", ","),
    );

    setNetProfitTotal(
      filteredMonth
        .reduce((sum, e) => sum + e.netProfit, 0)
        .toFixed(2)
        .replace(".", ","),
    );

    setTotalExpenses(
      filteredMonth
        .reduce((sum, e) => sum + e.totalExpense, 0)
        .toFixed(2)
        .replace(".", ","),
    );

    setTotalDailyReports(filteredMonth.length);
  }, [filteredMonth]);

  const handleMonthSelected = (e) => {
    setFilteredMonth(filterReportsByMonth(dailyReports, e.target.value));
  };

  const uniqueReports = groupReportsByMonth(dailyReports);

  if (loading)
    return <p className="p-6 text-sm text-gray-500">Carregando...</p>;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* HEADER */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Relatório Mensal
            </h1>
            <p className="text-sm text-gray-500">
              Parcial consolidado dos caixas registrados
            </p>
          </div>

          {/* FILTRO */}
          <div className="w-full sm:w-56">
            <select
              className={`${inputBase} bg-white transition focus:ring-2 focus:ring-indigo-500`}
              onChange={handleMonthSelected}
            >
              <option value="all">Todos os meses</option>
              {uniqueReports.map((dailyReport) => {
                const date = new Date(dailyReport.date);
                return (
                  <option key={dailyReport._id} value={date.getMonth()}>
                    {months[date.getMonth()]}/{date.getFullYear()}
                  </option>
                );
              })}
            </select>
          </div>
        </section>

        {/* RESUMO */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <DashboardCard
            title="Receita Bruta"
            value={`R$ ${grossProfitTotal}`}
          />
          <DashboardCard
            title="Despesas Totais"
            value={`R$ ${totalExpenses}`}
          />
          <DashboardCard
            title="Receita Líquida"
            value={`R$ ${netProfitTotal}`}
            highlight
          />
          <DashboardCard title="Caixas Registrados" value={totalDailyReports} />
        </section>

        {/* CONTEÚDO */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* CAIXAS */}
          <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">
                Caixas Recentes
              </h2>

              <Link
                to="/daily-report/new"
                className="text-sm font-medium text-indigo-600 transition hover:underline"
              >
                Novo caixa
              </Link>
            </div>

            <div className="space-y-3">
              {dailyReports.length > 0 ? (
                dailyReports.map((dailyReport) => (
                  <div
                    key={dailyReport._id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3 transition hover:bg-gray-50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Caixa •{" "}
                        {new Date(dailyReport.date).toLocaleDateString(
                          "pt-BR",
                          {
                            timeZone: "UTC",
                          },
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        Receita líquida do dia
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-green-600">
                      R${" "}
                      {Number(dailyReport.netProfit)
                        .toFixed(2)
                        .replace(".", ",")}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Sem caixas registrados</p>
              )}
            </div>
          </div>

          {/* PRODUTOS */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-700">
              Produtos Cadastrados
            </h2>

            <ul className="space-y-3">
              {products.length > 0 ? (
                products.map((product) => (
                  <li
                    key={product._id}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>{product.name}</span>
                    <span className="font-medium text-gray-800">
                      R${" "}
                      {Number(product.purchasePrice)
                        .toFixed(2)
                        .replace(".", ",")}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  Sem produtos cadastrados
                </p>
              )}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
