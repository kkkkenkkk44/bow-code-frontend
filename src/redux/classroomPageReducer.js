import {
    CLASSROOM_SWITCH_TO,
    FETCH_COURSEPLAN_START,
    FETCH_COURSEPLAN_FINISH,
    FETCH_CLASSROOM_START,
    FETCH_CLASSROOM_FINISH,
    FETCH_BULLETIN_START,
    FETCH_BULLETIN,
    REACT_TO_BULLETIN,
    REACT_TO_REPLY
} from '../actions/classroomPage'
import { FETCH_LIST_START } from '../actions/courseList';

const initialState = {
    currentTab: "overview",
    bulletins: [],
    fetchingBulletin: false,
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

    courseList: []
}

const classroomPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLASSROOM_SWITCH_TO:
            return {
                ...state,
                currentTab: action.payload.tab
            }
        case FETCH_BULLETIN_START: {
            return {
                ...state,
                fetchingBulletin: true
            }
        }
        case FETCH_BULLETIN:
            return {
                ...state,
                bulletins: action.payload.bulletinList,
                fetchingBulletin: false
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
                bulletins: state.bulletins.map(bulletin => {
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
        case FETCH_COURSEPLAN_START:
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
