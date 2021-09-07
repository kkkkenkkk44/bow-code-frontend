import {
    SWITCH_TO, FETCH_OWN_COURSE, FETCH_OWN_COURSE_START, FETCH_FAV_COURSE, FETCH_FAV_COURSE_START,
    FETCH_SUBMISSION_START,
    FETCH_SUBMISSION,
    FETCH_CLASSROOM
} from '../actions/userPage'

const initialCourseListState = {
    currentTab: "overview",
    ownCourseFetching: false,
    favCourseFetching: false,
    submissionFetching: false,
    ownCourse: [],
    favCourse: [],
    submissions: [],
    joinedClassrooms: [],
    ownClassrooms: []
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
        case FETCH_CLASSROOM:
            if (action.payload.type == "joined"){
                return {
                    ...state,
                    joinedClassrooms: action.payload.classrooms
                }
            } else if (action.payload.type == "own"){
                return {
                    ...state,
                    ownClassrooms: action.payload.classrooms
                }
            } else {
                return state
            }
        default:
            return state;
    }
}

export default userPageReducer