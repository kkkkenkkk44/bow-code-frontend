export const FETCH_LIST_START = 'FETCH_LIST';
export const FETCH_LIST_FINISH = 'FETCH_LIST_FINISH';
export const DIFFICULTY_CHANGE = 'DIFFICULTY_CHANGE';
export const CATEGORY_CHANGE = 'CATEGORY_CHANGE';
export const TAGS_FILTER_CHANGE = 'TAGS_FILTER_CHANGE';
export const CLICK_ALL_TAG = 'CLICK_ALL_TAG'
export const KEYWORD_CHANGE = 'KEYWORD_CHANGE';
export const SHOW_PROBLEM_INFO = 'SHOW_PROBLEM_INFO'

export const fetchProblemListRequest = () => ({
    type: FETCH_LIST_START
})

export const fetchProblemList = (new_list) => {
    if (new_list.tagsCount == null) {
        new_list.tagsCount = []
    }
    if (new_list.problemList == null) {
        new_list.problemList = []
    }
    var checked = {}
    new_list.tagsCount.map((tag) => {
        checked[tag.tag] = true
    })
    return {
        type: FETCH_LIST_FINISH,
        payload: {
            problemList: new_list.problemList,
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

export const showProblemInfo = (problem) => ({
    type: SHOW_PROBLEM_INFO,
    payload: {
        problem: problem
    }
})

export function fetchProblemListAsync(filter = {}) {
    var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/problem`)
    return (dispatch) => {
        dispatch(fetchProblemListRequest())
        var mock_problemList = [
            {
                id: "123456",
                name: "範例題目 1",
                creator: "google_103217405870903044474",
                tags: ["tag 1", "tag 2"],
                difficulty: 0,
                category: "practice",
                visibility: "everyone",
                createTime: "2021/05/24 10:24:12",
                description: "This is how you solve this problem"
            },
            {
                id: "123457",
                name: "範例題目 2",
                creator: "google_103217405870903044474",
                tags: ["tag 1", "tag 3"],
                difficulty: 1,
                category: "practice",
                visibility: "everyone",
                createTime: "2021/05/24 10:24:12",
                description: `
                Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`
            },
        ]
        var tag_count = [
            {
                tag: "tag 1",
                count: 2
            },
            {
                tag: "tag 2",
                count: 1
            },
            {
                tag: "tag 3",
                count: 1
            },
        ]
        const mock_result = {
            tagsCount: tag_count,
            problemList: mock_problemList
        }
        dispatch(fetchProblemList(mock_result))
        // fetch(url, { method: "GET" })
        //     .then(res => res.json())
        //     .then(data => {
        //         let new_list = data
        //         dispatch(fetchProblemList(new_list))
        //     })
        //     .catch(e => {
        //         // error handling
        //         console.log(e)
        //     })
    };
}