import { CLASSROOM_SWITCH_TO } from '../actions/classroomManagerPage'

const initialState = {
    currentTab: "overview",
}

const classroomManagerPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLASSROOM_SWITCH_TO:
            return {
                ...state,
                currentTab: action.payload.tab
            }
        default:
            return state;
    }
}

export default classroomManagerPageReducer