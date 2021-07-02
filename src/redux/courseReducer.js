import { FETCH_LIST_FINISH, FETCH_LIST_START } from '../actions/courseList'

const initialCourseState = {
    courseList: [],
    isfetching: false
}

const courseReducer = (state = initialCourseState, action) => {
    switch (action.type) {
        case FETCH_LIST_FINISH:
            return {
                ...state,
                courseList: action.payload.courseList,
                isfetching: false
            }
        case FETCH_LIST_START:
            return {
                ...state,
                isfetching: true
            }
        default:
            return state;
    }
}

export default courseReducer