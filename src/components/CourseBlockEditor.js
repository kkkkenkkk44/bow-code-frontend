import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { Grid, Popper, Paper, MenuList, MenuItem, ClickAwayListener, makeStyles, IconButton, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddIcon from '@material-ui/icons/Add';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
// import Context from '@ckeditor/ckeditor5-core/src/context';

const useStyles = makeStyles((theme) => ({
    button_container: {
        display: "flex",
        justifyContent: "center"
    },
    block_typography: {
        padding: "1px 20px 1px 20px",
        minHeight: "30px"
    }
}));

const EditorPreview = (props) => {

    const classes = useStyles();

    return (
        <div className="editor-preview">
            <Paper onClick={props.onClick} elevation={3}>
                <Typography className={classes.block_typography} variant="h5" dangerouslySetInnerHTML={{ __html: props.data }}></Typography>
            </Paper>
        </div>
    );
}

export default function CourseBlockEditor(props) {

    const classes = useStyles();
    const dispatch = useDispatch()
    const blockCount = useSelector(state => state.courseEditorReducer.blocks.length)
    const blocksID = Array.from(useSelector(state => state.courseEditorReducer.blocksID))
    const content = useSelector(state => state.courseEditorReducer.blocks[props.index].content)

    const [focus, setFocus] = useState(false)
    const [createBlockOptionConfig, setCreateBlockOptionConfig] = useState({
        open: false,
        anchor: null,
        placement: 'right-start'
    })

    useEffect(() => {

    }, [])

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
                if (focus) {
                    fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${props.courseID}/block/${props.blockID}`, {
                        method: "PUT",
                        credentials: "include",
                        body: content
                    })
                }
                setFocus(false)
                handleClose()
            }
            }>
            <Grid container justify="center" alignItems="center">
                {focus ?
                    <Grid item xs={1} className={classes.button_container}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <IconButton
                                onClick={() => {
                                    var temp = blocksID[props.index]
                                    blocksID.splice(props.index, 1)
                                    blocksID.splice(props.index - 1, 0, temp)
                                    console.log(blocksID)

                                    fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${props.courseID}/blockOrder`, {
                                        method: "PUT",
                                        credentials: "include",
                                        body: JSON.stringify(blocksID)
                                    })
                                        .then(res => {
                                            dispatch({ type: "MOVE_UP", payload: { index: props.index, blocksID } })
                                            setFocus(false)
                                        })
                                }}
                                disabled={props.index === 0 ? true : false}
                            >
                                <ArrowUpwardIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    var temp = blocksID[props.index]
                                    blocksID.splice(props.index, 1)
                                    blocksID.splice(props.index + 1, 0, temp)
                                    console.log(blocksID)

                                    fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${props.courseID}/blockOrder`, {
                                        method: "PUT",
                                        credentials: "include",
                                        body: JSON.stringify(blocksID)
                                    })
                                        .then(res => {
                                            dispatch({ type: "MOVE_DOWN", payload: { index: props.index, blocksID } })
                                            setFocus(false)
                                        })
                                }}
                                disabled={props.index === blockCount - 1 ? true : false}
                            >
                                <ArrowDownwardIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    :
                    <></>
                }
                <Grid item xs={10}>
                    {focus ?
                        <Paper onClick={() => setFocus(true)}>
                            <CKEditor
                                editor={ClassicEditor}
                                data={props.block.content}
                                onChange={(event, editor) => {
                                    dispatch({ type: "MODIFY_CONTENT", payload: { index: props.index, content: editor.getData() } })
                                }}
                            /></Paper>
                        :
                        <EditorPreview data={props.block.content} onClick={() => setFocus(true)} />
                    }
                </Grid>
                {focus ?
                    <Grid item xs={1} className={classes.button_container}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <IconButton
                                id={`addBlockButton_${props.index}`}
                                onClick={(e) => {
                                    setCreateBlockOptionConfig({
                                        open: !createBlockOptionConfig.open,
                                        anchor: document.getElementById(`addBlockButton_${props.index}`),
                                        placement: 'right-start'
                                    })
                                }
                                }>
                                <AddIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => {

                                    fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${props.courseID}/block/${props.blockID}`, {
                                        method: "DELETE",
                                        credentials: "include"
                                    })
                                        .then(res => {
                                            dispatch({ type: "DELETE_BLOCK", payload: { index: props.index } })
                                        })
                                        .catch(e => console.log(e))
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
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
                                    }}>
                                    <MenuList>
                                        <MenuItem onClick={(e) => {
                                            fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${props.courseID}/block`, {
                                                method: "POST",
                                                credentials: "include"
                                            })
                                                .then(res => res.json())
                                                .then(res => {
                                                    //res = blockid
                                                    blocksID.splice(props.index + 1, 0, { title: "", id: res })
                                                    fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${props.courseID}/blockOrder`, {
                                                        method: "PUT",
                                                        credentials: "include",
                                                        body: JSON.stringify(blocksID),
                                                    })
                                                        .then(res => {
                                                            dispatch({ type: "ADD_NEW_BLOCK", payload: { index: props.index, blocksID } })
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
                                                dispatch({ type: "IMPORT_START", payload: { importFromIndex: props.index } })
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