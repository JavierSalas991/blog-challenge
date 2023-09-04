import { getCurrentDateInISOFormat, deleteCookie, setCookie, getCookie, spanishDate, spanishMonths, textSince } from "../helpers/helper";

describe("Functions in helper.js", () => {
    describe("getCurrentDateInISOFormat", () => {
        const date = new Date();
        it("La funcion debe retornar la fecha en formato ISO", () => {
            const result = getCurrentDateInISOFormat(date);
            expect(result).toMatch(/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
        });
    })

    describe("deleteCookie", () => {
        it("La funcion debe eliminar la cookie", () => {
            document.cookie = "nameOfTheCookie1=value1";
            deleteCookie("nameOfTheCookie1");
            const cookies = document.cookie.split("; ");
            expect(cookies).not.toContain("nameOfTheCookie1");
        });
    });

    describe("setCookie", () => {
        it("La funcion debe configurar una cookie correctamente", () => {
            setCookie("nameOfTheCookie2", "value2", 1)
            const allCookies = document.cookie;
            expect(allCookies).toContain("nameOfTheCookie2=value2");
        });
    });

    describe("getCookie", () => {
        document.cookie = "nameOfTheCookie3=value3";

        it("La funcion debe obtener el valor de una cookie existente", () => {
            expect(getCookie("nameOfTheCookie3")).toBe("value3");
        });

        it('Si la cookie no existe devuelve ""', () => {
            expect(getCookie("inexistentCookie")).toBe("");
        });
    });

    describe("spanishDate and spanishMonths", () => {
        it("La funcion debería devvolver correctamente una fecha en español tras recibirla en formato ISO", () => {
            const date = "2023-07-10T15:45:00Z"
            const string = `10 de ${spanishMonths[6]} de 2023`
            const result = spanishDate(date)
            expect(result).toBe(string)
        });
    });

    describe("textSince", () => {
        it("Debería devolver 'Hoy' para fechas del mismo dia", () => {
            const today = new Date();
            const result = textSince(today);
            expect(result).toBe("Hoy");
        });
    
        it("Debería devolver los dias que pasaron si fue hace menos de una semana", () => {
            const today = new Date();
            const oneDayAgo = new Date(today);
            const sixDaysAgo = new Date(today);
            oneDayAgo.setDate(today.getDate() - 1);
            sixDaysAgo.setDate(today.getDate() - 6);
            const result1 = textSince(oneDayAgo);
            const result6 = textSince(sixDaysAgo);
            expect(result1).toBe("Hace 1 dia");
            expect(result6).toBe("Hace 6 dias");
        });
    
        it("Debería devolver las semanas que pasaron si fue hace mas de una semana", () => {
            const today = new Date();
            const thirtyDaysAgo = new Date(today);
            thirtyDaysAgo.setDate(today.getDate() - 30);
            const result = textSince(thirtyDaysAgo);
            expect(result).toBe("Hace 4 semanas");
        });
    });

})