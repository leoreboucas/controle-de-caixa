function normalizeDateUTC(input) {
    if (!input) return null;

    // Se já for Date
    if (input instanceof Date) {
        if (isNaN(input.getTime())) return null;
        return input;
    }

    // Se for string YYYY-MM-DD
    if (typeof input === "string") {
        const date = new Date(`${input}T00:00:00Z`);
        if (isNaN(date.getTime())) return null;
        return date;
    }

    return null;
}

module.exports = normalizeDateUTC