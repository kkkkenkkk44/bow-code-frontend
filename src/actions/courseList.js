export const FETCH_LIST_START = 'FETCH_LIST';
export const FETCH_LIST_FINISH = 'FETCH_LIST_FINISH';
export const DIFFICULTY_CHANGE = 'DIFFICULTY_CHANGE';
export const CATEGORY_CHANGE = 'CATEGORY_CHANGE';
export const TAGS_FILTER_CHANGE = 'TAGS_FILTER_CHANGE';
export const CLICK_ALL_TAG = 'CLICK_ALL_TAG'
export const KEYWORD_CHANGE = 'KEYWORD_CHANGE'

export const fetchCourseListRequest = () => ({
    type: FETCH_LIST_START
})

export const fetchCourseList = (new_list) => {
    if (new_list.tagsCount == null) {
        new_list.tagsCount = []
    }
    if (new_list.courseList == null) {
        new_list.courseList = []
    }
    var checked = {}
    new_list.tagsCount.map((tag) => {
        checked[tag.tag] = true
    })
    return {
        type: FETCH_LIST_FINISH,
        payload: {
            courseList: new_list.courseList,
            tagsCount: new_list.tagsCount,
            checked: checked
        },
    }
};

export const changeDifficulty = (val) => ({
    type: DIFFICULTY_CHANGE,
    payload: {
        val: val
    }
})

export const changeCategory = (val) => ({
    type: CATEGORY_CHANGE,
    payload: {
        val: val
    }
})

export const changeTagsFilter = (tag) => ({
    type: TAGS_FILTER_CHANGE,
    payload: {
        toggledTag: tag
    }
})

export const clickAllTags = () => ({
    type: CLICK_ALL_TAG
})

export const handleChangeKeyword = (w) => ({
    type: KEYWORD_CHANGE,
    payload: {
        keyword: w
    }
})

export function fetchCourseListAsync(filter = {}) {
    var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/course`)
    Object.keys(filter).forEach(key => {
        if (key == 'keyword') {
            filter.keyword.forEach(w => url.searchParams.append("keyword", w))
        } else{
            url.searchParams.append(key, filter[key])
        }
    })
    return (dispatch) => {
        dispatch(fetchCourseListRequest())
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                let new_list = data
                dispatch(fetchCourseList(new_list))
            })
            .catch(e => {
                // error handling
                console.log(e)
            })
    };
}