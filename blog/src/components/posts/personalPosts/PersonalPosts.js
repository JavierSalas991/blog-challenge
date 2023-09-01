import React, { useEffect, useState } from 'react';
import Error404 from '../../Error404';
import { useParams } from 'react-router-dom';
import { getPostsById, getUser } from '../../../helpers/apiHHelper';
import avatarIcon from "../../../img/avatar2.png"

const PersonalPosts = () => {
    const params = useParams();
    const id = params.id || null

    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState(null)

    const getMainData = id => {
        Promise.all([getUser(id), getPostsById(id)])
            .then(([user, posts]) => {
                user && user.data && setUser(user.data)
                posts && posts.data && setPosts(posts.data)
            })
    }

    useEffect(() => {
        id && getMainData(id)
    }, [id])

    return (
        user && posts ?
            <div style={{ marginTop: "5rem" }}>
                <div style={{ width: "14vw" }}>
                    <div className='d-flex m-4'>
                        <img className='w-100 h-auto' src={avatarIcon}></img>
                    </div>
                </div>
            </div>
            :
            <Error404></Error404>
    );
};

export default PersonalPosts;