import React, { useContext, useEffect, useState } from 'react';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@mui/material';
import Swal from 'sweetalert2';
import UserContext from '../../context/userContext/UserContext';
import { Form } from 'react-bootstrap';
import { getCurrentDateInISOFormat, getThisMoment } from '../../helpers/helper';
import { postNewPost } from '../../helpers/apiHHelper';

const NewPost = ({ setNewPost, getPostsOfPage, getPostsLength }) => {

    const { user } = useContext(UserContext)

    const [formData, setFormData] = useState({
        title: '',
        author_id: '',
        resume: '',
        body: '',
        created_at: ""
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
        if (validateForm()) {
            const created_at = getCurrentDateInISOFormat()
            const data = {
                ...formData,
                created_at,
                author_id: user.id
            }

            postNewPost(data)
                .then(res => {
                    if (res.status === 201) {
                        Swal.fire({
                            icon: 'success',
                            title: `Publicacion creada con éxito!`,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            getPostsLength()
                            getPostsOfPage(1)
                            setNewPost(false)
                        })
                    }
                })
                .catch(error => console.log(error))
        }
    };

    const validateForm = () => {
        let errorForm = {};

        if (!formData.title) {
            errorForm.title = 'Debe ingresar un titulo!';
        }

        if (!formData.resume) {
            errorForm.resume = 'Debe ingresar un resumen de la publicacion!';
        }

        if (!formData.body) {
            errorForm.body = 'Ingrese el cuerpo de la publicacion!';
        }

        if (Object.keys(errorForm).length > 0) {
            setErrors(errorForm);
            return false
        } else {
            return true
        }
    }

    useEffect(() => {
        console.log(typeof errors);
        console.log(errors);
    }, [errors])

    return (

        <form className='w-100 d-flex flex-column align-items-center mb-4' onSubmit={handleSubmit}>
            <div className='my-2'>
                <FormControl>
                    <InputLabel >Titulo</InputLabel>
                    <Input name="title" onChange={handleChange} />
                    {errors.title && <p style={{ fontSize: "80%" }} className='text-danger'>{errors.title}</p>}
                </FormControl>
            </div>
            <div className='my-2 w-75'>
                <FormControl className='w-100'>
                    <Form.Control placeholder="Resumen" as="textarea" rows={1} onChange={handleChange} name="resume" />
                    {errors.resume && <p style={{ fontSize: "80%" }} className='text-danger'>{errors.resume}</p>}
                </FormControl>
            </div>
            <div className='my-2 w-75'>
                <FormControl className='w-100'>
                    <Form.Control placeholder="Cuerpo" as="textarea" rows={6} onChange={handleChange} name="body" />
                    {errors.body && <p style={{ fontSize: "80%" }} className='text-danger'>{errors.body}</p>}
                </FormControl>
            </div>
            <div className='mt-4 d-flex justify-content-center'>
                <Button color="error" className='me-2' onClick={() => setNewPost(false)} variant="contained">Cancelar</Button>
                <Button variant="contained" type="submit">Publicar</Button>
            </div>
        </form>

    );
};

export default NewPost;