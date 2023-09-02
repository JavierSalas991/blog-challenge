import React, { useContext, useEffect, useState } from 'react';
import { getNumberOfPosts, getPosts } from '../../helpers/apiHHelper';
import { Button, Pagination, Typography } from '@mui/material';
import Post from './Post';
import "./posts.css"
import DeblurIcon from '@mui/icons-material/Deblur';
import Title from '../Title';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NewPost from './NewPost';
import UserContext from '../../context/userContext/UserContext';

const Posts = () => {


    const { user } = useContext(UserContext)

    const [posts, setPosts] = useState(null)
    const [page, setPage] = useState(null);
    const [numberOfPosts, setnumberOfPosts] = useState(null)

    const [newPost, setNewPost] = useState(false)

    const getPostsLength = async () => {
        try {
            const res = await getNumberOfPosts()
            setnumberOfPosts(res);
            setPage(1)
        } catch (error) {
            console.log(error);
        }
    }

    const getPostsOfPage = async (page) => {
        try {
            const res = await getPosts(page)
            setPosts(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const changePage = (event, page) => {
        setPage(page);
    };

    useEffect(() => {
        getPostsLength()
    }, [])

    useEffect(() => {
        page && getPostsOfPage(page)
    }, [page])

    return (
        <div style={{ marginTop: "5rem" }}>

            <div className='w-100 row d-flex flex-column align-items-center'>
                <div className=' d-flex flex-column justify-content-center align-items-center'>
                    <Title />
                    {user ?
                        newPost ?
                            <NewPost getPostsLength={getPostsLength} getPostsOfPage={getPostsOfPage} setNewPost={setNewPost}></NewPost>
                            :
                            <Button onClick={() => setNewPost(true)}><AddCircleOutlineIcon></AddCircleOutlineIcon> nueva publicacion</Button>
                        : null
                    }
                    <div className=' d-flex justify-content-center'>
                        <Pagination onChange={changePage} className='mt-2' count={Math.ceil(numberOfPosts / 10)} color="primary" />
                    </div>
                    <div className=' d-flex flex-column align-items-center justify-content-center w-100'>
                        {posts && posts.map(post => <Post id={post.id} post={post} />)}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Posts;