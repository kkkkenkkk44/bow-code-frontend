import { CircularProgress, Grid, IconButton, makeStyles, Typography, Popper, Paper, MenuItem, ClickAwayListener, MenuList } from "@material-ui/core"
import { useEffect, useState } from "react";
import CourseBlockEditor from "./CourseBlockEditor";
import { Redirect } from "react-router"
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = makeStyles((theme) => ({
    courseBlockEditor: {
        margin: "20px 0 20px 0"
    },
    title: {
        width: "99%"
    }
}))

const TitleBLock = (props) => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const [focus, setFocus] = useState(false)
    const [createBlockOptionConfig, setCreateBlockOptionConfig] = useState({
        open: false,
        anchor: null,
        placement: 'right-start'
    })
    const blocksID = Array.from(useSelector(state => state.courseEditorReducer.blocksID))

    const [courseBlockTitle, setCourseBlockTitle] = useState("")
    const [openBlockTitleDialog, setOpenBlockTitleDialog] = useState(false)

    const handleOpenTitleDialog = () => {
        setOpenBlockTitleDialog(true)
    }

    const handleCloseTitleDialog = () => {
        setOpenBlockTitleDialog(false)
    }

    const handleBlockTitleValue = (e) => {
        setCourseBlockTitle(e.target.value)
    }
    const handleClose = () => {
        setCreateBlockOptionConfig({
            open: false,
            anchor: null,
            placement: 'right-start'
        })
    }

    const addNewBlock = () => {
        var blockTitle = {
            title: courseBlockTitle
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${props.courseID}/block`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(blockTitle),
        })
            .then(res => res.json())
            .then(res => {
                //res = blockid
                blocksID.splice(0, 0, { type: "course", title: courseBlockTitle, id: res })
                fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${props.courseID}/blockOrder`, {
                    method: "PUT",
                    credentials: "include",
                    body: JSON.stringify(blocksID),
                })
                    .then(res => {
                        dispatch({ type: "ADD_NEW_BLOCK", payload: { index: -1, blocksID } })
                        setFocus(false)
                    })
            })
        handleClose()
    }
    return (
        <ClickAwayListener
            onClickAway={() => {
                setFocus(false)
                handleClose()
            }
            }>
            <Grid container justify="center" alignItems="center" onClick={() => setFocus(true)}>
                {focus ? <Grid item xs={1} className={classes.button_container} /> : <></>}
                <Grid item xs={10}>
                    <Typography variant="h4">{props.title}</Typography>
                </Grid>
                {focus ?
                    <Grid item xs={1} className={classes.button_container}>
                        <IconButton
                            id={`addBlockButton_title`}
                            onClick={(e) => {
                                setCreateBlockOptionConfig({
                                    open: !createBlockOptionConfig.open,
                                    anchor: document.getElementById(`addBlockButton_title`),
                                    placement: 'right-start'
                                })
                            }
                            }>
                            <AddIcon />
                        </IconButton>
                        <Popper
                            open={createBlockOptionConfig.open}
                            anchorEl={createBlockOptionConfig.anchor}
                            placement={createBlockOptionConfig.placement}
                            transition
                        >
                            <Paper>
                                <ClickAwayListener
                                    onClickAway={() => {
                                        handleClose()
                                    }
                                    }>
                                    <MenuList>
                                        <MenuItem onClick={() => {
                                            handleOpenTitleDialog()
                                        }}>
                                            新增文字
                                        </MenuItem>
                                        <Dialog open={openBlockTitleDialog} onClose={handleCloseTitleDialog} aria-labelledby="form-dialog-title">
                                            <DialogContent>
                                            <DialogContentText>
                                                請輸入課程方塊的標題
                                            </DialogContentText>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="title"
                                                label="課程方塊標題"
                                                type="title"
                                                fullWidth
                                                onChange={handleBlockTitleValue}
                                            />
                                            </DialogContent>
                                            <DialogActions>
                                            <Button onClick={handleCloseTitleDialog} color="primary">
                                                取消
                                            </Button>
                                            <Button onClick={addNewBlock} color="primary">
                                                確定
                                            </Button>
                                            </DialogActions>
                                        </Dialog>
                                        <MenuItem
                                            onClick={() => {
                                                console.log("open dialog")
                                                dispatch({ type: "IMPORT_START", payload: { importFromIndex: -1 } })
                                            }}
                                        >
                                            匯入文字
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Popper>
                    </Grid>
                    :
                    <></>
                }

            </Grid>
        </ClickAwayListener>
    )
}

export default function CourseEditor(props) {

    const classes = useStyles()
    const { blocks, blocksID, isFetching, name } = useSelector(state => state.courseEditorReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        // tell redux that fetch start
        dispatch({ type: "FETCH_COURSE_START" })
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${props.CourseID}`, {
            method: 'GET',
            credentials: "include"
        })
            .then(res => res.json())
            .then(res => {
                // tell redux that fetch end
                const { name, abstract, blockList } = res
                var blockDetailList = []
                Promise.all(blockList.map(block => {
                    return fetch(`${process.env.REACT_APP_FILE_SERVER_URL}/files/course/${props.CourseID}/block/${block.id}/`, {
                        method: "GET",
                        credentials: "include"
                    })
                }))
                    .then(res => {
                        Promise.all(res.map(r => (r.text())))
                            .then(res => {
                                console.log(res)
                                res.forEach((r, index) => {
                                    blockDetailList.push({ content: r, id: blockList[index].id })
                                })
                                console.log(blockDetailList)
                                dispatch({ type: "FETCH_COURSE_END", payload: { name, abstract, blockList, blockDetailList } })
                            })
                    })
            })
            .catch(e => {
                // error handle
                console.log(e)
            })
    }, [])

    return (
        <Grid container justify="center">
            <Grid item xs={10}>
                {isFetching ?
                    <CircularProgress />
                    :
                    <>
                        <div className={classes.courseBlockEditor}>
                            <TitleBLock title={name} courseID={props.CourseID}/>
                        </div>
                        {
                            blocks.length !== 0 ?
                                blocks.map((block, index) => {
                                    return (
                                        <div className={classes.courseBlockEditor} key={index}>
                                            <CourseBlockEditor
                                                index={index}
                                                block={block}
                                                courseID={props.CourseID}
                                                blockID={blocksID[index].id}
                                                id={`courseBlockEditor_${index}`}
                                            />
                                        </div>
                                    )
                                })
                                :
                                <button onClick={() => console.log(blocks.length)}>no block</button>
                        }
                    </>
                }
            </Grid>
        </Grid>
    )
}