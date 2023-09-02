export const textSince = (date) => {
    const since = new Date(date);
    const today = new Date();
    const difference = today - since;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
        return "Hoy"
    } else if (days <= 7) {
        return `Hace ${days} dia${days !== 1 ? "s" : ""}`
    } else {
        const weeks = Math.floor(days / 7)
        return `Hace ${weeks} semana${weeks !== 1 ? "s" : ""}`
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
}

export const setCookie = (cname, cvalue, days) => {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const deleteCookie = name => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

export function getCurrentDateInISOFormat() {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const día = String(fechaActual.getDate()).padStart(2, '0');
    const hora = String(fechaActual.getHours()).padStart(2, '0');
    const minuto = String(fechaActual.getMinutes()).padStart(2, '0');
    const segundo = String(fechaActual.getSeconds()).padStart(2, '0');

    return `${año}-${mes}-${día}T${hora}:${minuto}:${segundo}Z`;
}
