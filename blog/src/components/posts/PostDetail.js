import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPost } from '../../helpers/apiHHelper';
import Error404 from '../Error404';
import Loading from '../Loading';

const PostDetail = () => {
    const params = useParams();
    const id = params.id || null

    const [postDetails, setPostDetails] = useState(null)
    const [error, setError] = useState(false)

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

    useEffect(() => {
        id && getPostById(id)
    }, [id])
    
    return (
        postDetails ?
            <p>SABE</p>
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