const initialCoursePlanEditorState = {

    coursePlanList: [],
    selectedCoursePlanDetail:[],
    selectedCoursePlanComponentList: []

}

const coursePlanEditorReducer = (state = initialCoursePlanEditorState, action) => {


    switch (action.type) {

        case "STORE_COURSEPLANLIST":
            console.log(action.payload)
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
        default:
            return state;
    }
}

export default coursePlanEditorReducer