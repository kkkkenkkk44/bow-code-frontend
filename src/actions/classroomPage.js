export const FETCH_BULLETIN = 'FETCH_BULLETIN'
export const FETCH_SINGLE_BULLETIN = 'FETCH_SINGLE_BULLETIN'
export const FETCH_BULLETIN_START = 'FETCH_BULLETIN_START'
export const CLASSROOM_SWITCH_TO = 'CLASSROOM_SWITCH_TO';
export const REACT_TO_REPLY = 'REACT_TO_REPLY'
export const REACT_TO_BULLETIN = 'REACT_TO_BULLETIN'
export const REPLY_BULLETIN = 'REPLY_BULLETIN'
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
export const RESET_STUDENT_INFO = "RESET_STUDENT_INFO"

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


export const reactToReply = (bulletinId, replyId, userId) => {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/bulletin/reply/like/${bulletinId}/${replyId}`
        fetch(url, { method: "POST", credentials: "include" })
            .then(() => dispatch({
                type: REACT_TO_REPLY,
                payload: {
                    bulletinId: bulletinId,
                    replyId: replyId,
                    userId: userId
                }
            }))
    }
}

export const reactToBulletin = (bulletinId, userId) => {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/bulletin/like/${bulletinId}`
        fetch(url, { method: "POST", credentials: "include" })
            .then(() => dispatch({
                type: REACT_TO_BULLETIN,
                payload: {
                    bulletinId: bulletinId,
                    userId: userId
                }
            }))
    }
}

export const fetchClassroomRequest = () => ({
    type: FETCH_CLASSROOM_START
})

export const fetchClassroom = (detail, isCreator) => {
    const { applicants, apply, coursePlan, createTime, creator, id, invitees, name, review, students, visibility, bulletinList, homeworkList, examList } = detail
    return {
        type: FETCH_CLASSROOM_FINISH,
        payload: {
            applicants, apply, coursePlan, createTime, creator, id, invitees, name, review, students, visibility, bulletinList, homeworkList, examList, isCreator
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
                dispatch(fetchClassroom(data, obj.isCreator))
                dispatch(fetchBulletins(classroomID))
                if (obj.isCreator) {
                    dispatch(fetchStudentInfoAsync(data.students, classroomID))
                    dispatch(fetchApplicantInfoAsync(data.applicants))
                }
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
    var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/course_plan/multiple?courseplans=${coursePlanID}`)
    return (dispatch) => {
        dispatch(fetchCoursePlanRequest())
        fetch(url, { method: "GET" })
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(data => {
                var courses = data.coursePlanList[0].componentList.filter((component => { return component.type === 0 })).map(component => component.setList[0].id)
                url = new URL(`${process.env.REACT_APP_BACKEND_URL}/course/details?courses=${courses.join()}`)
                fetch(url, { method: "GET" })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        dispatch(fetchCoursePlan(data))
                    })
            })
            .catch(e => {
                // error handling
                console.log(e)
            })
    };
}

export function resetStudentInfo() {
    return {
        type: RESET_STUDENT_INFO
    }
}

export function fetchStudentInfoAsync(studentIds, classroomId) {
    return (dispatch, getState) => {
        const userId = getState().loginReducer.user.id
        studentIds.map(id => {
            dispatch(fetchSingleStudentInfo(id, classroomId))
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

export function fetchSingleStudentInfo(id, classroomId) {
    return (dispatch) => {
        var getInfoUrl = new URL(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`)
        var getScoreUrl = new URL(`${process.env.REACT_APP_BACKEND_URL}/classroom/score/student/${classroomId}/${id}`)
        var p1 = fetch(getInfoUrl, { method: "GET" }).then(res => res.json())
        var p2 = fetch(getScoreUrl, { method: "GET", credentials: "include" }).then(res => res.json())
        Promise.all([p1, p2]).then(values => {
            dispatch({
                type: FETCH_SINGLE_STUDENT_INFO,
                payload: {
                    id: id,
                    userInfo: values[0],
                    scores: values[1]
                }
            })
        })
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
        fetch(url, { method: "POST", credentials: 'include' }).then(
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
                id: problem.id,
                totalScore: 100
            }))
        }
    }
    const url = quizType == 'quiz' ? `${process.env.REACT_APP_BACKEND_URL}/classroom/exam/${classroomID}` : `${process.env.REACT_APP_BACKEND_URL}/classroom/homework/${classroomID}`
    return (dispatch) => {
        dispatch(createQuizStart())
        fetch(url, { method: "POST", credentials: "include", body: JSON.stringify(body) })
            .then(() => { dispatch(createQuizSuccessfully()); dispatch(resetStudentInfo()); dispatch(fetchClassroomAsync(classroomID)) })
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

export function changeQuizName(quizType, quiz, newName, classroomID, index){
    quiz.component.name = newName
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

export function removeProblemFromQuiz(quizType, quiz, classroomID, index, i) {
    quiz.component.setList.splice(i, 1)
    const url = quizType == 'quiz' ? `${process.env.REACT_APP_BACKEND_URL}/classroom/exam/${classroomID}/${index}` : `${process.env.REACT_APP_BACKEND_URL}/classroom/homework/${classroomID}/${index}`
    return (dispatch) => {
        fetch(url, { method: "PUT", credentials: "include", body: JSON.stringify(quiz) })
            .then(() => dispatch(fetchClassroomAsync(classroomID)))
    }
}

export function fetchBulletins(classroomID) {
    return (dispatch) => {
        dispatch({
            type: FETCH_BULLETIN_START
        })
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

export function fetchSingleBulletin(bulletinID, classroomID) {
    return (dispatch) => {
        var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/classroom/bulletin/${classroomID}`)
        fetch(url, { method: "GET", credentials: "include" }).then(res => res.json())
            .then(data => {
                dispatch({
                    type: FETCH_SINGLE_BULLETIN,
                    payload: {
                        bulletin: data.find(bulletin => bulletin.id == bulletinID),
                        bulletinID: bulletinID
                    }
                })
            })
    }
}

export function postBulletin(title, content, classroomID) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/bulletin/${classroomID}`
        fetch(url, { method: "POST", credentials: "include", body: JSON.stringify({ content: content, title: title }) })
            .then(_ => {
                dispatch(fetchClassroomAsync(classroomID))
            })
    }
}

export function replyToBulletin(content, bulletinId, classroomID) {
    return (dispatch) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/bulletin/reply/${bulletinId}`
        fetch(url, { method: "POST", credentials: "include", body: JSON.stringify({ content: content }) })
            .then(_ => {
                dispatch(fetchSingleBulletin(bulletinId, classroomID))
            })
    }
}