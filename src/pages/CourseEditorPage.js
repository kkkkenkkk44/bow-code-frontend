import React from 'react'
import NavBar from "../components/NavBar"
import { Card, CardActionArea, Typography, makeStyles, IconButton, Tooltip, Zoom, Dialog, DialogTitle, TextField, DialogContent, DialogActions, Button } from "@material-ui/core"
import ImportBlockDialog from '../components/ImportBlockDialog'
import ImportProblemBlockDialog from '../components/ImportProblemBlockDialog'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { fetchCourseDetail, postBlock, blockUp, blockDown, deleteBlock } from '../actions/courseEditorPage'
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'
import CourseInfoBar from '../components/CourseInfoBar'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-build-classic-bow-code'
import EditIcon from '@material-ui/icons/Edit';
import AddBlockDialog from '../components/AddBlockDialog'
import EditBlockTitleDialog from '../components/EditBlockTitleDialog'
import { FormatColorReset } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        height: theme.spacing(1),
    },
    info: {
        flex: 1,
        height: "calc(100vh - 60px)",
        overflowY: 'auto'
    },
    content: {
        flex: 4,
        height: "calc(100vh - 60px)",
        overflowY: 'auto',
    },
    blockcard: {
        height: '60px',
        display: 'flex',
        alignItems: 'center'
    },
    addcard: {
        height: '40px',
        display: 'flex',
        alignItems: 'center'
    },
    name: {
        marginLeft: '20px'
    },
    editor: {
        margin: '40px'
    },
    title: {
        margin: '40px',
        display: "flex",
        alignItems: "center"
    }
}))

export default function CourseEditorPage(props) {

    const classes = useStyles()
    const dispatch = useDispatch()
    const { CourseID } = useParams()
    const { isFetching, blocks, blocksID, creator, name, abstract, isMoving } = useSelector(state => state.courseEditorReducer)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [currentData, setCurrentData] = useState("")
    const [comfirmDeleting, setComfirmDeleting] = useState(false)

    useEffect(() => {
        dispatch(fetchCourseDetail(CourseID))
    }, [])

    const changeIndex = (index) => {
        setCurrentIndex(index)
    }

    const handleBlockUp = () => {
        if (currentIndex > 0) {
            console.log("up")
            dispatch(blockUp(CourseID, currentIndex, blocksID))
            setCurrentIndex(currentIndex - 1)
        }
    }

    const handleBlockDown = () => {
        if (currentIndex !== -1 && currentIndex !== blocksID.length - 1) {
            console.log("down")
            dispatch(blockDown(CourseID, currentIndex, blocksID))
            setCurrentIndex(currentIndex + 1)
        }
    }

    const handleDeleteBlock = () => {
        if (currentIndex !== -1) {
            console.log("delete")
            dispatch(deleteBlock(CourseID, currentIndex, blocksID))
            setCurrentIndex(-1)
            handleCloseComfirmDeleting()
        }
    }

    const handleCloseComfirmDeleting = () => {
        setComfirmDeleting(false)
    }

    function BlockList() {
        var cardList = []
        cardList = blocks.map((value, index) =>
            <Card className={classes.blockcard} square key={value.id}>
                <CardActionArea style={{ height: '100%' }} onClick={() => changeIndex(index)}>
                    <Typography variant="subtitle1" className={classes.name}>
                        {value.title}
                    </Typography>
                </CardActionArea>
                {
                    currentIndex === index ?
                        <>
                            <Tooltip title="向上移動" TransitionComponent={Zoom}>
                                <IconButton onClick={e => handleBlockUp()}>
                                    <ArrowUpwardIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="向下移動" TransitionComponent={Zoom}>
                                <IconButton onClick={e => handleBlockDown()}>
                                    <ArrowDownwardIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="刪除課程方塊" TransitionComponent={Zoom}>
                                <IconButton onClick={e => setComfirmDeleting(true)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                        :
                        <></>
                }
            </Card>
        )
        return (
            <div>
                {cardList}
            </div>
        )
    }

    const BlockEditorList = () => {
        var EditorList = []
        blocks.forEach((block, index) => {
            EditorList.push(
                <CKEditor
                    config={{
                        extraPlugins: []
                    }}
                    editor={ClassicEditor}
                    data={block.content}
                    onChange={(event, editor) => {
                        console.log(event, index, editor.getData())
                        console.log(editor)
                        dispatch(postBlock(CourseID, block.id, editor.getData(), index))
                        // dispatch({ type: "MODIFY_CONTENT", payload: { index: index, content: editor.getData() } })
                    }}
                    key={block.id}
                />)
        })
        return EditorList
    }

    return (
        <div>
            <NavBar context="Bow-Code" />
            {
                isFetching ? null :
                    <div className={classes.root}>
                        <Card className={classes.info}>
                            <CourseInfoBar context={name} abstract={abstract} creator={creator} forEditor />
                            {BlockList()}
                            <Card className={classes.addcard}>
                                <Tooltip title="新增單元方塊" TransitionComponent={Zoom}>
                                    <CardActionArea style={{ height: '100%' }} onClick={e => dispatch({ type: "START_ADDING_NEW_BLOCK" })}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <AddIcon />
                                        </div>
                                    </CardActionArea>
                                </Tooltip>
                            </Card>
                        </Card>
                        {currentIndex === -1 || isMoving ?
                            <div className={classes.content}></div>
                            :
                            <div className={classes.content}>
                                <div className={classes.title}>
                                    <div>
                                        <Tooltip title="編輯標題" TransitionComponent={Zoom}>
                                            <IconButton onClick={e => { dispatch({ type: "START_EDITING_TITLE" }) }}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <Typography variant="h2">
                                        {blocks[currentIndex].title}
                                    </Typography>
                                </div>
                                <div className={classes.editor}>
                                    {BlockEditorList()[currentIndex]}
                                </div>
                            </div>
                        }
                    </div>
            }
            <Dialog open={comfirmDeleting} onClose={handleCloseComfirmDeleting} aria-labelledby="form-dialog-title" maxWidth="lg">
                <DialogTitle id="form-dialog-title">確定要刪除此方塊？</DialogTitle>
                <DialogActions>
                    <Button onClick={() => {
                        handleCloseComfirmDeleting()
                    }}>
                        取消
                    </Button>
                    <Button onClick={() => {
                        handleDeleteBlock()
                    }}>
                        確定
                    </Button>
                </DialogActions>
            </Dialog>
            <EditBlockTitleDialog courseID={props.match.params.CourseID} currentIndex={currentIndex} />
            <AddBlockDialog courseID={props.match.params.CourseID} setCurrentIndex={setCurrentIndex} />
            <ImportBlockDialog CourseID={props.match.params.CourseID} />
            {/* <ImportProblemBlockDialog ProblemID={props.match.params.ProblemID} /> */}
        </div>
    )
}