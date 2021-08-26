export const FETCH_BULLETIN = 'FETCH_BULLETIN'
export const FETCH_BULLETIN_START = 'FETCH_BULLETIN_START'
export const CLASSROOM_SWITCH_TO = 'CLASSROOM_SWITCH_TO';
export const REACT_TO_REPLY = 'REACT_TO_REPLY'
export const REACT_TO_BULLETIN = 'REACT_TO_BULLETIN'
export const FETCH_COURSEPLAN_START = 'FETCH_COURSEPLAN_START'
export const FETCH_COURSEPLAN_FINISH = 'FETCH_COURSEPLAN_FINISH'
export const FETCH_CLASSROOM_START = 'FETCH_CLASSROOM_START'
export const FETCH_CLASSROOM_FINISH = 'FETCH_CLASSROOM_FINISH'

export const switchTo = (tab) => ({
    type: CLASSROOM_SWITCH_TO,
    payload: {
        tab: tab
    }
})
export const fetchBulletinStart = ()=>({
    type: FETCH_BULLETIN_START
})

export const fetchBulletin = (bulletinList) => ({
    type: FETCH_BULLETIN,
    payload: {
        bulletinList: bulletinList
    }
})

export const reactToReply = (bulletinId, replyId, userId) => ({
    type: REACT_TO_REPLY,
    payload: {
        bulletinId: bulletinId,
        replyId: replyId,
        userId: userId
    }
})

export const reactToBulletin = (bulletinId, userId) => ({
    type: REACT_TO_BULLETIN,
    payload: {
        bulletinId: bulletinId,
        userId: userId
    }
})

