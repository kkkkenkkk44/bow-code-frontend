import { FETCH_LIST_FINISH, FETCH_LIST_START, DIFFICULTY_CHANGE, CATEGORY_CHANGE, TAGS_FILTER_CHANGE, CLICK_ALL_TAG, KEYWORD_CHANGE } from '../actions/courseList'

const initialCourseListState = {
    courseList: [],
    tagsCount: [],
    isfetching: true,
    difficultyRange: [0, 2],
    category: "all",
    checked: {},
    allChecked: true,
    keyword: ""
}

const courseListReducer = (state = initialCourseListState, action) => {
    switch (action.type) {
        case FETCH_LIST_FINISH:
            return {
                ...state,
                courseList: action.payload.courseList,
                tagsCount: action.payload.tagsCount,
                isfetching: false,
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
                allChecked: false,
                checked: newChecked
            }
        case CLICK_ALL_TAG:
            var newChecked = JSON.parse(JSON.stringify(state.checked))
            Object.keys(newChecked).forEach(function(key){ newChecked[key] = !state.allChecked });
            return {
                ...state,
                checked: newChecked,
                allChecked: !state.allChecked
            }
        case KEYWORD_CHANGE:
            return {
                ...state,
                keyword: action.payload.keyword
            }
        default:
            return state;
    }
}

export default courseListReducer