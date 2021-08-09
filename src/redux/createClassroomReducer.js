import { CHANGE_NAME, CHANGE_REVIEW, CHANGE_APPLY, CHANGE_VISIBILITY } from "../actions/createClassroom";

const initState = {
    name: "",
    review: false,
    apply: true,
    visibility: 0,
}

const createClassroomReducer = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_NAME:
            //console.log(action.payload.name)
            return {
                ...state,
                name: action.payload.name
            }
        case CHANGE_REVIEW:
            //console.log(action.payload.review)
            return {
                ...state,
                review: action.payload.review
            }
        case CHANGE_APPLY:
            //console.log(action.payload.apply)
            return {
                ...state,
                apply: action.payload.apply
            }
        case CHANGE_VISIBILITY:
            return {
                ...state,
                visibility: action.payload.visibility
            }
        default:
            return {
                ...state
            }
    }
}

export default createClassroomReducer