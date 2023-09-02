import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getPost, getUser } from '../../helpers/apiHHelper';
import Error404 from '../Error404';
import Loading from '../Loading';
import { spanishDate } from '../../helpers/helper';

const PostDetail = () => {

    const navigate = useNavigate()

    const params = useParams();
    const id = params.id || null

    const [postDetails, setPostDetails] = useState(null)
    const [error, setError] = useState(false)
    const [author, setAuthor] = useState(null)

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

    useEffect(() => {
        id && getPostById(id)
    }, [id])

    useEffect(() => {
        postDetails && getAuthor(postDetails.author_id)
    }, [postDetails])

    return (
        postDetails && author ?
            <div style={{ marginTop: "5rem" }}>
                <div className='row'>
                    <div className='col-8 m-4'>
                        <h2 className='postTitle'>{postDetails.title}</h2>
                        <h4 className='postResume'>{postDetails.resume}</h4>
                        <hr></hr>
                        <p>{postDetails.body}</p>
                        <p
                            style={{ fontSize: "85%", marginLeft: "" }}
                            className='my-0 text-muted'>
                            Publicado el dia {spanishDate(postDetails.created_at)} por 
                            <span onClick={() => navigate("/profile/"+author.id)} style={{cursor: "pointer"}} className='text-primary'> {author.name}</span>
                        </p>
                    </div>
                    <div className='col-4'>

                    </div>
                </div>
            </div>
            :
            error ?
                <Error404 />
                :
                <div style={{ minHeight: "90vh" }} className='d-flex align-items-center justify-content-center' >
                    <Loading show={true} text="Cargando..." />
                </div>
    );
};

export default PostDetail;