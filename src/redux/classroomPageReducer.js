import { CLASSROOM_SWITCH_TO, FETCH_CLASSROOM_COURSELIST_START, FETCH_CLASSROOM_COURSELIST_FINISH } from '../actions/classroomPage'
import { FETCH_LIST_START } from '../actions/courseList';

const initialState = {
    currentTab: "overview",
    classroomID: "0",
    isFetching: false,
    courseList: []
}

const classroomPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLASSROOM_SWITCH_TO:
            return {
                ...state,
                currentTab: action.payload.tab
            }
        case FETCH_CLASSROOM_COURSELIST_START:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_CLASSROOM_COURSELIST_FINISH:
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