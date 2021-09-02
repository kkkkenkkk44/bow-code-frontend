const initialCoursePlanEditorState = {

    coursePlanList: [],
    chosenCourseList: [],

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
        default:
            return state;
    }
}

export default coursePlanEditorReducer