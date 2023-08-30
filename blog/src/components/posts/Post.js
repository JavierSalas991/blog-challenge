import React, { useEffect, useState } from 'react';
import { getCommentsById, getLikesById, getUser } from '../../helpers/apiHHelper';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
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
        console.log('====================================');
        console.log(post);
        console.log('====================================');
        getCommentsAndLikes(post.id)
        getAuthor(post.author_id)
    }, [post])

    useEffect(() => {
        console.log(author);
    }, [author])


    return (
        post && author &&
        <div className='row my-1 containerPost'>
            <div className='col-4 col-md-3 col-lg-2 d-flex justify-content-end'>
                <div className='postPhoto'>
                    <img className='w-100 h-auto' src={avatarIcon}></img>
                </div>
            </div>
            <div className='col-8 col-md-9 col-lg-10'>
                <p className='nameStyle'>{author.name}</p>
                <p className='titleStyle mb-0'>{post.title}</p>
                <p className='resumeStyle'>{post.resume}</p>
                <div>
                    <CommentIcon style={{ cursor: "pointer", color: "#85929E" }} />
                    <FavoriteBorderIcon style={{ cursor: "pointer", color: "#CB4335", marginLeft: "10px" }} />
                </div>
            </div>
        </div>

    );
};

export default Post;