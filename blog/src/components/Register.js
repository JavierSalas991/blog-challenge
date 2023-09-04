import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/userContext/UserContext';
import { useNavigate } from 'react-router-dom';
import Title from './Title';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@mui/material';
import { postRegister } from '../helpers/apiHHelper';
import Swal from 'sweetalert2';

export const validateFormRegister = (formData) => {
    const errorForm = {};
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i

    if (!formData.name) {
        errorForm.name = 'Debe ingresar su nombre!';
    }

    if (!formData.lastName) {
        errorForm.lastName = 'Debe ingresar su apellido!';
    }

    if (!formData.email) {
        errorForm.email = 'Debe ingresar su correo electrónico!';
    } else if (!regex.test(formData.email)) {
        errorForm.email = 'El correo electrónico no es válido!';
    }

    if (!formData.password) {
        errorForm.password = 'La contraseña es obligatoria!';
    }

    if (!formData.confirmPassword) {
        errorForm.confirmPassword = 'Debe confirmar la contraseña!';
    }

    if (formData.confirmPassword && formData.password && (formData.confirmPassword !== formData.password)) {
        errorForm.confirmPassword = 'Las contraseñas no coinciden!';
    }

    return errorForm
}

const Register = () => {
    const navigate = useNavigate();

    const { user } = useContext(UserContext)

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const formErrors = validateFormRegister(formData)
        if (Object.keys(formErrors).length === 0) {
            const data = {
                "name": `${formData.name} ${formData.lastName}`,
                "email": formData.email,
                "password": formData.password
            }
            postRegister(data)
                .then(res => {
                    res.status === 201 && userCreated()
                })
                .catch(error => {
                    Swal.fire({
                        html: error.message,
                        icon: 'error',
                        showCancelButton: true,
                        confirmButtonColor: '#2c5884',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Iniciar sesión',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/login")
                        }
                    })
                })
        } else {
            setErrors(formErrors)
        }
    };

    const userCreated = () => {
        Swal.fire({
            html: 'Usuario creado con éxito!',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#2c5884',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iniciar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/login")
            }
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
                            <InputLabel >Nombres</InputLabel>
                            <Input name="name" onChange={handleChange} />
                            {errors.name && <p style={{ fontSize: "80%" }} className='text-danger'>{errors.name}</p>}
                        </FormControl>
                    </div>
                    <div className='my-2'>

                        <FormControl>
                            <InputLabel >Apellidos</InputLabel>
                            <Input name="lastName" onChange={handleChange} />
                            {errors.lastName && <p style={{ fontSize: "80%" }} className='text-danger'>{errors.lastName}</p>}
                        </FormControl>
                    </div>

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

                    <div className='my-2'>
                        <FormControl>
                            <InputLabel >Repetir contraseña</InputLabel>
                            <Input type="password" name="confirmPassword" onChange={handleChange} />
                            {errors.confirmPassword && <p style={{ fontSize: "80%" }} className='text-danger'>{errors.confirmPassword}</p>}
                        </FormControl>
                    </div>

                    <div className='mt-4 d-flex justify-content-center'>
                        <Button variant="contained" type="submit">Crear cuenta</Button>
                    </div>

                </form>
                <div className='mt-3 d-flex'>
                    <p style={{ fontSize: "90%" }} className='text-muted'>¿Ya tienes una cuenta? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>INICIA SESIÓN</span></p>
                </div>
            </div>
        </div>
    );
};

export default Register;