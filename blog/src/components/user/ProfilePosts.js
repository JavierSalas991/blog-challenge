import React, { useState, useEffect, useContext } from 'react';
import { getPostsById, getNumberOfPostsById } from '../../helpers/apiHHelper';
import Post from '../posts/Post';
import { Pagination } from '@mui/material';
import UserPosts from './UserPost';
import UserPost from './UserPost';
import UserContext from '../../context/userContext/UserContext';

const ProfilePosts = ({ actualUser }) => {

    const { user } = useContext(UserContext)

    const [posts, setPosts] = useState(null)
    const [page, setPage] = useState(null);
    const [numberOfPosts, setnumberOfPosts] = useState(null)

    const getPostsLength = async (id) => {
        try {
            const res = await getNumberOfPostsById(id)
            setnumberOfPosts(res);
            setPage(1)
        } catch (error) {
            console.log(error);
        }
    }

    const getPostsOfPage = async (page) => {
        try {
            const res = await getPostsById({ page, id: actualUser.id })
            setPosts(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const changePage = (event, page) => {
        setPage(page);
    };

    useEffect(() => {
        getPostsLength(actualUser.id)
    }, [actualUser])

    useEffect(() => {
        page && getPostsOfPage(page)
    }, [page])
    return (

        <div className='w-100 row d-flex flex-column align-items-center'>
            <div className=' d-flex flex-column justify-content-center align-items-center'>
                {posts ?
                    posts.length > 0 ?
                        <>
                            <h4>{user && user.id === actualUser.id ? "Mis publicaciones" : `Publicaciones de ${actualUser.name.split(" ")[0]}`}</h4>
                            <div className=' d-flex justify-content-center'>
                                <Pagination onChange={changePage} className='mt-2' count={Math.ceil(numberOfPosts / 10)} color="primary" />
                            </div>
                        </>
                        :
                        <p className='text-muted'>Aún no tiene{user && user.id === actualUser.id ? "s" : ""} publicaciones...</p>
                    : null
                }
                <div className=' d-flex flex-column align-items-center justify-content-center w-100'>
                    {posts && posts.map(post => <UserPost id={post.id} post={post} />)}
                </div>
            </div>
        </div>
    );
};

export default ProfilePosts;