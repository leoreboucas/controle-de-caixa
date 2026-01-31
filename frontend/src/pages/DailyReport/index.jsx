import React, { useEffect, useState } from "react";
import InfoItem from "../../components/InfoItem";
import { Link } from "react-router-dom";
import { getIdToken } from "firebase/auth";
import { deleteDailyReport, getDailyReport } from "../../services/dailyreport";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { inputBase } from "../../utils/inputbase";
import { 
  filterReportsByMonth,
  groupReportsByMonth,
  months
} from '../../utils/monthSelected'

const sortByDateDesc = (reports) => {
  return [...reports].sort((a, b) => new Date(b.date) - new Date(a.date));
};

function DailyReport() {
  const [user] = useAuthState(auth);
  const [dailyReports, setDailyReports] = useState([]);
  const [filteredMonth, setFilteredMonth] = useState([]);

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
          
        } catch(error) {
          alert(error.response?.data?.message)
        }
      };
  
  
      if (user) handleDailyReport();
    }, [user]);

    // Filtrar relatórios pelo mês selecionado
  const handleMonthSelected = (e) => {
    if (!dailyReports.length) return;

    const selectedMonth = e.target.value;
    const filtered = filterReportsByMonth(dailyReports, selectedMonth);

    setFilteredMonth(sortByDateDesc(filtered));
  };

  // Função para excluir um relatório diário
  const handleDelete = async (dailyReportId) => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir esse caixa?`,
    );
  
    if (!confirmDelete) return;
  
    const token = await getIdToken(user);
    try {
      await deleteDailyReport(token, dailyReportId);
      setFilteredMonth(prev => 
        prev.filter(dailyReport => dailyReport._id !== dailyReportId)
      )
    } catch (error) {
      return error.response?.data?.message;
    }
  };

  // Obter meses únicos para o seletor de meses
  const uniqueReports = groupReportsByMonth(dailyReports)

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* CABEÇALHO */}
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Caixa Diário
            </h1>
            <p className="text-sm text-gray-500">
              Histórico diário de caixas registrados
            </p>
          </div>

          {/* FILTRO */}
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

        {/* AÇÃO + LISTA */}
        <section className="space-y-4">
          <div className="rounded-xl bg-indigo-100 p-5 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Novo registro de caixa
              </h2>
              <p className="text-sm text-gray-500">
                Registre o caixa diário com valores consolidados
              </p>
            </div>

            <Link
              to="/daily-report/new"
              className="inline-flex items-center justify-center rounded-lg border border-transparent bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:border-indigo-400 transition-colors"
            >
              Registrar caixa
            </Link>
          </div>

          {/* LISTA DE CAIXAS */}
          {filteredMonth.length > 0 ? (
            filteredMonth.map((dailyReport) => {
              const date = new Date(dailyReport.date);

              const formatted = date.toLocaleDateString("pt-BR", {
                timeZone: "UTC",
              });
              return (
                <div
                  key={dailyReport._id}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >
                  {/* TOPO DO CARD */}
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        Caixa • {formatted}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Registro diário do caixa
                      </p>
                    </div>

                    {/* AÇÕES */}
                    <div className="flex gap-2">
                      {/* EDITAR */}
                      <Link
                        to={`/daily-report/edit/${dailyReport._id}`}
                        className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition"
                      >
                        Editar
                      </Link>

                      {/* EXCLUIR */}
                      <button
                        type="button"
                        onClick={() => handleDelete(dailyReport._id)}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 cursor-pointer py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 transition"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                  {/* INFORMAÇÕES DO CARD */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <InfoItem
                      label="Caixa Inicial"
                      value={`R$ ${dailyReport.initialCash.toFixed(2).replace(".", ",")}`}
                    />
                    <InfoItem
                      label="Caixa Final"
                      value={`R$ ${dailyReport.finalCash.toFixed(2).replace(".", ",")}`}
                    />
                    <InfoItem
                      label="Receita Bruta"
                      value={`R$ ${dailyReport.grossProfit
                        .toFixed(2)
                        .replace(".", ",")}`}
                    />
                    <InfoItem
                      label="Despesas"
                      value={`R$ ${dailyReport.totalExpense.toFixed(2).replace(".", ",")}`}
                    />
                    <InfoItem
                      label="Receita Líquida"
                      value={`R$ ${dailyReport.netProfit
                        .toFixed(2)
                        .replace(".", ",")}`}
                      highlight
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-sm text-gray-500">Sem caixas registrados</p>
          )}
        </section>
      </div>
    </main>
  );
}

export default DailyReport;
