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

export function filterReportsByMonth(reports, selectedMonth) {
    if (selectedMonth === "all") return reports;

    return reports.filter((report) => {
        const date = new Date(report.date);
        return (
            date.getMonth() === Number(selectedMonth)
        );
    });
}
