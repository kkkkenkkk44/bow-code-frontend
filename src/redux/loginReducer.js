import { LOG_IN_START, LOGGED_IN, LOG_OUT } from "../actions/login";
const initialLoginState = {
    isLogin: false,
    isLoggingIn: false,
    user: {}
}

const loginReducer = (state = initialLoginState, action) => {
    switch (action.type) {
        case LOG_IN_START:
            return {
                ...state,
                isLoggingIn: true
            }
        case LOGGED_IN:
            return {
                ...state,
                isLoggingIn: false,
                isLogin: true,
                user: action.payload.user
            }
        case LOG_OUT:
            return initialLoginState
        default:
            return state;
    }
}

export default loginReducer