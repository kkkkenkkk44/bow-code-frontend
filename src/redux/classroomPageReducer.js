import {
    CLASSROOM_SWITCH_TO,
    FETCH_COURSEPLAN_START,
    FETCH_COURSEPLAN_FINISH,
    FETCH_CLASSROOM_START,
    FETCH_CLASSROOM_FINISH,
    FETCH_BULLETIN_START,
    FETCH_BULLETIN,
    REACT_TO_BULLETIN,
    REACT_TO_REPLY,
    NEW_BULLETIN_ONCHANGE
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
    visibility: 0,
    courseList: [],
    bulletinList: [],
    newBulletinTitle: "",
    newBulletinContent: "",
    homeworkList: [],
    quizList: []
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
                bulletinList: state.bulletinList.map(bulletin => {
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
                bulletinList: state.bulletinList.map((bulletin) => {
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
        case NEW_BULLETIN_ONCHANGE:
            if (action.payload.field == "title"){
                return {
                    ...state,
                    newBulletinTitle: action.payload.value,
                }
            } else if (action.payload.field == " content"){
                return {
                    ...state,
                    newBulletinContent: action. payload.value
                }
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
                quizList: action.payload.examList
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
        default:
            return state;
    }
}

export default classroomPageReducer
