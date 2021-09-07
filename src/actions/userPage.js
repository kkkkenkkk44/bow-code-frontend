export const SWITCH_TO = 'SWITCH_TO';
export const FETCH_OWN_COURSE_START = 'FETCH_OWN_COURSE_START';
export const FETCH_OWN_COURSE = 'FETCH_OWN_COURSE';
export const FETCH_FAV_COURSE_START = 'FETCH_FAV_COURSE_START';
export const FETCH_FAV_COURSE = 'FETCH_FAV_COURSE';
export const FETCH_SUBMISSION_START = 'FETCH_SUBMISSION_START';
export const FETCH_SUBMISSION = 'FETCH_SUBMISSION';
export const FETCH_CLASSROOM = 'FETCH_CLASSROOM'

export const switchTo = (tab) => ({
    type: SWITCH_TO,
    payload: {
        tab: tab
    }
})

export const fetchOwnCourseStart = () => ({
    type: FETCH_OWN_COURSE_START
})

export const fetchOwnCourse = (courses) => ({
    type: FETCH_OWN_COURSE,
    payload:{
        courses: courses
    }
})

export const fetchFavCourseStart = () => ({
    type: FETCH_FAV_COURSE_START
})

export const fetchFavCourse = (courses) => ({
    type: FETCH_FAV_COURSE,
    payload:{
        courses: courses
    }
})

export const fetchSubmissionStart = () => ({
    type: FETCH_SUBMISSION_START
})

export const fetchSubmission = (submissions) => ({
    type: FETCH_SUBMISSION,
    payload:{
        submissions: submissions
    }
})


export function fetchOwnCourseAsync(ids) {
    var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/course/multiple`)
    ids.forEach(id => url.searchParams.append("courses", id))
    return (dispatch) => {
        dispatch(fetchOwnCourseStart())
        fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            dispatch(fetchOwnCourse(data.courseList))
        })
        .catch(e => {
            // error handling
            console.log(e)
        })
    }
}

export function fetchFavCourseAsync(ids) {
    var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/course/multiple`)
    ids.forEach(id => url.searchParams.append("courses", id))
    return (dispatch) => {
        dispatch(fetchFavCourseStart())
        fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            dispatch(fetchFavCourse(data.courseList))
        })
        .catch(e => {
            // error handling
            console.log(e)
        })
    }
}

export function fetchSubmissionAsync() {
    var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/submit/user`)
    return (dispatch) => {
        dispatch(fetchSubmissionStart())
        fetch(url, { method: "GET", credentials: "include" })
        .then(res => res.json())
        .then(data => {
            dispatch(fetchSubmission(data))
        })
        .catch(e => {
            // error handling
            console.log(e)
        })
    }
}

export function fetchClassroomsAsync(ids, type) {
    return (dispatch) => {
        var reqs = ids.map(id => {
            var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/classroom/${id}`)
            return fetch(url, {method: "GET", credentials: 'include'})
        })
        Promise.all(reqs)
        .then(values => Promise.all(values.map(res => res.json())))
        .then(datas => {
            dispatch({
                type: FETCH_CLASSROOM,
                payload: {
                    classrooms: datas,
                    type: type
                }
            })
        })
    }
}