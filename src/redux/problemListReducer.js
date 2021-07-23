import {
    FETCH_LIST_FINISH,
    FETCH_LIST_START,
    DIFFICULTY_CHANGE,
    CATEGORY_CHANGE,
    TAGS_FILTER_CHANGE,
    CLICK_ALL_TAG,
    KEYWORD_CHANGE,
    SHOW_PROBLEM_INFO
} from '../actions/problemList'

const initialProblemListState = {
    problemList: [],
    tagsCount: [],
    isfetching: true,
    difficultyRange: [0, 2],
    category: "all",
    checked: {},
    checkedCnt: 0,
    allChecked: true,
    keyword: "",
    showingInfoProblem: null
}

const problemListReducer = (state = initialProblemListState, action) => {
    switch (action.type) {
        case FETCH_LIST_FINISH:
            return {
                ...state,
                problemList: action.payload.problemList,
                tagsCount: action.payload.tagsCount,
                isfetching: false,
                checked: action.payload.checked,
                checkedCnt: Object.keys(action.payload.checked).length
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
            var cntAdjust = newChecked[action.payload.toggledTag]? 1 : -1
            return {
                ...state,
                allChecked: state.checkedCnt + cntAdjust == Object.keys(state.checked).length,
                checked: newChecked,
                checkedCnt: state.checkedCnt + cntAdjust
            }
        case CLICK_ALL_TAG:
            var newChecked = JSON.parse(JSON.stringify(state.checked))
            Object.keys(newChecked).forEach(function (key) { newChecked[key] = !state.allChecked });
            return {
                ...state,
                checked: newChecked,
                allChecked: !state.allChecked,
                checkedCnt: state.allChecked ? 0 : Object.keys(state.checked).length
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