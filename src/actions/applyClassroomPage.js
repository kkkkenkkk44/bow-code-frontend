export const APPLY_CLASSROOM_FETCH_CLASSROOM_START = 'APPLY_CLASSROOM_FETCH_CLASSROOM_START'
export const APPLY_CLASSROOM_FETCH_CLASSROOM_END = 'APPLY_CLASSROOM_FETCH_CLASSROOM_END'
export const APPLY_CLASSROOM = 'APPLY_CLASSROOM'

export const fetchClassroomStart = () => ({
    type: APPLY_CLASSROOM_FETCH_CLASSROOM_START
})

export const fetchClassroomEnd = (detail) => ({
    type: APPLY_CLASSROOM_FETCH_CLASSROOM_END,
    payload: detail
})

export const fetchClassroom = (classroomID) => {
    var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/classroom/${classroomID}`)
    return (dispatch) => {
        dispatch(fetchClassroomStart())
        fetch(url, { method: "GET", credentials: "include" })
            .then(res => res.json())
            .then(res =>
                dispatch(fetchClassroomEnd(res.classroom))
            )
            .catch(e => {
                // error handling
                console.log(e)
            })
    };
}

export const applyClassroom = (classroomID) => {
    var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/classroom/apply/${classroomID}`)
    fetch(url, { method: "POST", credentials: "include" })
    .catch(e => console.log(e))
}