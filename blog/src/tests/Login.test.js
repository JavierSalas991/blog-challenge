import { validateFormLogin } from "../components/Login";

describe("Functions in Login.js", () => {
    describe("validateFormLogin", () => {
        const data = {
            empty: {
                email: '',
                password: ''
            },
            emptyMail: {
                email: '',
                password: 'somepassword'
            },
            emptyPassword: {
                email: 'somemail@example.com',
                password: ''
            },
            invalidMail: {
                email: 'someinvalidmail',
                password: 'somepassword'
            },
            valid: {
                email: 'valid@example.com',
                password: 'validpassword'
            }
        };

        it("Debe retornar error para email y password si ambos son vacios", () => {
            const result = validateFormLogin(data.empty);
            expect(result).toEqual({
                email: 'Debe ingresar su correo electrónico!',
                password: 'La contraseña es obligatoria!'
            });
        });

        it("Debe retornar error para email vacio", () => {
            const result = validateFormLogin(data.emptyMail);
            expect(result).toEqual({
                email: 'Debe ingresar su correo electrónico!'
            });
        });

        it("Debe retornar error para password vacio", () => {
            const result = validateFormLogin(data.emptyPassword);
            expect(result).toEqual({
                password: 'La contraseña es obligatoria!'
            });
        });

        it("Debe retornar error para email invalido", () => {
            const result = validateFormLogin(data.invalidMail);
            expect(result).toEqual({
                email: 'El correo electrónico no es válido!'
            });
        });

        it("Debe retornar un arreglo vacio si los campos son validos", () => {
            const result = validateFormLogin(data.valid);
            expect(result).toEqual({});
        });
    });
});
