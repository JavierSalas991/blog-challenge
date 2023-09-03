import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/userContext/UserContext';
import { useNavigate } from 'react-router-dom';
import Title from './Title';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@mui/material';
import { loginUser, postRegister } from '../helpers/apiHHelper';
import Swal from 'sweetalert2';

export const validateFormLogin = (formData) => {
    const errorForm = {};

    if (!formData.email) {
        errorForm.email = 'Debe ingresar su correo electrónico!';
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(formData.email)) {
        errorForm.email = 'El correo electrónico no es válido!';
    }

    if (!formData.password) {
        errorForm.password = 'La contraseña es obligatoria!';
    }

    return errorForm
}

const Login = () => {

    const navigate = useNavigate();

    const { user, setUserWithCookie } = useContext(UserContext)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors(errors => ({
            ...errors,
            [name]: null
        }))
        setFormData((formData) => ({
            ...formData,
            [name]: value,
        }));
    };

    const handleError = error => {
        if (error.message === 'El correo electrónico no está registrado') {
            setErrors({
                ...errors,
                email: error.message
            })
        } else if (error.message === 'Contraseña incorrecta') {
            setErrors({
                ...errors,
                password: error.message
            })
        } else {
            Swal.fire({
                html: error.message,
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#2c5884',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Iniciar sesión',
                cancelButtonText: 'Cancelar'
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errorsInForm = validateFormLogin(formData)
        if (Object.keys(errorsInForm).length === 0) {
            loginUser(formData)
                .then(res => {
                    res.status === 200 && loggedIn(res.data[0])
                })
                .catch(error => {
                    handleError(error)
                })
        } else {
            setErrors(errorsInForm);
        }
    };



    const loggedIn = (user) => {
        Swal.fire({
            icon: 'success',
            title: `Bienvenido ${user.name}!`,
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            setUserWithCookie(user)
            navigate("/")
        })
    }

    useEffect(() => {
        user && navigate("/")
    }, [user])

    return (
        <div style={{ width: "100%", height: "100vh" }} className='d-flex justify-content-center align-items-center'>
            <div className='containerRegister d-flex flex-column'>
                <form style={{ width: "auto" }} onSubmit={handleSubmit}>
                    <Title></Title>

                    <div className='my-2'>
                        <FormControl>
                            <InputLabel >Correo  electrónico</InputLabel>
                            <Input name="email" onChange={handleChange} />
                            {errors.email && <p style={{ fontSize: "80%" }} className='text-danger'>{errors.email}</p>}
                        </FormControl>
                    </div>

                    <div className='my-2'>
                        <FormControl>
                            <InputLabel >Contraseña</InputLabel>
                            <Input type="password" name="password" onChange={handleChange} />
                            {errors.password && <p style={{ fontSize: "80%" }} className='text-danger'>{errors.password}</p>}
                        </FormControl>

                    </div>

                    <div className='mt-4 d-flex justify-content-center'>
                        <Button variant="contained" type="submit">Iniciar sesión</Button>
                    </div>

                </form>
                <div className='mt-3 d-flex'>
                    <p style={{ fontSize: "90%" }} className='text-muted'>¿Aún no  te  registraste? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => navigate("/register")}>CREAR CUENTA</span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;