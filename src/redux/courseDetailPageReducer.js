import { SHOW_COURSE_CONTENT } from '../actions/courseDetailPage'

const initialState = {
    showingCourseIndex: ""
}

const courseDetailPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_COURSE_CONTENT:
            return {
                ...state,
                showingCourseIndex: action.payload.index
            }
        case 'RESET_SHOWINGCOURSEINDEX':
            return {
                ...state,
                showingCourseIndex: ""
            }
        default:
            return state
    }
}

export default courseDetailPageReducer