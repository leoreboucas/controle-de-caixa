// Utilitários para manipulação de relatórios por mês

// Nomes dos meses em português
export const months = [
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
    "Dezembro",
];

// Agrupa relatórios por mês e ano
export function groupReportsByMonth(reports) {
    return Array.from(
        new Map(
            reports.map((report) => {
                const date = new Date(report.date);
                const key = `${date.getMonth()}-${date.getFullYear()}`;
                return [key, report];
            }),
        ).values(),
    );
}

// Filtra relatórios com base no mês selecionado
export function filterReportsByMonth(reports, selectedMonth) {
    if (selectedMonth === "all") return reports;

    return reports.filter((report) => {
        const date = new Date(report.date);
        return (
            date.getUTCMonth() === Number(selectedMonth)
        );
    });
}
