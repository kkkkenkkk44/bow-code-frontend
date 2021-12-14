import { FETCH_COURSE_PLAN_LIST_FINISH, FETCH_COURSE_PLAN_LIST_START } from "../actions/coursePlanListPage";

const initState = {
    isFetching: true,
    coursePlanList: []
}

const coursePlanListReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_COURSE_PLAN_LIST_START:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_COURSE_PLAN_LIST_FINISH:
            return {
                ...state,
                isFetching: false,
                coursePlanList: action.payload.coursePlanList
            }
        default:
            return {
                ...state
            }
    }
}

export default coursePlanListReducer