import React, { useEffect, useState } from 'react';
import { getCommentsById, getLikesById, getUser } from '../../helpers/apiHHelper';
import { Avatar } from '@mui/material';
import avatarIcon from "../../img/avatar.jpg"

const Post = ({ post }) => {

    const [author, setAuthor] = useState(null)
    const [comments, setComments] = useState(null)
    const [likes, setLikes] = useState(null)

    const getCommentsAndLikes = async id => {
        const [resComments, resLikes] = await Promise.all([
            getCommentsById(id),
            getLikesById(id)
        ]);

        resComments.data && setComments(resComments.data)
        resLikes.data && setLikes(resLikes.data)
    }

    const getAuthor = async id => {
        const res = await getUser(id)
        res.data && setAuthor(res.data)
    }

    useEffect(() => {
        getCommentsAndLikes(post.id)
        getAuthor(post.author_id)
    }, [post])


    return (
        <div className='bg-info w-50'>
            <img alt="Remy Sharp" src={avatarIcon} />
        </div>
    );
};

export default Post;