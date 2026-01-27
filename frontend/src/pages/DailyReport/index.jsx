import React, { useEffect, useState } from "react";
import InfoItem from "../../components/InfoItem";
import { Link } from "react-router-dom";
import { getIdToken } from "firebase/auth";
import { getDailyReport } from "../../services/dailyreport";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { inputBase } from "../../utils/inputbase";


function DailyReport() {
  const [user] = useAuthState(auth);
  const [dailyReports, setDailyReports] = useState([]);
  const [filtteredMonth, setFiltteredMonth] = useState([]);

  useEffect(() => {
      const handleDailyReport = async () => {
        if (!user) return;
  
        const token = await getIdToken(user);
        try {
          const dailyReport = await getDailyReport(token);
          setDailyReports(dailyReport.data);
          setFiltteredMonth(dailyReport.data);
        } catch(error) {
          console.log(error)
        }
      };
  
  
      if (user) handleDailyReport();
    }, [user]);

  const handleMonthSelected = (e) => {
    const selectedMonth = e.target.value;

    if (selectedMonth === "all") {
      setFiltteredMonth(dailyReports);
    } else {
      setFiltteredMonth(
        dailyReports.filter(
          (report) =>
            new Date(report.date).getMonth() === Number(selectedMonth),
        )
      );
    }
  };

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];

  const uniqueReports = Array.from(
    new Map(
      dailyReports.map((dailyReport) => {
        const date = new Date(dailyReport.date);
        const key = `${date.getMonth()}-${date.getFullYear()}`;

        return [key, dailyReport];
      }),
    ).values(),
  );

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* CABEÇALHO */}
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Daily Report
            </h1>
            <p className="text-sm text-gray-500">
              Histórico diário de caixas registrados
            </p>
          </div>

          {/* FILTRO MOCK */}
          <div className="rounded-lg border border-gray-200 bg-white text-sm text-gray-700">
            <select className={inputBase} name="daily-report" onChange={handleMonthSelected}>
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

        {/* AÇÃO + LISTA (MESMO CONTEXTO VISUAL) */}
        <section className="space-y-4">
          {/* AÇÃO: NOVO REGISTRO */}
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

          {filtteredMonth.length > 0 ? (
            filtteredMonth.map((dailyReport) => (
              <div
                key={dailyReport._id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                {/* TOPO DO CARD */}
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Caixa •{" "}
                      {new Date(dailyReport.date).toLocaleDateString("pt-BR")}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Registro diário do caixa
                    </p>
                  </div>
                </div>

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
                    value={`R$ ${(
                      dailyReport.finalCash +
                      dailyReport.initialCash +
                      dailyReport.totalExpense
                    )
                      .toFixed(2)
                      .replace(".", ",")}`}
                  />
                  <InfoItem
                    label="Despesas"
                    value={`R$ ${dailyReport.totalExpense.toFixed(2).replace(".", ",")}`}
                  />
                  <InfoItem
                    label="Receita Líquida"
                    value={`R$ ${(
                      dailyReport.finalCash -
                      dailyReport.initialCash -
                      dailyReport.totalExpense
                    )
                      .toFixed(2)
                      .replace(".", ",")}`}
                    highlight
                  />
                </div>
              </div>
            ))
          ) : (
            <div>Vazio por enquanto</div>
          )}
        </section>
      </div>
    </main>
  );
}

export default DailyReport;
