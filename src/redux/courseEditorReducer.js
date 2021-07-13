// import { ADD_NEW_BLOCK, FETCH_LIST_START } from '../actions/courseList'

const initialCourseEditorState = {
    isFetchingCourse: false,
    blocksID: [],
    name: "",
    abstract: "",
    blocks: []
}

const courseEditorReducer = (state = initialCourseEditorState, action) => {
    let newBlocks
    switch (action.type) {
        case "FETCH_COURSE_START":
            return {
                ...state,
                isFetchingCourse: true
            }
        // case "FETCH_COURSEBLOCK":
        //     return{
        //         ...state,
        //         blocks
        //     }
        case "FETCH_COURSE_END":
            return {
                ...state,
                isFetchingCourse: false,
                name: action.payload.name,
                abstract: action.payload.abstract,
                blocksID: action.payload.blockList,
                blocks: action.payload.blockDetailList
            }
        case "ADD_NEW_BLOCK":
            newBlocks = Array.from(state.blocks)
            newBlocks.splice(action.payload.index+1, 0, {content: "<p>請輸入文字</p>"})
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
        case "MOVE_UP":
            newBlocks = Array.from(state.blocks)
            var temp = newBlocks[action.payload.index]
            newBlocks.splice(action.payload.index, 1)
            newBlocks.splice(action.payload.index-1, 0, temp)
            console.log(newBlocks)
            return {
                ...state,
                blocks: newBlocks
            }
        case "MOVE_DOWN":
            newBlocks = Array.from(state.blocks)
            var temp = newBlocks[action.payload.index]
            newBlocks.splice(action.payload.index, 1)
            newBlocks.splice(action.payload.index+1, 0, temp)
            console.log(newBlocks)
            return {
                ...state,
                blocks: newBlocks
            }
        default:
            return state;
    }
}

export default courseEditorReducer