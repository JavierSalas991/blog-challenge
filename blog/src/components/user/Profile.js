import React, { useContext, useEffect, useState } from 'react';
import Error404 from '../Error404';
import { useParams } from 'react-router-dom';
import { getUser } from '../../helpers/apiHHelper';
import UserContext from '../../context/userContext/UserContext';
import ProfileData from './ProfileData';
import "./user.css"
import ProfilePosts from './ProfilePosts';

const Profile = () => {

    const { user } = useContext(UserContext)

    const params = useParams();
    const id = params.id || null

    const [actualUser, setActualUser] = useState(null)
    // const [posts, setPosts] = useState(null)

    const getMainData = id => {
        Promise.all([getUser(id)])
            .then(([user]) => {
                user && user.data && setActualUser(user.data)
            })
    }

    useEffect(() => {
        id && getMainData(id)
    }, [id])

    return (
        actualUser ?
            <div style={{ marginTop: "5rem" }}>
                <div className={(!user || actualUser.id !== user.id) ? "" : "containerProfile"}>
                    <ProfileData actualUser={actualUser}></ProfileData>
                </div>

                <ProfilePosts actualUser={actualUser}></ProfilePosts>
            </div>
            :
            <Error404></Error404>
    );
};

export default Profile;