import { APPLY_CLASSROOM_FETCH_CLASSROOM_END, APPLY_CLASSROOM_FETCH_CLASSROOM_START } from "../actions/applyClassroomPage";

const initialState = {
    isFetching: false,
    classroomDetail: {}
}

const applyClassroomPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case APPLY_CLASSROOM_FETCH_CLASSROOM_START:
            return ({
                ...state,
                isFetching: true,
            })
        case APPLY_CLASSROOM_FETCH_CLASSROOM_END:
            return ({
                ...state,
                isFetching: false,
                classroomDetail: action.payload
            })
        default:
            return state;
    }
}

export default applyClassroomPageReducer
