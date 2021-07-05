export const LOG_IN_START = 'LOG_IN_START'
export const LOGGED_IN = 'LOGGED_IN'
export const LOG_OUT = 'LOG_OUT'

export const loginStart = () => ({
    type: LOG_IN_START,
})

export const loggedIn = (user) => ({
    type: LOGGED_IN,
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
                console.log(data)
                dispatch(loggedIn(data))
            })
            .catch(e => console.log(e))
    }
}

export function auth() {
    return (dispatch) => {
        dispatch(loginStart())
        fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                console.log("auth finish")
                if (data.id == ""){ // no valid login
                    dispatch(logout())
                } else {
                    dispatch(loggedIn(data))
                }
            })
            .catch(dispatch(logout()))
    }
}