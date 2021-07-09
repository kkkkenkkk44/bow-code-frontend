import { SWITCH_TO, FETCH_OWN_COURSE, FETCH_OWN_COURSE_START } from '../actions/userPage'

const initialCourseListState = {
    currentTab: "overview",
    ownCourseFetching: true,
    ownCourse: []
}

const userPageReducer = (state = initialCourseListState, action) => {
    switch (action.type) {
        case SWITCH_TO:
            return {
                ...state,
                currentTab: action.payload.tab
            }
        case FETCH_OWN_COURSE_START:
            return {
                ...state,
                ownCourseFetching: true
            }
        case FETCH_OWN_COURSE:
            return {
                ...state,
                ownCourse: action.payload.courses
            }
        default:
            return state;
    }
}

export default userPageReducer