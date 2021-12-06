export function fetchCourseDetail(CourseID) {
    return (dispatch) => {
        var myHeaders = new Headers();
        myHeaders.append('pragma', 'no-cache');
        myHeaders.append('cache-control', 'no-cache');
        // tell redux that fetch start
        dispatch({ type: "FETCH_COURSE_START" })
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${CourseID}`, {
            method: 'GET',
            credentials: "include"
        })
            .then(res => res.json())
            .then(res => {
                // tell redux that fetch end
                const { name, abstract, blockList, creator } = res
                var blockDetailList = []
                Promise.all(blockList.map(block => {
                    return fetch(`${process.env.REACT_APP_FILE_SERVER_URL}/files/course/${CourseID}/block/${block.id}/`, {
                        method: "GET",
                        credentials: "include",
                        headers: myHeaders
                    })
                }))
                    .then(res => {
                        Promise.all(res.map(r => (r.text())))
                            .then(res => {
                                res.forEach((r, index) => {
                                    blockDetailList.push({ content: r, id: blockList[index].id, title: blockList[index].title })
                                })
                                fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${creator}`, {
                                    method: 'GET',
                                    credentials: "include"
                                })
                                    .then(res => res.json())
                                    .then(res => {
                                        dispatch({ type: "FETCH_COURSE_END", payload: { name, abstract, blockList, blockDetailList, creator: res } })
                                    })
                            })
                    })
            })
            .catch(e => {
                // error handle
                console.log(e)
            })
    }
}

export function postBlock(courseID, blockID, content, index) {
    return (dispatch) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${courseID}/block/${blockID}`, {
            method: "PUT",
            credentials: "include",
            body: content
        })
            .catch(e => {
                console.log("error when post block: ", e)
            })
        dispatch({ type: "MODIFY_CONTENT", payload: { index: index, content } })
    }
}

export function addBlock(courseID, title, setCurrentIndex, blocksID) {
    return (dispatch) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${courseID}/block`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                title
            })
        })
            .then(res => {
                dispatch(fetchCourseDetail(courseID))
                dispatch({ type: "ADDING_NEW_BLOCK_END" })
                setCurrentIndex(blocksID.length)
            })
            .catch(e => {
                console.log("error when adding block: ", e)
            })
    }
}

export function blockUp(courseID, index, blocksID) {
    return (dispatch) => {
        const newBlocksID = Array.from(blocksID)
        const temp = blocksID[index]
        newBlocksID.splice(index, 1)
        newBlocksID.splice(index - 1, 0, temp)
        console.log(newBlocksID)
        dispatch({type: "IS_MOVING"})
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${courseID}/blockOrder`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(newBlocksID)
        })
            .then(res => {
                dispatch({ type: "MOVE_UP", payload: { index, blocksID: newBlocksID } })
            })
    }
}

export function blockDown(courseID, index, blocksID) {
    return (dispatch) => {
        const newBlocksID = Array.from(blocksID)
        const temp = blocksID[index]
        newBlocksID.splice(index, 1)
        newBlocksID.splice(index + 1, 0, temp)
        dispatch({type: "IS_MOVING"})
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${courseID}/blockOrder`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(newBlocksID)
        })
            .then(res => {
                dispatch({ type: "MOVE_DOWN", payload: { index, blocksID: newBlocksID } })
            })
    }
}

export function editTitle(courseID, index, blocksID, newTitle) {
    return (dispatch) => {
        const newBlocksID = Array.from(blocksID)
        newBlocksID[index].title = newTitle
        console.log(newBlocksID)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${courseID}/blockOrder`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(newBlocksID)
        })
            .then(res => {
                dispatch(fetchCourseDetail(courseID))
                dispatch({ type: "FINISH_EDITING_TITLE" })
            })
    }
}

export function deleteBlock(courseID, index, blocksID) {
    return (dispatch) => {
        const newBlocksID = Array.from(blocksID)
        newBlocksID.splice(index, 1)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${courseID}/blockOrder`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(newBlocksID)
        })
            .then(res => {
                dispatch(fetchCourseDetail(courseID))
            })
    }
}