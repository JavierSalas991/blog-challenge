import React, { useEffect, useState } from 'react';
import { getNumberOfPosts, getPosts } from '../../helpers/apiHHelper';
import { Pagination } from '@mui/material';
import Post from './Post';
import "./posts.css"

const Posts = () => {

    const [posts, setPosts] = useState(null)
    const [page, setPage] = useState(null);
    const [numberOfPosts, setnumberOfPosts] = useState(null)

    const getNumberOfPosts_ = async () => {
        const res = await getNumberOfPosts()
        setnumberOfPosts(res);
        setPage(1)
    }

    const getPostsOfPage = async (page) => {
        const res = await getPosts(page)
        setPosts(res.data);
    }

    const changePage = (event, page) => {
        setPage(page);
    };

    useEffect(() => {
        getNumberOfPosts_()
    }, [])

    useEffect(() => {
        page && getPostsOfPage(page)
    }, [page])



    return (
        <div className='w-100 row d-flex flex-column align-items-center'>
            <div className=' d-flex flex-column justify-content-center align-items-center'>
                <div className=' d-flex justify-content-center'>
                    <Pagination onChange={changePage} className='mt-2' count={Math.ceil(numberOfPosts / 10)} color="primary" />
                </div>
                <div className=' d-flex flex-column align-items-center justify-content-center w-100'>
                    {posts && posts.map(post => <Post id={post.id} post={post} />)}
                </div>
            </div>
        </div>
    );
};

export default Posts;