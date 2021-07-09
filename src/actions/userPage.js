export const SWITCH_TO = 'SWITCH_TO';
export const FETCH_OWN_COURSE_START = 'FETCH_OWN_COURSE_START';
export const FETCH_OWN_COURSE = 'FETCH_OWN_COURSE';

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


export function fetchOwnCourseAsync(ids) {
    var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/course/multiple`)
    ids.forEach(id => url.searchParams.append("courses", id))
    return (dispatch) => {
        dispatch(fetchOwnCourseStart())
        fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            dispatch(fetchOwnCourse(data))
        })
        .catch(e => {
            // error handling
            console.log(e)
        })
    }
}