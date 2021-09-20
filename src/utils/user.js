export const asyncGetUserInfo = (id) => {
    const url = new URL(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`)
    return fetch(url, {method: "GET", credentials: "include"})
}