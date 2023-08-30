import { USER } from "../../types/userTypes";

const userReducer = (state, action) => {
    switch (action.type) {
        case USER:
            return {
                ...state,
                user: action.payload,
            }
        default:
            return state;
    }

}

export default userReducer;