import { FETCH_LIST_FINISH, FETCH_LIST_START } from '../actions/courseList'

const initialCourseListState = {
    courseList: [],
    isfetching: false
}

const courseListReducer = (state = initialCourseListState, action) => {
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

export default courseListReducer