export const fetchBulletinAsync = () => {
    return (dispatch) => {
        const mock_data = [
            {
                id: 0,
                author: {
                    id: "google_123456",
                    name: "JHow",
                    avatar: "https://p2.bahamut.com.tw/B/2KU/73/a08d73c0de387ab525e01921c817x895.JPG?v=1589276460982"
                },
                title: "歡迎來到這個教室",
                content: "有什麼問題可以在下面問偶ㄛ",
                timeStamp: "1628345772",
                reactions: ["google_234567"],
                replies: [
                    {
                        id: 0,
                        author: {
                            id: "google_234567",
                            name: "某個學生",
                            avatar: "https://p2.bahamut.com.tw/B/2KU/73/a08d73c0de387ab525e01921c817x895.JPG?v=1589276460982"
                        },
                        reactions: ["google_234567"],
                        timeStamp: "1628325774",
                        content: "好ㄛ"
                    },
                    {
                        id: 1,
                        author: {
                            id: "google_234567",
                            name: "某個學生",
                            avatar: "https://p2.bahamut.com.tw/B/2KU/73/a08d73c0de387ab525e01921c817x895.JPG?v=1589276460982"
                        },
                        timeStamp: "1628325782",
                        reactions: [],
                        content: "問起來"
                    },
                ]
            },
            {
                id: 1,
                author: {
                    id: "google_123456",
                    name: "JHow",
                    avatar: "https://p2.bahamut.com.tw/B/2KU/73/a08d73c0de387ab525e01921c817x895.JPG?v=1589276460982"
                },
                timeStamp: "1628325774",
                title: "記得寫作業",
                content: "好嗎",
                reactions: ["google_234567"],
                replies: [
                    {
                        id: 0,
                        author: {
                            id: "google_234567",
                            name: "某個學生",
                            avatar: "https://p2.bahamut.com.tw/B/2KU/73/a08d73c0de387ab525e01921c817x895.JPG?v=1589276460982"
                        },
                        reactions: ["google_234567"],
                        timeStamp: "1628325774",
                        content: "好ㄛ"
                    },
                    {
                        id: 1,
                        author: {
                            id: "google_234567",
                            name: "某個學生",
                            avatar: "https://p2.bahamut.com.tw/B/2KU/73/a08d73c0de387ab525e01921c817x895.JPG?v=1589276460982"
                        },
                        timeStamp: "1628325770",
                        reactions: [],
                        content: "不要"
                    },
                ]
            },
            {
                id: 2,
                author: {
                    id: "google_123456",
                    name: "JHow",
                    avatar: "https://p2.bahamut.com.tw/B/2KU/73/a08d73c0de387ab525e01921c817x895.JPG?v=1589276460982"
                },
                title: "歡迎來到這個教室",
                content: "有什麼問題可以在下面問偶ㄛ",
                timeStamp: "1628325772",
                reactions: ["google_234567"],
                replies: [
                    {
                        id: 0,
                        author: {
                            id: "google_234567",
                            name: "某個學生",
                            avatar: "https://p2.bahamut.com.tw/B/2KU/73/a08d73c0de387ab525e01921c817x895.JPG?v=1589276460982"
                        },
                        reactions: ["google_234567"],
                        timeStamp: "1628325774",
                        content: "好ㄛ"
                    },
                    {
                        id: 1,
                        author: {
                            id: "google_234567",
                            name: "某個學生",
                            avatar: "https://p2.bahamut.com.tw/B/2KU/73/a08d73c0de387ab525e01921c817x895.JPG?v=1589276460982"
                        },
                        timeStamp: "1628325782",
                        reactions: [],
                        content: "問起來"
                    },
                ]
            },
            {
                id: 3,
                author: {
                    id: "google_123456",
                    name: "JHow",
                    avatar: "https://p2.bahamut.com.tw/B/2KU/73/a08d73c0de387ab525e01921c817x895.JPG?v=1589276460982"
                },
                timeStamp: "1628321774",
                title: "記得寫作業",
                content: "好嗎",
                reactions: ["google_234567"],
                replies: [
                    {
                        id: 0,
                        author: {
                            id: "google_234567",
                            name: "某個學生",
                            avatar: "https://p2.bahamut.com.tw/B/2KU/73/a08d73c0de387ab525e01921c817x895.JPG?v=1589276460982"
                        },
                        reactions: ["google_234567"],
                        timeStamp: "1628325774",
                        content: "好ㄛ"
                    },
                    {
                        id: 1,
                        author: {
                            id: "google_234567",
                            name: "某個學生",
                            avatar: "https://p2.bahamut.com.tw/B/2KU/73/a08d73c0de387ab525e01921c817x895.JPG?v=1589276460982"
                        },
                        timeStamp: "1628325770",
                        reactions: ["google_103217405870903044474", "google_103217405870903044424"],
                        content: "不要"
                    },
                    {
                        id: 2,
                        author: {
                            id: "google_234567",
                            name: "某個學生",
                            avatar: "https://p2.bahamut.com.tw/B/2KU/73/a08d73c0de387ab525e01921c817x895.JPG?v=1589276460982"
                        },
                        timeStamp: "1628125770",
                        reactions: [],
                        content: "要"
                    },
                    {
                        id: 3,
                        author: {
                            id: "google_234567",
                            name: "某個學生",
                            avatar: "https://p2.bahamut.com.tw/B/2KU/73/a08d73c0de387ab525e01921c817x895.JPG?v=1589276460982"
                        },
                        timeStamp: "1622325770",
                        reactions: [],
                        content: "不要"
                    },
                    {
                        id: 4,
                        author: {
                            id: "google_234567",
                            name: "某個學生",
                            avatar: "https://p2.bahamut.com.tw/B/2KU/73/a08d73c0de387ab525e01921c817x895.JPG?v=1589276460982"
                        },
                        timeStamp: "1628325790",
                        reactions: [],
                        content: "不要"
                    },
                ]
            },
        ]
        dispatch(fetchBulletin(mock_data))
        // fetch(url, { method: "GET" })
        // .then(res => res.json())
        // .then(data => {
        //     dispatch(fetchOwnCourse(data.courseList))
        // })
        // .catch(e => {
        //     // error handling
        //     console.log(e)
        // })
    }
}

export const fetchClassroomRequest = () => ({
    type: FETCH_CLASSROOM_START
})

export const fetchClassroom = (detail) => {
    const { applicants, apply, coursePlan, createTime, creator, id, invitees, name, review, students, visibility } = detail
    return {
        type: FETCH_CLASSROOM_FINISH,
        payload: {
            applicants, apply, coursePlan, createTime, creator, id, invitees, name, review, students, visibility
        }
    }
}

export function fetchClassroomAsync(classroomID) {
    var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/classroom/${classroomID}`)
    return (dispatch) => {
        dispatch(fetchClassroomRequest())
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                dispatch(fetchClassroom(data))
            })
            .catch(e => {
                // error handling
                console.log(e)
            })
    };
}

export const fetchCoursePlanRequest = () => ({
    type: FETCH_COURSEPLAN_START
})

export const fetchCoursePlan = (new_list) => {
    return {
        type: FETCH_COURSEPLAN_FINISH,
        payload: {
            courseList: new_list.courseList
        }
    }
}

export function fetchCoursePlanAsync(coursePlanID) {
    var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/course`)
    return (dispatch) => {
        dispatch(fetchCoursePlanRequest())
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch(fetchCoursePlan(data))
            })
            .catch(e => {
                // error handling
                console.log(e)
            })
    };
}