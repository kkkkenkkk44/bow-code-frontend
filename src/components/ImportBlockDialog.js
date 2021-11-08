import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core'
import { useState } from 'react'
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress, IconButton } from '@material-ui/core'
import { Redirect } from "react-router"
import ImportCourseCard from '../components/ImportCourseCard'
import { Typography } from '@material-ui/core'
import { ListItem } from '@material-ui/core'
import { List } from '@material-ui/core'
import { Select } from '@material-ui/core'
import { FormGroup } from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'
import { Divider } from '@material-ui/core'
import { InputAdornment } from '@material-ui/core'
import { Slider } from '@material-ui/core'
import { Checkbox } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { fetchCourseListAsync, changeDifficulty, changeCategory, changeTagsFilter, clickAllTags, handleChangeKeyword } from '../actions/courseList'

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
    }));

    const classes = useStyles();
    const courseList = useSelector(state => state.courseListReducer.courseList);
    const tagsCount = useSelector(state => state.courseListReducer.tagsCount);
    const isfetching = useSelector(state => state.courseListReducer.isfetching);
    const difficultyRange = useSelector(state => state.courseListReducer.difficultyRange);
    const category = useSelector(state => state.courseListReducer.category);
    const checked = useSelector(state => state.courseListReducer.checked);
    const allChecked = useSelector(state => state.courseListReducer.allChecked);
    const keyword = useSelector(state => state.courseListReducer.keyword)
    var cardList = []
    var tagList = []
    useEffect(() => {
        dispatch(fetchCourseListAsync())
    }, [])


    function filter(course) {
        if (course.difficulty > difficultyRange[1] || course.difficulty < difficultyRange[0]) {
            return false
        }
        if (category != "all" && course.category != category) {
            return false
        }
        if (course.tags == null) {
            return false
        }
        if (!allChecked) {
            if (course.tags.length == 0) {
                return false
            }
            for (var i = 0; i < course.tags.length; i++) {
                if (checked[course.tags[i]]) {
                    break
                }
                if (i == course.tags.length - 1) {
                    return false
                }
            }
        }
        return true
    }


    if (!isfetching) {
        cardList = courseList.map((course) =>
            <div key={course.id} className={classes.courseCard}>
                <ImportCourseCard course={course} setImportCourseID={setImportCourseID} />
            </div>
        )
    }

    const handleEnterSearch = (event) => {
        if (event.key === 'Enter') {
            filter = {
                "keyword": keyword.split(/[\s,]+/).filter((w) => w != "")
            }
            dispatch(fetchCourseListAsync(filter))
        }
    }

    return (
        <Dialog open={isImporting} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg">
            <DialogTitle id="form-dialog-title">匯入單元</DialogTitle>
            <DialogContent>
                <TextField
                    id="standard-full-width"
                    placeholder="搜尋單元"
                    fullWidth
                    onChange={(e) => dispatch(handleChangeKeyword(e.target.value))}
                    onKeyDown={handleEnterSearch}
                    InputProps={{
                        classes: {
                            input: classes.searchFont,
                        },
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={() => {
                                filter = {
                                    "keyword": keyword.split(/[\s,]+/).filter((w) => w != "")
                                }
                                dispatch(fetchCourseListAsync(filter))
                            }}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>,
                    }}
                />
                <div className={classes.courseAllCourseList}>
                    {isfetching ? <CircularProgress /> : cardList}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()} color="primary">
                    取消
                </Button>
                <Button
                    onClick={() => {
                        handleClose()
                        //fetch
                        console.log(importCourseID)
                        dispatch({ type: "FETCH_COURSE_START" })
                        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${importCourseID}`, {
                            method: 'GET',
                            credentials: "include"
                        })
                            .then(res => res.json())
                            .then(res => {
                                const { abstract, blockList } = res
                                var myHeaders = new Headers();
                                myHeaders.append('pragma', 'no-cache');
                                myHeaders.append('cache-control', 'no-cache');
                                Promise.all(blockList.map(block => {
                                    return fetch(`${process.env.REACT_APP_FILE_SERVER_URL}/files/course/${importCourseID}/block/${block.id}/`, {
                                        method: "GET",
                                        credentials: "include",
                                        headers: myHeaders
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
                                                            credentials: "include",
                                                            body: JSON.stringify({ title: blockList[i].title })

                                                        })
                                                            .then(res => res.json())
                                                    newBlocksID.push({ title: blockList[i].title, id: newBlockID })
                                                    newBlocks.push({ content: res[i], id: newBlockID })
                                                    //舊的 course: importCourseID, block: blockList[i].id
                                                    //新的 course: props.CourseID, block: newBlockID
                                                    await fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${props.CourseID}/block/${newBlockID}`, {
                                                        method: "PUT",
                                                        credentials: "include",
                                                        body: res[i],
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