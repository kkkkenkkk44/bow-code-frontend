import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, IconButton } from '@material-ui/core'
import { InputAdornment } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { addBlock } from '../actions/courseEditorPage';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        height: "calc(100vh - 180px)",
        margin: theme.spacing(5),
        overflow: "visible"
    },
    courseAll: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '15px',
        height: '100%'
    },
    filter: {
        flex: 1,
        flexBasis: theme.spacing(15),
        height: '100%',
        margin: theme.spacing(2),
    },
    textfield: {
        marginBottom: '15px',
        marginRight: '15px',
        marginTop: theme.spacing(2),
    },
    searchFont: {
        fontSize: '14pt'
    },
    difficulty: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    courseAllCourseList: {
        flex: 6,
        marginTop: '15px',
        overflowY: 'scroll',
        maxHeight: '100%'
    },
    courseCard: {
        flex: 1,
        margin: theme.spacing(2),
    },
    comfirmBar: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "10px"
    }
}));

export default function AddBlockDialog(props) {

    const classes = useStyles();
    const open = useSelector(state => state.courseEditorReducer.isAddingNewBlock)
    const blocksID = useSelector(state => state.courseEditorReducer.blocksID)
    const [newTitle, setNewTitle] = useState("")
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch({ type: "ADDING_NEW_BLOCK_END" })
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg">
            <DialogTitle id="form-dialog-title">新單元方塊標題</DialogTitle>
            <DialogContent>
                <TextField
                    id="standard-full-width"
                    placeholder="標題"
                    fullWidth
                    onChange={(e) => setNewTitle(e.target.value)}
                    InputProps={{
                        classes: {
                            input: classes.searchFont,
                        },
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    handleClose()
                }}>
                    取消
                </Button>
                <Button onClick={() => {
                    dispatch(addBlock(props.courseID, newTitle, props.setCurrentIndex, blocksID))
                }}>
                    新增
                </Button>
            </DialogActions>
        </Dialog>



    )
}