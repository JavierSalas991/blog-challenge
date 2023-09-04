import React, { useReducer } from 'react';
import userReducer from './userReducer';
import { USER, USER_POSTS } from '../../types/userTypes';
import UserContext from './UserContext';
import { deleteCookie, setCookie } from '../../helpers/helper';
import { getNumberOfPostsById } from '../../helpers/apiHHelper';

const UserState = (props) => {

    const initialState = {
        user: null,
        userPosts: 0
    }

    const [state, dispatch] = useReducer(userReducer, initialState)

    const setUserWithCookie = user => {
        if (user){
            setCookie("user", JSON.stringify(user), 0.5)
        } else {
            deleteCookie("user")
        }
        dispatch({
            type: USER,
            payload: user
        })
    }

    const setUser = user => {
        dispatch({
            type: USER,
            payload: user
        })
    }

    const reloadUserPosts = (id) => {
        if (id)  {
            getNumberOfPostsById(id)
            .then(res => {
                dispatch({
                    type: USER_POSTS,
                    payload: res
                })
            })
            .catch(error => console.log(error))

        } else {
            dispatch({
                type: USER_POSTS,
                payload: 0
            })
        }
    }

    return (
        <UserContext.Provider
            value={{
                user: state.user,
                setUser,
                setUserWithCookie,

                userPosts: state.userPosts,
                reloadUserPosts: reloadUserPosts,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;