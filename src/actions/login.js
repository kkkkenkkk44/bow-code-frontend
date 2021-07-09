export const LOG_IN_START = 'LOG_IN_START'
export const LOGGED_IN = 'LOGGED_IN'
export const LOG_OUT = 'LOG_OUT'
export const NEW_LOGIN = 'NEW_LOGIN'

export const loginStart = () => ({
    type: LOG_IN_START,
})

export const loggedIn = (user) => ({
    type: LOGGED_IN,
    payload: {
        user: user
    }
})

export const newLogin = (user) => ({
    type: NEW_LOGIN,
    payload: {
        user: user
    }
})

export const logout = () => ({
    type: LOG_OUT
})

export function loginAsync(payload) {
    return (dispatch) => {
        dispatch(loginStart())
        fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            body: JSON.stringify(payload),
            method: "POST",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.id == "") {
                    dispatch(registerAsync(payload))
                } else {
                    dispatch(loggedIn(data))
                }
            })
            .catch(e => console.log(e))
    }
}

export function registerAsync(payload) {
    return (dispatch) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
            body: JSON.stringify(payload),
            method: "POST",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                dispatch(newLogin(data))
            })
            .catch(e => console.log(e))
    }
}

export function auth() {
    return (dispatch) => {
        console.log("auth start")
        dispatch(loginStart())
        fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.id == ""){ // no valid login
                    dispatch(logout())
                } else {
                    dispatch(loggedIn(data))
                }
            })
            .catch(dispatch(logout()))
    }
}