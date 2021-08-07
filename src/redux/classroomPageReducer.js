import { CLASSROOM_SWITCH_TO } from '../actions/classroomPage'

const initialState = {
    currentTab: "overview",
}

const classroomPageReducer = (state = initialState, action) => {
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

export default classroomPageReducer