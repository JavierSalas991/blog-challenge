// Return a readable time difference from a date to now
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

// Format a date in Spanish
export const spanishDate = d => {
    const date = new Date(d);
    const day = date.getDate();
    const month = spanishMonths[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${month} de ${year}`
}

// Function to set a cookie with a name, value, and expiration time in days
export const setCookie = (cname, cvalue, days) => {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Function to get the value of a cookie by the name
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

// Function to delete a cookie by the name
export const deleteCookie = name => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// Function to get the current date in ISO format (YYYY-MM-DDTHH:MM:SSZ)
export function getCurrentDateInISOFormat() {
    const actualDate = new Date();
    const year = actualDate.getFullYear();
    const month = String(actualDate.getMonth() + 1).padStart(2, '0');
    const day = String(actualDate.getDate()).padStart(2, '0');
    const hour = String(actualDate.getHours()).padStart(2, '0');
    const minute = String(actualDate.getMinutes()).padStart(2, '0');
    const second = String(actualDate.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
}

// Returns the first letters of words in text in uppercase
export const firstLetters = text => {
    const words = text.split(" ")
    return (words[0][0] + words[1][0]).toUpperCase() || null
}
