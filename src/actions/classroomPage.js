export const CLASSROOM_SWITCH_TO = 'CLASSROOM_SWITCH_TO';
export const FETCH_CLASSROOM_COURSELIST_START = 'FETCH_CLASSROOM_COURSELIST_START'
export const FETCH_CLASSROOM_COURSELIST_FINISH = 'FETCH_CLASSROOM_COURSELIST_FINISH'

export const switchTo = (tab) => ({
    type: CLASSROOM_SWITCH_TO,
    payload: {
        tab: tab
    }
})

export const fetchClassroomCourseListRequest = () => ({
    type: FETCH_CLASSROOM_COURSELIST_START
})

export const fetchClassroomCourseList = (new_list) => {
    return {
        type: FETCH_CLASSROOM_COURSELIST_FINISH,
        payload: {
            courseList: new_list.courseList
        }
    }
}

export function fetchClassroomCourseListAsync(filter = {}) {
    var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/course`)
    Object.keys(filter).forEach(key => {
        if (key == 'keyword') {
            filter.keyword.forEach(w => url.searchParams.append("keyword", w))
        } else {
            url.searchParams.append(key, filter[key])
        }
    })
    return (dispatch) => {
        dispatch(fetchClassroomCourseListRequest())
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                let new_list = data
                dispatch(fetchClassroomCourseList(new_list))
            })
            .catch(e => {
                // error handling
                console.log(e)
            })
    };
}