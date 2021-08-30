export const FETCH_LIST_START = 'PROBLEM_FETCH_LIST';
export const FETCH_LIST_FINISH = 'PROBLEM_FETCH_LIST_FINISH';
export const FETCH_TAGS_FINISH = 'PROBLEM_FETCH_TAGS_FINISH'
export const DIFFICULTY_CHANGE = 'PROBLEM_DIFFICULTY_CHANGE';
export const CATEGORY_CHANGE = 'PROBLEM_CATEGORY_CHANGE';
export const TAGS_FILTER_CHANGE = 'PROBLEM_TAGS_FILTER_CHANGE';
export const CLICK_ALL_TAG = 'PROBLEM_CLICK_ALL_TAG'
export const KEYWORD_CHANGE = 'PROBLEM_KEYWORD_CHANGE';
export const SHOW_PROBLEM_INFO = 'PROBLEM_SHOW_PROBLEM_INFO'
export const PICK_PROBLEM = 'PICK_PROBLEM'
export const RESET_PICKED_PROBLEM = 'RESET_PICKED_PROBLEM'

export const fetchProblemListRequest = () => ({
    type: FETCH_LIST_START
})

export const fetchProblemList = (problemList) => {
    if (problemList == null) {
        problemList = []
    }
    return {
        type: FETCH_LIST_FINISH,
        payload: {
            problemList: problemList,
        },
    }
};

export const fetchTagsList = (tagsCount) => {
    var checked = {}
    tagsCount.map((tag) => {
        checked[tag.tag] = false
    })
    return {
        type: FETCH_TAGS_FINISH,
        payload: {
            tagsCount: tagsCount,
            checked: checked
        },
    }
}

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

export const changeTagsFilter = (checked, tag) => {
    return (dispatch)=>{
        var newChecked = JSON.parse(JSON.stringify(checked))
        newChecked[tag] = !newChecked[tag]
        dispatch(fetchProblemListAsync(newChecked, false))
        dispatch({
            type: TAGS_FILTER_CHANGE,
            payload: {
                toggledTag: tag
            }
        })
    }
}

export const clickAllTags = () => ({
    type: CLICK_ALL_TAG
})

export const handleChangeKeyword = (w) => ({
    type: KEYWORD_CHANGE,
    payload: {
        keyword: w
    }
})

export const showProblemInfo = (problem) => ({
    type: SHOW_PROBLEM_INFO,
    payload: {
        problem: problem
    }
})

export function fetchProblemListAsync(checked = {}, refreshTag = true) {
    var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/problem`)
    Object.keys(checked).forEach(tag => {
        if (checked[tag]) {
            url.searchParams.append("tag", tag)
        }
    })
    return (dispatch) => {
        dispatch(fetchProblemListRequest())
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                let new_list = data
                if(refreshTag){
                    dispatch(fetchTagsList(new_list.tagsCount))
                }
                dispatch(fetchProblemList(new_list.problemList))
            })
            .catch(e => {
                // error handling
                console.log(e)
            })
    };
}

export function problemPicker(problem) {
    return {
        type: PICK_PROBLEM,
        payload: {
            id: problem.id,
            name: problem.name
        }
    }
}

export function resetPickedProblem(){
    return {
        type: RESET_PICKED_PROBLEM
    }
}