import { LOG_IN_START, LOGGED_IN, LOG_OUT, NEW_LOGIN } from "../actions/login";
const initialLoginState = {
    isLogin: false,
    isLoggingIn: false,
    newLogin: false,
    authFinish: false,
    user: {}
}

const loginReducer = (state = initialLoginState, action) => {
    switch (action.type) {
        case LOG_IN_START:
            return {
                ...state,
                isLoggingIn: true,
                authFinish: false,
            }
        case LOGGED_IN:
            return {
                ...state,
                isLoggingIn: false,
                isLogin: true,
                user: action.payload.user,
                authFinish: true
            }
        case NEW_LOGIN:
            return {
                ...state,
                isLoggingIn: false,
                isLogin: true,
                user: action.payload.user,
                newLogin: true,
                authFinish: true
            }
        case LOG_OUT:
            return {
                ...initialLoginState,
                authFinish: true
            }
        default:
            return state;
    }
}

export default loginReducer