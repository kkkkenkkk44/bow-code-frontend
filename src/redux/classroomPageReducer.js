import { CLASSROOM_SWITCH_TO, FETCH_COURSEPLAN_START, FETCH_COURSEPLAN_FINISH, FETCH_CLASSROOM_START, FETCH_CLASSROOM_FINISH } from '../actions/classroomPage'
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

    courseList: []
}

const classroomPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLASSROOM_SWITCH_TO:
            return {
                ...state,
                currentTab: action.payload.tab
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