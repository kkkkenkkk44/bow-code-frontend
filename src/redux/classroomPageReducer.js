import {
    CLASSROOM_SWITCH_TO,
    FETCH_COURSEPLAN_START,
    FETCH_COURSEPLAN_FINISH,
    FETCH_CLASSROOM_START,
    FETCH_CLASSROOM_FINISH,
    FETCH_SINGLE_STUDENT_INFO,
    REACT_TO_BULLETIN,
    REACT_TO_REPLY,
    FETCH_BULLETIN,
    CREATE_QUIZ,
    CREATE_QUIZ_FAILED,
    CREATE_QUIZ_START,
    FETCH_SINGLE_APPLICANT_INFO,
    ACCEPT_APPLICATION,
    REPLY_BULLETIN,
    FETCH_SINGLE_BULLETIN,
    RESET_STUDENT_INFO
} from '../actions/classroomPage'
import { FETCH_LIST_START } from '../actions/courseList';

const initialState = {
    currentTab: "overview",
    isFetching: false,
    classroomID: "",
    applicants: [],
    apply: true,
    coursePlan: "",
    createTime: "",
    creator: "",
    invitees: [],
    name: "",
    review: true,
    students: [],
    studentInfos: {},
    applicantInfos: {},
    visibility: 0,
    courseList: [],
    bulletins: [],
    newBulletinTitle: "",
    newBulletinContent: "",
    homeworkList: [],
    quizList: [],
    creatingQuiz: "none",
    userIsCreator: false
}

const classroomPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLASSROOM_SWITCH_TO:
            return {
                ...state,
                currentTab: action.payload.tab
            }
        case REACT_TO_BULLETIN:
            return {
                ...state,
                bulletins: state.bulletins.map(bulletin => {
                    if (bulletin.id != action.payload.bulletinId) {
                        return bulletin
                    } else {
                        var reactions = bulletin.reactions
                        var idx = reactions.indexOf(action.payload.userId)
                        if (idx >= 0) {
                            reactions.splice(idx, 1)
                        } else {
                            reactions.push(action.payload.userId)
                        }
                        bulletin.reactions = reactions
                        return bulletin
                    }
                })
            }
        case REACT_TO_REPLY:
            return {
                ...state,
                bulletins: state.bulletins.map((bulletin) => {
                    if (bulletin.id != action.payload.bulletinId) {
                        return bulletin
                    } else {
                        var reactions = bulletin.replies[action.payload.replyId].reactions
                        var idx = reactions.indexOf(action.payload.userId)
                        if (idx >= 0) {
                            reactions.splice(idx, 1)
                        } else {
                            reactions.push(action.payload.userId)
                        }
                        bulletin.replies[action.payload.replyId].reactions = reactions
                        return bulletin
                    }
                })
            }
        case REPLY_BULLETIN:
            return {
                ...state
            }
        case FETCH_BULLETIN:
            return {
                ...state,
                bulletins: action.payload.bulletins
            }
        case FETCH_SINGLE_BULLETIN:
            return {
                ...state,
                bulletins: state.bulletins.map(bulletin => bulletin.id == action.payload.bulletinID ? action.payload.bulletin : bulletin)
            }
        case FETCH_CLASSROOM_START:
            return {
                ...state,
                isFetching: true,
            }
        case FETCH_CLASSROOM_FINISH:
            return {
                ...state,
                isFetching: false,
                classroomID: action.payload.id,
                applicants: action.payload.applicants,
                apply: action.payload.apply,
                coursePlan: action.payload.coursePlan,
                createTime: action.payload.createTime,
                creator: action.payload.creator,
                invitees: action.payload.invitees,
                name: action.payload.name,
                review: action.payload.review,
                students: action.payload.students,
                visibility: action.payload.visibility,
                bulletinList: action.payload.bulletinList,
                homeworkList: action.payload.homeworkList,
                quizList: action.payload.examList,
                userIsCreator: action.payload.isCreator
            }
        case RESET_STUDENT_INFO:
            return {
                ...state,
                studentInfos: {}
            }
        case FETCH_SINGLE_STUDENT_INFO:
            return {
                ...state,
                studentInfos: {
                    ...state.studentInfos,
                    [action.payload.id]: {
                        userInfo: action.payload.userInfo.userInfo,
                        scores: action.payload.scores
                    }
                }
            }
        case FETCH_SINGLE_APPLICANT_INFO:
            return {
                ...state,
                applicantInfos: {
                    ...state.applicantInfos,
                    [action.payload.id]: {
                        userInfo: action.payload.userInfo.userInfo
                    }
                }
            }
        case FETCH_COURSEPLAN_START:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_COURSEPLAN_FINISH:
            return {
                ...state,
                isFetching: false,
                courseList: action.payload.courseList
            }
        case ACCEPT_APPLICATION:
            return {
                ...state,
                students: state.students.concat([action.payload.id]),
                studentInfos: {
                    ...state.studentInfos,
                    [action.payload.id]: {
                        ...state.applicantInfos[action.payload.id]
                    }
                },
                applicants: state.applicants.filter(id => id != action.payload.id),
                applicantInfos: Object.keys(state.applicantInfos)
                    .filter(key => key != action.payload.id)
                    .reduce((obj, key) => {
                        obj[key] = state.applicantInfos[key];
                        return obj;
                    }, {})
            }
        case CREATE_QUIZ:
            return {
                ...state,
                isCreatingQuiz: 'none'
            }
        case CREATE_QUIZ_START:
            return {
                ...state,
                isCreatingQuiz: 'pending'
            }
        case CREATE_QUIZ_FAILED:
            return {
                ...state,
                isCreatingQuiz: 'failed'
            }
        default:
            return state;
    }
}

export default classroomPageReducer
