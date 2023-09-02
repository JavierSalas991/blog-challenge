import React, { useContext, useEffect, useState } from 'react';
import { deletePostLike, getLikesById, getUser, postPostLike } from '../../helpers/apiHHelper';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import avatarIcon from "../../img/avatar.jpg"
import UserContext from '../../context/userContext/UserContext';
import { textSince } from '../../helpers/helper';
import { useNavigate } from 'react-router-dom';

const UserPost = ({ post }) => {

    const navigate = useNavigate()

    const { user } = useContext(UserContext)

    // const [author, setAuthor] = useState(null)
    const [likes, setLikes] = useState(null)

    const getMainData = ({ id }) => {
        Promise.all([getLikesById(id)])
            .then(([likes]) => {
                // user && user.data && setAuthor(user.data)
                likes && likes.data && setLikes(likes.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

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

    const dislike = () => {
        const item = likes.find(({ user_id }) => user_id === user.id)
        item && deletePostLike(item.id)
            .then(res => {
                res.status === 200 && setLikes(likes.filter(({ id }) => id !== item.id))
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getMainData(post)
    }, [post])

    return (
        post && likes &&
        <div className='row my-1 mx-0 px-0 containerPost'>
            {/* <div className='col-4 col-md-3 col-lg-2 d-flex justify-content-end'>
                <div className='postPhoto'>
                    <img className='w-100 h-auto' src={avatarIcon}></img>
                </div>
            </div> */}
            <div className='col-8 col-md-9 col-lg-10'>
                <p onClick={() => navigate(`/postdetail/${post.id}`)} title="Ver publicacion" className='titleStyle mb-0'>{post.title}</p>
                <p className='resumeStyle'>{post.resume}</p>
                <div className='d-flex flex-column'>
                    {user && likes.some(({ user_id }) => user_id === user.id) ?
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
                    <p style={{ fontSize: "85%", marginLeft: "2.3rem" }} className='my-0 text-muted'>{textSince(post.created_at)}</p>
                </div>
            </div>
        </div>

    );
};

export default UserPost;