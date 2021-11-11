import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-build-classic-bow-code'
import { DialogTitle } from '@material-ui/core'
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { Grid, Popper, Paper, MenuList, MenuItem, ClickAwayListener, makeStyles, IconButton, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { CircularProgress } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ImportProblemCard from './ImportProblemCard'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'
import { fetchProblemListAsync, showProblemInfo, handleChangeKeyword, clickAllTags, changeTagsFilter } from '../actions/problemList'
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

    const problemList = useSelector(state => state.problemListReducer.problemList);
    const isfetching = useSelector(state => state.problemListReducer.isfetching);
    const showingInfoProblem = useSelector(state => state.problemListReducer.showingInfoProblem);
    const difficultyRange = useSelector(state => state.problemListReducer.difficultyRange)
    const tagsCount = useSelector(state => state.problemListReducer.tagsCount)
    const checked = useSelector(state => state.problemListReducer.checked)
    const keyword = useSelector(state => state.problemListReducer.keyword)

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
                blocksID.splice(props.index + 1, 0, { type: "course", title: courseBlockTitle, id: res })
                fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${props.courseID}/blockOrder`, {
                    method: "PUT",
                    credentials: "include",
                    body: JSON.stringify(blocksID),
                })
                    .then(res => {
                        //console.log(res)
                        dispatch({ type: "ADD_NEW_BLOCK", payload: { index: props.index, blocksID } })
                        setFocus(false)
                    })
            })
        handleClose()
    }

    const [openProblemDialog, setOpenProblemDialog] = useState(false)

    const handleOpenAndFetchProblem = () => {
        setOpenProblemDialog(true)

    }
    const handleProblemDialogClose = () => {
        setOpenProblemDialog(false);
      };
    const [importProblemID, setImportProblemID] = useState("")

    const history = useHistory();
    const { CourseID } = useParams()
    var problemBoard = []
    var tagList

    function filter(problem) {
        if (problem.difficulty > difficultyRange[1] || problem.difficulty < difficultyRange[0]) {
            return false
        }
        if (keyword != "") {
            var keys = keyword.split(/[\s,]+/).filter((w) => w != "")
            for (var i = 0; i < keys.length; i++) {
                if (problem.name.toLowerCase().includes(keys[i].toLowerCase()) || problem.description.toLowerCase().includes(keys[i].toLowerCase())) {
                    break;
                }
                if (i == keys.length - 1) {
                    console.log("Failed keyword")
                    return false
                }
            }
        }
        return true
    }

    if (!isfetching) {
        problemBoard = problemList.map((problem) =>
            filter(problem) ?
            <div key={problem.id} className={classes.problemTile} >
                <ImportProblemCard problem={problem} setImportProblemID={setImportProblemID}/>
            </div>
            : null
        )
    }

    //const ImgurUploader = ImgurUploaderInit({clientID: `${process.env.REACT_APP_IMGUR_CLIENT_ID}`})

    useEffect(() => {
        dispatch(fetchProblemListAsync())
    }, [])

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
                    <Paper onClick={() => setFocus(true)}>
                        <CKEditor
                            config={{
                                extraPlugins: []
                            }}
                            editor={ClassicEditor}
                            data={props.block.content}
                            onChange={(event, editor) => {
                                dispatch({ type: "MODIFY_CONTENT", payload: { index: props.index, content: editor.getData() } })
                            }}
                        />                        
                    </Paper>
                </Grid>
                {focus ?
                    <Grid item xs={1} className={classes.button_container}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <Tooltip title="新增">
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
                            </Tooltip>
                            <Tooltip title="刪除方塊">
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
                            </Tooltip>
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
                                    <MenuItem onClick={() => {
                                            handleOpenTitleDialog()
                                        }}>
                                            新增文字
                                        </MenuItem>
                                        <Dialog open={openBlockTitleDialog} onClose={handleCloseTitleDialog} aria-labelledby="form-dialog-title">
                                            <DialogContent>
                                            <DialogContentText>
                                                請輸入單元方塊的標題
                                            </DialogContentText>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="title"
                                                label="單元方塊標題"
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
                                                dispatch({ type: "IMPORT_START", payload: { importFromIndex: props.index } })
                                            }}
                                        >
                                            匯入文字
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                console.log("open problem dialog")
                                                dispatch({ type: "IMPORT_PROBLEM_START", payload: { importFromIndex: props.index } })
                                            }}
                                        >
                                            匯入題目
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