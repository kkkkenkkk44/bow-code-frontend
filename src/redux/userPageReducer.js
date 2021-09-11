import { SWITCH_TO, FETCH_OWN_COURSE, FETCH_OWN_COURSE_START, FETCH_FAV_COURSE, FETCH_FAV_COURSE_START, 
    FETCH_OWN_COURSEPLAN, FETCH_OWN_COURSEPLAN_START,
    FETCH_SUBMISSION_START, 
    FETCH_SUBMISSION } from '../actions/userPage'

const initialCourseListState = {
    currentTab: "overview",
    ownCourseFetching: false,
    favCourseFetching: false,
    ownCoursePlanFetching: false,
    submissionFetching: false,
    ownCourse: [],
    favCourse: [],
    ownCoursePlan: [],
    submissions: []
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
                ownCourse: action.payload.courses,
                ownCourseFetching: false
            }
        case FETCH_FAV_COURSE_START:
            return {
                ...state,
                favCourseFetching: true,
            }
        case FETCH_FAV_COURSE:
            return {
                ...state,
                favCourse: action.payload.courses,
                favCourseFetching: false
            }
        case FETCH_OWN_COURSEPLAN_START:
            return {
                ...state,
                ownCoursePlanFetching: true,
            }
        case FETCH_OWN_COURSEPLAN:
            return {
                ...state,
                ownCoursePlan: action.payload.coursePlans,
                ownCoursePlanFetching: false
            }
        case FETCH_SUBMISSION_START:
            return {
                ...state,
                submissionFetching: true,
            }
        case FETCH_SUBMISSION:
            return {
                ...state,
                submissions: action.payload.submissions,
                submissionFetching: false
            }
        default:
            return state;
    }
}

export default userPageReducer