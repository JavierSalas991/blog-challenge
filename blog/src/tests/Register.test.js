import { validateFormRegister } from "../components/Register";

describe("Functions in Register.js", () => {

    describe("validateFormRegister", () => {
        const valid = {
            name: 'some name',
            lastName: 'some last name',
            email: 'somemail@example.com',
            password: 'samepassword',
            confirmPassword: 'samepassword'
        }

        const tests = [
            {
                message: "Debe retornar error si no se introdujo nombre",
                key: "name",
                value: "Debe ingresar su nombre!"
            },
            {
                message: "Debe retornar error si no se introdujo apellido",
                key: "lastName",
                value: "Debe ingresar su apellido!"
            },
            {
                message: "Debe retornar error si no se introdujo email",
                key: "email",
                value: 'Debe ingresar su correo electrónico!'
            },
            {
                message: "Debe retornar error si no se introdujo contraseña",
                key: "password",
                value: "La contraseña es obligatoria!"
            },
            {
                message: "Debe retornar error si no se introdujo la segunda contraseña",
                key: "confirmPassword",
                value: 'Debe confirmar la contraseña!'
            },
        ]

        tests.forEach(({ message, key, value }) => {
            it(message, () => {
                const result = validateFormRegister({ ...valid, [key]: "" });
                expect(result).toEqual({
                    [key]: value
                });
            });
        })

        it("Debe retornar error si las contraseñas no coinciden", () => {
            const result = validateFormRegister({ ...valid, password: "pass1", confirmPassword: "pass2" });
            expect(result).toEqual({
                confirmPassword: 'Las contraseñas no coinciden!'
            });
        });

        it("Debe retornar error si el mail no es válido", () => {
            const result = validateFormRegister({ ...valid, email: "mailnovalido" });
            expect(result).toEqual({
                email: 'El correo electrónico no es válido!'
            });
        });
    })
})
