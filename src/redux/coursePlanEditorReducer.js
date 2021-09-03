const initialCoursePlanEditorState = {

    coursePlanList: [],
    chosenCourseList: [],
    componentList: [],
    creator: "",
    name: "",
    visibility: 0
}

const coursePlanEditorReducer = (state = initialCoursePlanEditorState, action) => {

    var newChosenCourseList
    switch (action.type) {

        case "STORE_COURSEPLANLIST":
            return {
                ...state,
                coursePlanList: action.payload
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
                visibility: action.payload.visibility
            }
        default:
            return state;
    }
}

export default coursePlanEditorReducer