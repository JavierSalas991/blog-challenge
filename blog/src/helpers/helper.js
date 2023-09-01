export const textSince = (date) => {
    const since = new Date(date);
    const today = new Date();
    const difference = today - since;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    console.log(days);
    if (days === 0) {
        return "Publicado hoy"
    } else if (days <= 7) {
        return `Publicado hace ${days} dia${days !== 1 ? "s" : ""}`
    } else {
        const weeks = Math.floor(days / 7)
        return `Publicado hace ${weeks} semana${weeks !== 1 ? "s" : ""}`
    }
}

export const spanishMonths = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

export const spanishDate = d => {
    const date = new Date(d);
    const day = date.getDate();
    const month = spanishMonths[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${month} de ${year}`
    // return {
    //     day,
    //     month,
    //     year,
    // };
}

