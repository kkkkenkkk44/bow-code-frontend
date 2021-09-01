const initialCoursePlanEditorState = {

    coursePlanList: [],

}

const coursePlanEditorReducer = (state = initialCoursePlanEditorState, action) => {


    switch (action.type) {

        case "STORE_COURSEPLANLIST":
            console.log(action.payload)
            return {
                ...state,
                coursePlanList: action.payload
            }
        default:
            return state;
    }
}

export default coursePlanEditorReducer