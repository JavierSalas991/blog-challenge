import React, { useReducer } from 'react';
import userReducer from './userReducer';
import { USER } from '../../types/userTypes';
import UserContext from './UserContext';
import { deleteCookie, setCookie } from '../../helpers/helper';

const UserState = (props) => {

    const initialState = {
        user: null
        // user: {
        //     "id": 7,
        //     "name": "Ignacio Salas",
        //     "email": "ignaciosalas@ejemplo.com",
        //     "password": "ejemplo777"
        //   }
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

    return (
        <UserContext.Provider
            value={{
                user: state.user,
                setUser,
                setUserWithCookie
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;