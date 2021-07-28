import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function ImportBlockDialog(props) {

    const isImporting = useSelector(state => state.courseEditorReducer.isImporting)
    const importFromIndex = useSelector(state => state.courseEditorReducer.importFromIndex)
    const blocksID = Array.from(useSelector(state => state.courseEditorReducer.blocksID))
    const blocks = Array.from(useSelector(state => state.courseEditorReducer.blocks))
    const dispatch = useDispatch()
    const [importCourseID, setImportCourseID] = useState("")
    const name = useSelector(state => state.courseEditorReducer.name)

    const handleClose = () => {
        dispatch({ type: "IMPORT_END" })
        console.log("close")
    }

    return (
        <Dialog open={isImporting} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">匯入課程</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    請輸入希望匯入的課程的 id
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="course id"
                    type="email"
                    onChange={(e) => { setImportCourseID(e.target.value) }}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()} color="primary">
                    取消
                </Button>
                <Button
                    onClick={() => {
                        handleClose()
                        //fetch
                        dispatch({ type: "FETCH_COURSE_START" })
                        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${importCourseID}`, {
                            method: 'GET',
                            credentials: "include"
                        })
                            .then(res => res.json())
                            .then(res => {
                                const { abstract, blockList } = res
                                Promise.all(blockList.map(block => {
                                    return fetch(`${process.env.REACT_APP_FILE_SERVER_URL}/files/course/${importCourseID}/block/${block.id}/`, {
                                        method: "GET",
                                        credentials: "include"
                                    })
                                }))
                                    .then(res => {
                                        Promise.all(res.map(r => (r.text())))
                                            .then(async (res) => {
                                                var newBlocksID = []
                                                var newBlocks = []
                                                for (let i = 0; i < res.length; i++) {
                                                    var newBlockID =
                                                        await fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${props.CourseID}/block`, {
                                                            method: "POST",
                                                            credentials: "include"
                                                        })
                                                            .then(res => res.json())
                                                    newBlocksID.push({ title: "", id: newBlockID })
                                                    newBlocks.push({ content: res[i], id: newBlockID })
                                                    //舊的 course: importCourseID, block: blockList[i].id
                                                    //新的 course: props.CourseID, block: newBlockID
                                                    await fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${props.CourseID}/block/${newBlockID}`, {
                                                        method: "PUT",
                                                        credentials: "include",
                                                        body: res[i]
                                                    })
                                                }
                                                newBlocksID.forEach((id, index) => blocksID.splice(importFromIndex + 1 + index, 0, id))
                                                newBlocks.forEach((block, index) => blocks.splice(importFromIndex + 1 + index, 0, block))
                                                await fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${props.CourseID}/blockOrder`, {
                                                    method: "PUT",
                                                    credentials: "include",
                                                    body: JSON.stringify(blocksID)
                                                })
                                                dispatch({ type: "FETCH_COURSE_END", payload: { name, abstract, blockList: blocksID, blockDetailList: blocks } })
                                            })
                                    })
                            })
                            .catch(e => {
                                // error handle
                                console.log(e)
                            })
                    }}
                    color="primary"
                >
                    確認
                </Button>
            </DialogActions>
        </Dialog>
    )
}