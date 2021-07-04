export const FETCH_LIST_START = 'FETCH_LIST';
export const FETCH_LIST_FINISH = 'FETCH_LIST_FINISH';

export const fetchCourseListRequest = () => ({
    type: FETCH_LIST_START
})

export const fetchCourseList = (new_list) => ({
    type: FETCH_LIST_FINISH,
    payload: {
        courseList: new_list
    },
});

export function fetchCourseListAsync() {
    return (dispatch) => {
        dispatch(fetchCourseListRequest())
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course`, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                let new_list = data
                dispatch(fetchCourseList(new_list))
            })
            .catch(e => {
                // error handling
                console.log(e)
            })
    };
}