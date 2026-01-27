import { useState } from "react";
import React from 'react';

// import { Container } from './styles';

export const [filtteredMonth, setFiltteredMonth] = useState([])

export const handleMonthSelected = (e) => {
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
    "Dezembro"
];

export const uniqueReports = Array.from(
    new Map(
        dailyReports.map((dailyReport) => {
            const date = new Date(dailyReport.date);
            const key = `${date.getMonth()}-${date.getFullYear()}`;

            return [key, dailyReport];
        }),
    ).values(),
);