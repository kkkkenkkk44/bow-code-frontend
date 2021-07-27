// import { ADD_NEW_BLOCK, FETCH_LIST_START } from '../actions/courseList'

const initialCourseEditorState = {
    isFetching: false,
    isImporting: false,
    isFetchingProblem: false,
    isImportingProblem: false,
    blocksID: [],
    name: "",
    abstract: "",
    blocks: []
}

const courseEditorReducer = (state = initialCourseEditorState, action) => {
    let newBlocks, temp
    switch (action.type) {
        case "IMPORT_START": 
            return {
                ...state,
                isImporting: true,
                importFromIndex: action.payload.importFromIndex
            }
        case "IMPORT_END":
            return {
                ...state,
                isImporting: false
            }

        case "IMPORT_PROBLEM_START":
            return {
                ...state,
                isImportingProblem: true,
                importFromIndex: action.payload.importFromIndex
            }

        case "IMPORT_PROBLEM_END": 
            return {
                ...state,
                isImportingProblem: false,
            }
        case "FETCH_COURSE_START":
            return {
                ...state,
                isFetching: true
            }
        // case "FETCH_COURSEBLOCK":
        //     return{
        //         ...state,
        //         blocks
        //     }
        case "FETCH_COURSE_END":
            newBlocks = Array.from(action.payload.blockDetailList)
            return {
                ...state,
                isFetching: false,
                name: action.payload.name,
                abstract: action.payload.abstract,
                blocksID: action.payload.blockList,
                blocks: newBlocks
            }

        case "ADD_NEW_BLOCK":
            newBlocks = Array.from(state.blocks)
            newBlocks.splice(action.payload.index+1, 0, {content: ""})
            return {
                ...state,
                isFetching: false,
                blocks: newBlocks,
                blocksID: action.payload.blocksID
            }
        case "MODIFY_CONTENT":
            newBlocks = Array.from(state.blocks)
            newBlocks[action.payload.index].content = action.payload.content
            return {
                ...state,
                isFetching: false,
                blocks: newBlocks
            }
        case "DELETE_BLOCK":
            newBlocks = Array.from(state.blocks)
            newBlocks.splice(action.payload.index, 1)
            return {
                ...state,
                isFetching: false,
                blocks: newBlocks
            }
        case "MOVE_UP":
            newBlocks = Array.from(state.blocks)
            temp = newBlocks[action.payload.index]
            newBlocks.splice(action.payload.index, 1)
            newBlocks.splice(action.payload.index-1, 0, temp)
            console.log(newBlocks)
            return {
                ...state,
                isFetching: false,
                blocks: newBlocks,
                blocksID: action.payload.blocksID
            }
        case "MOVE_DOWN":
            newBlocks = Array.from(state.blocks)
            temp = newBlocks[action.payload.index]
            newBlocks.splice(action.payload.index, 1)
            newBlocks.splice(action.payload.index+1, 0, temp)
            console.log(newBlocks)
            return {
                ...state,
                isFetching: false,
                blocks: newBlocks,
                blocksID: action.payload.blocksID
            }
        default:
            return state;
    }
}

export default courseEditorReducer