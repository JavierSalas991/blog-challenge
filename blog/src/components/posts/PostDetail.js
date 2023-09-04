import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { deletePost, getPost, getUser } from '../../helpers/apiHHelper';
import Error404 from '../Error404';
import Loading from '../Loading';
import { spanishDate } from '../../helpers/helper';
import UserContext from '../../context/userContext/UserContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from '@mui/material';
import CreateOrEditPost from './CreateOrEditPost';
import GoBack from '../GoBack';
import Swal from 'sweetalert2';

const PostDetail = () => {

    const { user } = useContext(UserContext)

    const navigate = useNavigate()

    const params = useParams();
    const id = params.id || null

    const [postDetails, setPostDetails] = useState(null)
    const [error, setError] = useState(false)
    const [author, setAuthor] = useState(null)

    const [editing, setEditing] = useState(false)

    const getPostById = async id => {
        try {
            const res = await getPost(id)
            if (res.status === 200) {
                setPostDetails(res.data)
            }
        } catch (error) {
            setError(true)
        }
    }

    const getAuthor = async id => {
        getUser(id)
            .then(res => {
                res && res.data && setAuthor(res.data)
            })
            .catch(error => console.log(error))
    }

    const reload = () => {
        getPostById(id)
    }

    const showDeleteConfirmation = (onConfirm) => {
        Swal.fire({
            html: '¿Seguro que desea eliminar la publicación?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2c5884',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                onConfirm();
            }
        });
    };

    const showDeleteSuccess = () => {
        Swal.fire({
            icon: 'success',
            title: `Publicacion eliminada con éxito!`,
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navigate(-1)
        })
    }

    const deleteThePost = () => {
        showDeleteConfirmation(() => {
            deletePost(postDetails.id)
                .then((res) => {
                    if (res.status === 200){
                        showDeleteSuccess()
                    }
                })
                .catch((error) => showError(error.message));
        });
    };

    const showError = (message) => {
        Swal.fire({
            icon: 'error',
            html: message,
            showConfirmButton: false,
            timer: 1500
        })
    }

    useEffect(() => {
        id && getPostById(id)
    }, [id])

    useEffect(() => {
        postDetails && getAuthor(postDetails.author_id)
    }, [postDetails])

    return (
        <>
            {postDetails && author ?
                editing ?
                    <div className='d-flex justify-content-center' style={{ marginTop: "5rem" }}>
                        <CreateOrEditPost setEditing={setEditing} reload={reload} previousData={postDetails}></CreateOrEditPost>
                    </div>
                    :
                    <div className='d-flex justify-content-center' style={{ marginTop: "5rem" }}>
                        <div className='col-12 col-md-11 col-lg-10 row m-4'>
                            <div className='d-flex justify-content-between'>
                                <h2 className='postTitle'>{postDetails.title}</h2>
                                {user && postDetails.author_id === user.id ?
                                    editing ?
                                        <CancelIcon title="Cancelar" onClick={() => setEditing(false)} style={{ cursor: "pointer" }} className='me-1'></CancelIcon>
                                        :
                                        <div className='d-flex'>
                                            <EditIcon title="Editar" onClick={() => setEditing(true)} style={{ cursor: "pointer" }} className='me-1'></EditIcon>
                                            <DeleteIcon onClick={deleteThePost} title="Eliminar" style={{ cursor: "pointer" }} className='me-1'></DeleteIcon>
                                        </div>
                                    : null
                                }
                            </div>
                            <h4 className='postResume'>{postDetails.resume}</h4>
                            <hr></hr>
                            <p className='postBody'>{postDetails.body}</p>
                            <p
                                className='my-0 text-muted postAuthor'>
                                Publicado el dia {spanishDate(postDetails.created_at)} por
                                <span onClick={() => navigate("/profile/" + author.id)} style={{ cursor: "pointer" }} className='text-primary'> {author.name}</span>
                            </p>
                        </div>
                    </div>
                :
                error ?
                    <Error404 />
                    :
                    <div style={{ minHeight: "90vh" }} className='d-flex align-items-center justify-content-center' >
                        <Loading show={true} text="Cargando..." />
                    </div>
            }
            <GoBack></GoBack>
        </>
    );
};

export default PostDetail;