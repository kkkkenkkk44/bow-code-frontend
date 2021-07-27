import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function ImportProblemBlockDialog(props) {

    const isImportingProblem = useSelector(state => state.courseEditorReducer.isImportingProblem)
    const importFromIndex = useSelector(state => state.courseEditorReducer.importFromIndex)

    const [importProblemID, setImportProblemID] = useState("")

    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch({ type: "IMPORT_PROBLEM_END" })
        console.log("close")
    }

    return (
        <Dialog open={isImportingProblem} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">匯入題目</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    請輸入希望匯入的題目 id
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="problem id"
                    type="email"
                    onChange={(e) => { setImportProblemID(e.target.value) }}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()} color="primary">
                    取消
                </Button>
                <Button onClick={() => {
                            handleClose()
                            //fetch
                            fetch(`${process.env.REACT_APP_BACKEND_URL}/problem/${importProblemID}`, {
                                method: 'GET',
                                credentials: "include"
                            })
                            .then(res => res.json())
                            .then(res => {
                                const {name, description} = res
                                
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