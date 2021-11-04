const initialCoursePlanEditorState = {
    coursePlanList: [],
    selectedCoursePlanDetail:[],
    selectedCoursePlanComponentList: [],
    chosenCourseList: [],
    componentList: [],
    componentDetailList: [],
    creator: "",
    name: "",
    isFetching: false,
    visibility: 0
}

const coursePlanEditorReducer = (state = initialCoursePlanEditorState, action) => {

    var newChosenCourseList
    switch (action.type) {

        case "FETCHING_COURSEPLAN":
            return {
                ...state,
                isFetching: true
            }

        case "STORE_COURSEPLANLIST":
            return {
                ...state,
                coursePlanList: action.payload
            }
        case "STORE_SELECTEDCOURSEPLANDETAIL":
            //console.log(action.payload)
            return {
                ...state,
                selectedCoursePlanDetail: action.payload
            }
        case "STORE_SELECTEDCOURSEPLANCOMPONENTLIST":
            //console.log(action.payload)
            return {
                ...state,
                selectedCoursePlanComponentList: action.payload
            }

        case "CHOOSE_COURSE":
            newChosenCourseList = Array.from(state.chosenCourseList)
            newChosenCourseList.push(action.payload.course)
            return {
                ...state,
                chosenCourseList: newChosenCourseList
            }

        case "UNCHOOSE_COURSE":
            newChosenCourseList = Array.from(state.chosenCourseList)
            var index = newChosenCourseList.findIndex(course => course.id === action.payload.course.id)
            newChosenCourseList.splice(index, 1)
            return {
                ...state,
                chosenCourseList: newChosenCourseList
            }

        case "SAVE_COURSEPLAN_INFO":
            return {
                ...state,
                name: action.payload.name,
                creator:action.payload.creator,
                componentList: action.payload.componentList,
                visibility: action.payload.visibility,
            }

        case "SAVE_COMPONENT_DETAIL_LIST":
            return{
                ...state,
                componentDetailList: action.payload.componentDetailList,
                isFetching: false,
            }

        case "CLEAR_CHOSEN_COURSE":
            return{
                ...state,
                chosenCourseList: []
            }

        default:
            return state;
    }
}

export default coursePlanEditorReducer