export const FETCH_COURSE_PLAN_LIST_START = "FETCH_COURSE_PLAN_LIST_START"
export const FETCH_COURSE_PLAN_LIST_FINISH = "FETCH_COURSE_PLAN_LIST_FINISH"

function fetchCoursePlanListStart() {
    return ({
        type: FETCH_COURSE_PLAN_LIST_START,
    })
}

function fetchCoursePlanListFinish(coursePlanList) {
    return ({
        type: FETCH_COURSE_PLAN_LIST_FINISH,
        payload: {
            coursePlanList: coursePlanList
        }
    })
}

export function fetchCoursePlanList() {
    var url = new URL(`${process.env.REACT_APP_BACKEND_URL}/course_plan/all`)
    return (dispatch) => {
        dispatch(fetchCoursePlanListStart())
        fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(res => {
                var coursePlanList = res
                console.log(coursePlanList)
                Promise.all(coursePlanList.map(coursePlan => {
                    var url2 = new URL(`${process.env.REACT_APP_BACKEND_URL}/user/${coursePlan.creator}`)
                    return fetch(url2, { method: "GET" })
                }))
                    .then(res => Promise.all(res.map(r => r.json())))
                    .then(res => {
                        var users = res.forEach((r, index) =>{
                            coursePlanList[index].userInfo = r.userInfo
                        })
                        dispatch(fetchCoursePlanListFinish(coursePlanList))
                    })
            })
            .catch(e => {
                // error handling
                console.log(e)
            })
    }
}