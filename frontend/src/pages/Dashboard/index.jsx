import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/DashboardCard";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { getIdToken } from "firebase/auth";
import { getDailyReport } from "../../services/dailyreport";
import { getProducts } from "../../services/products";
import { filterReportsByMonth, groupReportsByMonth, months } from "../../utils/monthSelected";
import { inputBase } from "../../utils/inputbase";

// Função para ordenar os relatórios por data em ordem decrescente
const sortByDateDesc = (reports) => {
  return [...reports].sort((a, b) => new Date(b.date) - new Date(a.date));
};

function Dashboard() {
  const [user] = useAuthState(auth);
  const [dailyReports, setDailyReports] = useState([]);
  const [filteredMonth, setFilteredMonth] = useState([]);
  const [products, setProducts] = useState([]);
  const [netProfitTotal, setNetProfitTotal] = useState(0);
  const [grossProfitTotal, setGrossProfitTotal] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [totalDailyReports, setTotalDailyReports] = useState(0) 

  // Carregar relatórios diários do usuário autenticado
  useEffect(() => {
    const handleDailyReport = async () => {
      if (!user) return;

      const token = await getIdToken(user);
      try {
        const dailyReport = await getDailyReport(token);
        const sortedReports = sortByDateDesc(dailyReport.data);

        setDailyReports(sortedReports);
        setFilteredMonth(sortedReports);
      } catch (error) {
        alert(error.response?.data?.message);
      }
    };

    if (user) handleDailyReport();
  }, [user]);

  // Carregar produtos do usuário autenticado
  useEffect(() => {
    const handleProducts = async () => {
      if (!user) return;

      const token = await getIdToken(user);
      const products = await getProducts(token);
      setProducts(products.data);
    };

    if (user) handleProducts();
  }, [user]);

  // Calcular totais sempre que o mês filtrado mudar
  useEffect(() => {
    if(filteredMonth.length > 0){
      setGrossProfitTotal(
        filteredMonth
          .reduce((sum, e) => sum + e.grossProfit, 0)
          .toFixed(2)
          .replace(".", ","),
      );
      setNetProfitTotal(
        filteredMonth.reduce((sum, e) => sum + e.netProfit, 0).toFixed(2).replace('.', ','),
      );
      setTotalExpenses(
        filteredMonth
          .reduce((sum, e) => sum + e.totalExpense, 0)
          .toFixed(2)
          .replace(".", ","),
      );
      setTotalDailyReports(filteredMonth.length)
    }
  }, [filteredMonth])

  // Manipulador de seleção de mês
  const handleMonthSelected = (e) => {
      if (!dailyReports.length) return;
  
      const selectedMonth = e.target.value;
  
      setFilteredMonth(filterReportsByMonth(dailyReports, selectedMonth));
    };
  
  // Obter meses únicos para o seletor de meses
  const uniqueReports = groupReportsByMonth(dailyReports)

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Relatório Mensal
            </h1>
            <p className="text-sm text-gray-500">
              Parcial consolidado dos caixas registrados
            </p>
          </div>

          {/* SELETOR DE MÊS  */}
          {/* FILTRO*/}
                    <div className="rounded-lg border border-gray-200 bg-white text-sm text-gray-700">
                      <select
                        className={inputBase}
                        name="daily-report"
                        onChange={handleMonthSelected}
                      >
                        <option value="all">Todos os meses</option>
                        {uniqueReports.map((dailyReport) => {
                          const date = new Date(dailyReport.date);
                          const month = months[date.getMonth()];
                          const year = date.getFullYear();
          
                          return (
                            <option key={`${month}-${year}`} value={date.getMonth()}>
                              {month}/{year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
        </section>

        {/* RESUMO MENSAL */}
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
          <DashboardCard
            title="Caixas Registrados"
            value={`${totalDailyReports}`}
          />
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
              {/* LISTA DE CAIXAS */}
              {dailyReports.length > 0 ? (
                dailyReports.map((dailyReport) => (
                  <div
                    key={dailyReport._id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3 hover:bg-gray-50"
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
                <p>Sem caixas registrados</p>
              )}
            </div>
          </div>

          {/* PRODUTOS */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
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
                <p>Sem produtos cadastrados</p>
              )}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
