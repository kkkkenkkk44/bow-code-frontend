import { CircularProgress, Grid, IconButton, makeStyles, Typography, Popper, Paper, MenuItem, ClickAwayListener, MenuList } from "@material-ui/core"
import { useEffect, useState } from "react";
import CourseBlockEditor from "./CourseBlockEditor";
import { Redirect } from "react-router"
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@material-ui/icons/Add';
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

    const handleClose = () => {
        setCreateBlockOptionConfig({
            open: false,
            anchor: null,
            placement: 'right-start'
        })
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
                                        <MenuItem onClick={(e) => {
                                            fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${props.courseID}/block`, {
                                                method: "POST",
                                                credentials: "include"
                                            })
                                                .then(res => res.json())
                                                .then(res => {
                                                    //res = blockid
                                                    blocksID.splice(0, 0, { title: "", id: res })
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
                                        }}>
                                            新增文字
                                        </MenuItem>
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