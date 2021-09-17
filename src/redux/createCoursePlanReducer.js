import { CHANGE_NAME, CHANGE_VISIBILITY } from "../actions/createCoursePlan";

const initState = {
    name: "",
    visibility: 0,
    courseList: [],
}

const createCoursePlanReducer = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_NAME:
            //console.log(action.payload.name)
            return {
                ...state,
                name: action.payload.name
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

export default createCoursePlanReducer