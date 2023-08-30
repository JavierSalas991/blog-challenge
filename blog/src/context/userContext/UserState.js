import React, { useReducer } from 'react';
import userReducer from './userReducer';
import { USER } from '../../types/userTypes';
import UserContext from './UserContext';

const UserState = (props) => {

    const initialState = {
        user: {
            "id": 2,
            "name": "Pedro Gomez",
            "email": "email2@ejemplo.com",
            "password": "ejemplo222"
        }
    }

    const [state, dispatch] = useReducer(userReducer, initialState)

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
                setUser
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;