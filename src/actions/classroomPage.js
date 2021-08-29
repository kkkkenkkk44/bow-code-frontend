export const FETCH_BULLETIN = 'FETCH_BULLETIN'
export const FETCH_BULLETIN_START = 'FETCH_BULLETIN_START'
export const CLASSROOM_SWITCH_TO = 'CLASSROOM_SWITCH_TO';
export const REACT_TO_REPLY = 'REACT_TO_REPLY'
export const REACT_TO_BULLETIN = 'REACT_TO_BULLETIN'
export const FETCH_COURSEPLAN_START = 'FETCH_COURSEPLAN_START'
export const FETCH_COURSEPLAN_FINISH = 'FETCH_COURSEPLAN_FINISH'
export const FETCH_CLASSROOM_START = 'FETCH_CLASSROOM_START'
export const FETCH_CLASSROOM_FINISH = 'FETCH_CLASSROOM_FINISH'
export const NEW_BULLETIN_ONCHANGE = 'NEW_BULLETIN_ONCHANGE'

export const switchTo = (tab) => ({
    type: CLASSROOM_SWITCH_TO,
    payload: {
        tab: tab
    }
})

export const newBulletinOnchange = (field, value) => ({
    type: NEW_BULLETIN_ONCHANGE,
    payload: {
        field: field,
        value: value
    }
})


export const reactToReply = (bulletinId, replyId, userId) => ({
    type: REACT_TO_REPLY,
    payload: {
        bulletinId: bulletinId,
        replyId: replyId,
        userId: userId
    }
})

export const reactToBulletin = (bulletinId, userId) => ({
    type: REACT_TO_BULLETIN,
    payload: {
        bulletinId: bulletinId,
        userId: userId
    }
})

export const fetchClassroomRequest = () => ({
    type: FETCH_CLASSROOM_START
})

export const fetchClassroom = (detail) => {
    const { applicants, apply, coursePlan, createTime, creator, id, invitees, name, review, students, visibility, bulletinList, homeworkList, examList } = detail
    return {
        type: FETCH_CLASSROOM_FINISH,
        payload: {
            applicants, apply, coursePlan, createTime, creator, id, invitees, name, review, students, visibility, bulletinList, homeworkList, examList
        }
    }
}

export function fetchClassroomAsync(classroomID) {
    var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/classroom/${classroomID}`)
    return (dispatch) => {
        dispatch(fetchClassroomRequest())
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                dispatch(fetchClassroom(data))
            })
            .catch(e => {
                // error handling
                console.log(e)
            })
    };
}

export const fetchCoursePlanRequest = () => ({
    type: FETCH_COURSEPLAN_START
})

export const fetchCoursePlan = (new_list) => {
    return {
        type: FETCH_COURSEPLAN_FINISH,
        payload: {
            courseList: new_list.courseList
        }
    }
}

export function fetchCoursePlanAsync(coursePlanID) {
    var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/course`)
    return (dispatch) => {
        dispatch(fetchCoursePlanRequest())
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch(fetchCoursePlan(data))
            })
            .catch(e => {
                // error handling
                console.log(e)
            })
    };
}