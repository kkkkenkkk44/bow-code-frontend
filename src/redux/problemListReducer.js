import {
    FETCH_LIST_FINISH,
    FETCH_LIST_START,
    DIFFICULTY_CHANGE,
    CATEGORY_CHANGE,
    TAGS_FILTER_CHANGE,
    KEYWORD_CHANGE,
    SHOW_PROBLEM_INFO,
    FETCH_TAGS_FINISH
} from '../actions/problemList'

const initialProblemListState = {
    problemList: [],
    tagsCount: [],
    isfetching: true,
    difficultyRange: [0, 2],
    category: "all",
    checked: {},
    keyword: "",
    showingInfoProblem: null
}

const problemListReducer = (state = initialProblemListState, action) => {
    switch (action.type) {
        case FETCH_LIST_FINISH:
            return {
                ...state,
                problemList: action.payload.problemList,
                isfetching: false,
            }
        case FETCH_TAGS_FINISH:
            return {
                ...state,
                tagsCount: action.payload.tagsCount,
                checked: action.payload.checked
            }
        case FETCH_LIST_START:
            return {
                ...state,
                isfetching: true
            }
        case DIFFICULTY_CHANGE:
            return {
                ...state,
                difficultyRange: action.payload.val
            }
        case CATEGORY_CHANGE:
            return {
                ...state,
                category: action.payload.val
            }
        case TAGS_FILTER_CHANGE:
            var newChecked = JSON.parse(JSON.stringify(state.checked))
            newChecked[action.payload.toggledTag] = !newChecked[action.payload.toggledTag]
            return {
                ...state,
                checked: newChecked,
            }
        case KEYWORD_CHANGE:
            return {
                ...state,
                keyword: action.payload.keyword
            }
        case SHOW_PROBLEM_INFO:
            return {
                ...state,
                showingInfoProblem: action.payload.problem
            }
        default:
            return state;
    }
}

export default problemListReducer