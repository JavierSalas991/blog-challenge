
import { USER, USER_POSTS } from "../../types/userTypes";

const userReducer = (state, action) => {
    switch (action.type) {
        case USER:
            return {
                ...state,
                user: action.payload,
            }
        case USER_POSTS:
            return {
                ...state,
                userPosts: action.payload,
            }
        default:
            return state;
    }

}

export default userReducer;