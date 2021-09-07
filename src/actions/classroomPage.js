export const FETCH_BULLETIN = 'FETCH_BULLETIN'
export const FETCH_BULLETIN_START = 'FETCH_BULLETIN_START'
export const CLASSROOM_SWITCH_TO = 'CLASSROOM_SWITCH_TO';
export const REACT_TO_REPLY = 'REACT_TO_REPLY'
export const REACT_TO_BULLETIN = 'REACT_TO_BULLETIN'
export const FETCH_COURSEPLAN_START = 'FETCH_COURSEPLAN_START'
export const FETCH_COURSEPLAN_FINISH = 'FETCH_COURSEPLAN_FINISH'
export const FETCH_CLASSROOM_START = 'FETCH_CLASSROOM_START'
export const FETCH_CLASSROOM_FINISH = 'FETCH_CLASSROOM_FINISH'
export const FETCH_SINGLE_STUDENT_INFO = 'FETCH_SINGLE_STUDENT_INFO'
export const FETCH_SINGLE_APPLICANT_INFO = 'FETCH_SINGLE_APPLICANT_INFO'
export const NEW_BULLETIN_ONCHANGE = 'NEW_BULLETIN_ONCHANGE'
export const CREATE_QUIZ = 'CREATE_QUIZ'
export const CREATE_QUIZ_START = 'CREATE_QUIZ_START'
export const CREATE_QUIZ_FAILED = "CREATE_QUIZ_FAILED"
export const ACCEPT_APPLICATION = "ACCEPT_APPLICATION"

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
        fetch(url, { method: "GET", credentials: "include" })
            .then(res => res.json())
            .then(obj => {
                const data = obj.classroom
                dispatch(fetchClassroom(data))
                dispatch(fetchBulletins(classroomID))
                dispatch(fetchStudentInfoAsync(data.students, classroomID))
                dispatch(fetchApplicantInfoAsync(data.applicants))
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

export function fetchStudentInfoAsync(studentIds, classroomId) {
    return (dispatch) => {
        studentIds.map(id => {
            var getInfoUrl = new URL(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`)
            var getScoreUrl = new URL(`${process.env.REACT_APP_BACKEND_URL}/classroom/${classroomId}/${id}`)
            var p1 = fetch(getInfoUrl, { method: "GET" }).then(res => res.json())
            var p2 = {} //fetch(getScoreUrl, { method: "GET", credentials: "include" })
            Promise.all([p1, p2]).then(values => {
                dispatch(fetchSingleStudentInfo(id, values[0], values[1]))
            })
        })
    }
}

export function fetchApplicantInfoAsync(ids) {
    return (dispatch) => {
        ids.map(id => {
            var getInfoUrl = new URL(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`)
            fetch(getInfoUrl, { method: "GET" })
                .then(res => res.json())
                .then(value => {
                    dispatch(fetchSingleApplicantInfo(id, value))
                })
        })
    }
}

export function fetchSingleStudentInfo(id, userInfo, scores) {
    return {
        type: FETCH_SINGLE_STUDENT_INFO,
        payload: {
            id: id,
            userInfo: userInfo,
            scores: scores
        }
    }
}

export function fetchSingleApplicantInfo(id, userInfo) {
    return {
        type: FETCH_SINGLE_APPLICANT_INFO,
        payload: {
            id: id,
            userInfo: userInfo
        }
    }
}

export function acceptApplication(id, classroomID) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/classroom/accept/${classroomID}/${id}`
        fetch(url, {method: "POST", credentials: 'include'}).then(
            dispatch({
                type: ACCEPT_APPLICATION,
                payload: {
                    id: id
                }
            })
        )
        
    }
}

export function createQuizStart() {
    return {
        type: CREATE_QUIZ_START
    }
}

export function createQuizSuccessfully() {
    return {
        type: CREATE_QUIZ
    }
}

export function createQuizFailed() {
    return {
        type: CREATE_QUIZ_FAILED
    }
}

export function createQuizAsync(quizType, title, deadline, problemList, classroomID) {
    var body = {
        private: true,
        begin: 0,
        end: deadline.getTime(),
        component: {
            name: title,
            type: 1,
            setList: problemList.map(problem => ({
                name: problem.name,
                id: problem.id
            }))
        }
    }
    const url = quizType == 'quiz' ? `${process.env.REACT_APP_BACKEND_URL}/classroom/exam/${classroomID}` : `${process.env.REACT_APP_BACKEND_URL}/classroom/homework/${classroomID}`
    return (dispatch) => {
        dispatch(createQuizStart())
        fetch(url, { method: "POST", credentials: "include", body: JSON.stringify(body) })
            .then(() => dispatch(createQuizSuccessfully()) && dispatch(fetchClassroomAsync(classroomID)))
            .catch(() => dispatch(createQuizFailed()))
    }
}

export function publishQuiz(quizType, quiz, classroomID, index) {
    quiz.private = !quiz.private
    const url = quizType == 'quiz' ? `${process.env.REACT_APP_BACKEND_URL}/classroom/exam/${classroomID}/${index}` : `${process.env.REACT_APP_BACKEND_URL}/classroom/homework/${classroomID}/${index}`
    return (dispatch) => {
        fetch(url, { method: "PUT", credentials: "include", body: JSON.stringify(quiz) })
            .then(() => dispatch(fetchClassroomAsync(classroomID)))
    }
}

export function changeDeadlineOfQuiz(quizType, quiz, newDeadline, classroomID, index) {
    quiz.end = newDeadline.getTime()
    const url = quizType == 'quiz' ? `${process.env.REACT_APP_BACKEND_URL}/classroom/exam/${classroomID}/${index}` : `${process.env.REACT_APP_BACKEND_URL}/classroom/homework/${classroomID}/${index}`
    return (dispatch) => {
        fetch(url, { method: "PUT", credentials: "include", body: JSON.stringify(quiz) })
            .then(() => dispatch(fetchClassroomAsync(classroomID)))
    }
}

export function addProblemsToQuiz(quizType, quiz, problems, classroomID, index) {
    var newProblems = problems.map(problem => ({
        name: problem.name,
        id: problem.id
    }))
    quiz.component.setList = quiz.component.setList.concat(newProblems)
    const url = quizType == 'quiz' ? `${process.env.REACT_APP_BACKEND_URL}/classroom/exam/${classroomID}/${index}` : `${process.env.REACT_APP_BACKEND_URL}/classroom/homework/${classroomID}/${index}`
    return (dispatch) => {
        fetch(url, { method: "PUT", credentials: "include", body: JSON.stringify(quiz) })
            .then(() => dispatch(fetchClassroomAsync(classroomID)))
    }
}

export function fetchBulletins(classroomID) {
    return (dispatch) => {
        var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/classroom/bulletin/${classroomID}`)
        fetch(url, { method: "GET", credentials: "include" }).then(res => res.json())
        .then(data => {
            dispatch({
                type: FETCH_BULLETIN,
                payload: {
                    bulletins: data
                }
            })
        })
    }
}

export function postBulletin(title, content, classroomID) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/bulletin/${classroomID}`
        fetch(url, {method: "POST", credentials: "include", body: JSON.stringify({content: content, title: title})})
        .then(_ => {
            dispatch(fetchClassroomAsync(classroomID))
        })
    }
}