import React, { useContext, useEffect, useState } from 'react';
import { deletePostLike, getCommentsById, getLikesById, getUser, postPostLike } from '../../helpers/apiHHelper';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import avatarIcon from "../../img/avatar.jpg"
import UserContext from '../../context/userContext/UserContext';
import Swal from 'sweetalert2';

const Post = ({ post }) => {

    const { user } = useContext(UserContext)

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

    const like = async () => {
        if (user) {
            const data = {
                user_id: user.id,
                post_id: post.id
            }
            const res = await postPostLike(data)
            if (res.status === 201) {
                setLikes([
                    ...likes,
                    res.data
                ])
            }
        }
    }

    const dislike = async () => {
        const item = likes.find(l => l.user_id === user.id)
        console.log(item);
        if (item) {
            const res = await deletePostLike(item.id)
            if (res.status === 200) {
                setLikes(likes.filter(l => l.id !== item.id))
            }
        }
    }

    const openPost = () => {

    }

    useEffect(() => {
        if (likes && likes.length) {
            console.log("////////");
            console.log(user);
            console.log(likes);
        }
    }, [user, likes])


    return (
        post && author && likes &&
        <div className='row my-1 mx-0 px-0 containerPost'>
            <div className='col-4 col-md-3 col-lg-2 d-flex justify-content-end'>
                <div className='postPhoto'>
                    <img className='w-100 h-auto' src={avatarIcon}></img>
                </div>
            </div>
            <div className='col-8 col-md-9 col-lg-10'>
                <p className='nameStyle mb-1'>{author.name}</p>
                <a href={`/postdetail/${post.id}`} title="Ver publicacion" className='titleStyle mb-0'>{post.title}</a>
                <p className='resumeStyle'>{post.resume}</p>
                <div className='d-flex'>
                    {/* <CommentIcon style={{ cursor: "pointer", color: "#85929E" }} /> */}
                    {likes.some(l => l.user_id === user.id) ?
                        <div className='d-flex align-items-center'>
                            <FavoriteIcon onClick={dislike} style={{ cursor: "pointer", color: "#CB4335", marginLeft: "10px" }} />
                            {likes.length > 1 ?
                                <p style={{ fontSize: "85%" }} className='my-0 ms-1 text-muted'>A tí y a {likes.length - 1} persona{likes.length > 2 && "s"} más les gusta esto.</p>
                                :
                                <p style={{ fontSize: "85%" }} className='my-0 ms-1 text-muted'>Te gusta esto.</p>
                            }
                        </div>
                        :
                        <div className='d-flex align-items-center'>
                            <FavoriteBorderIcon onClick={like} style={{ cursor: "pointer", color: "#CB4335", marginLeft: "10px" }} />
                            {likes.length > 0 &&
                                <p style={{ fontSize: "85%" }} className='my-0 ms-1 text-muted'>A {likes.length} persona{likes.length > 1 && "s"} les gusta esto.</p>
                            }
                        </div>

                    }
                </div>
            </div>
        </div>

    );
};

export default Post;