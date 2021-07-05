// import { ADD_NEW_BLOCK, FETCH_LIST_START } from '../actions/courseList'

const initialCourseEditorState = {
    blocks: [{content: "<p>請輸入文字</p>"}]
}

const courseEditorReducer = (state = initialCourseEditorState, action) => {
    let newBlocks
    switch (action.type) {    
        case "ADD_NEW_BLOCK":
            newBlocks = Array.from(state.blocks)
            newBlocks.splice(action.payload.index+1, 0, {content: ""})
            return {
                ...state,
                blocks: newBlocks
            }
        case "MODIFY_CONTENT":
            console.log(state.blocks)
            newBlocks = Array.from(state.blocks)
            newBlocks[action.payload.index].content = action.payload.content
            return {
                ...state,
                blocks: newBlocks
            }
        case "DELETE_BLOCK":
            newBlocks = Array.from(state.blocks)
            newBlocks.splice(action.payload.index, 1)
            return {
                ...state,
                blocks: newBlocks
            }
        default:
            return state;
    }
}

export default courseEditorReducer