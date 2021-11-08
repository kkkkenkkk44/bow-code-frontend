import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core'
import { useState } from 'react'
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress, IconButton } from '@material-ui/core'
import { Redirect } from "react-router"
import ImportProblemCard from './ImportProblemCard'
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
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'
import { fetchProblemListAsync, showProblemInfo, handleChangeKeyword, clickAllTags, changeTagsFilter } from '../actions/problemList'

export default function ImportBlockDialog(props) {

    const isImportingProblem = useSelector(state => state.courseEditorReducer.isImportingProblem)
    const importFromIndex = useSelector(state => state.courseEditorReducer.importFromIndex)
    const blocksID = Array.from(useSelector(state => state.courseEditorReducer.blocksID))
    const blocks = Array.from(useSelector(state => state.courseEditorReducer.blocks))
    const dispatch = useDispatch()
    const [importProblemID, setImportProblemID] = useState("")
    const name = useSelector(state => state.courseEditorReducer.name)

    const handleClose = () => {
        dispatch({ type: "IMPORT_PROBLEM_END" })
        console.log("close")
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            height: "calc(100vh - 180px)",
            margin: theme.spacing(5),
            overflow: "visible"
        },
        filter: {
            display: "flex",
        },
        difficultySlide: {
            flex: 1,
            maxWidth: theme.spacing(20),
            margin: "15px"
        },
        tags: {
            margin: "15px",
            marginLeft: "40px"
        },
        search: {
            flex: 2,
            maxWidth: theme.spacing(50),
            margin: "15px",
        },
        searchFont: {
            fontSize: '14pt'
        },
        problemAll: {
            display: 'flex',
            marginLeft: "20%",
            marginRight: "20%",
            justifyContent: 'center'
        },
        problemAllproblemList: {
            flex: 4,
            maxWidth: theme.spacing(120)
        },
        problemInfo: {
            flex: 3,
            marginLeft: theme.spacing(3)
        },
        problemTile: {

        }
    }));

    const classes = useStyles();
    
    const problemList = useSelector(state => state.problemListReducer.problemList);
    const isfetching = useSelector(state => state.problemListReducer.isfetching);
    const showingInfoProblem = useSelector(state => state.problemListReducer.showingInfoProblem);
    const difficultyRange = useSelector(state => state.problemListReducer.difficultyRange)
    const tagsCount = useSelector(state => state.problemListReducer.tagsCount)
    const checked = useSelector(state => state.problemListReducer.checked)
    const keyword = useSelector(state => state.problemListReducer.keyword)
    const history = useHistory();
    const { CourseID } = useParams()
    var problemBoard = []
    var tagList
    useEffect(() => {
        dispatch(fetchProblemListAsync())
    }, [])

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

    const [problemBlockTitle, setProblemBlockTitle] = useState("")
    const [focus, setFocus] = useState(false)
    
    const handleEnterSearch = (event) => {
        if(event.key === 'Enter') {
            filter = {
                "keyword": keyword.split(/[\s,]+/).filter((w) => w != "")
            }
            dispatch(fetchProblemListAsync(filter))
        }
    }

    const addNewProblemBlock = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/problem/${importProblemID}`, {
            method: 'GET',
            credentials: "include"
        })
            .then(res => res.json())
            .then(res => {
                const { name } = res
                console.log(name)
                //setProblemBlockTitle(name)
                var blockTitle = {
                    title: name
                }
                fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${CourseID}/block`, {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify(blockTitle),
                })
                    .then(res => res.json())
                    .then(res => {
                        //res = blockid
                        //console.log(problemBlockTitle)
                        blocksID.splice(props.index + 1, 0, { title: `題目：${name}`, id: importProblemID })
                        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${CourseID}/blockOrder`, {
                            method: "PUT",
                            credentials: "include",
                            body: JSON.stringify(blocksID),
                        })
                            .then(res => {
                                dispatch({ type: "ADD_NEW_PROBLEM_BLOCK", payload: { index: props.index, blocksID } })
                                setFocus(false)
                            })
                    })

            })
            
            .catch(e => {
                // error handle
                console.log(e)
            })
        
        handleClose()
    }

    return (
        <Dialog open={isImportingProblem} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg">
            <DialogTitle id="form-dialog-title">匯入題目</DialogTitle>
            <DialogContent>
                <div className={classes.search}>
                    <TextField
                        id="standard-full-width"
                        placeholder="搜尋單元"
                        fullWidth
                        onChange={(e) => dispatch(handleChangeKeyword(e.target.value))}
                        InputProps={{
                            classes: {
                                input: classes.searchFont,
                            },
                        }}
                    />
                </div>
                <div className={classes.problemAllproblemList}>
                        {isfetching ? <CircularProgress /> : problemBoard}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()} color="primary">
                    取消
                </Button>
                <Button
                    onClick={
                        //fetch
                        //console.log(importProblemID)
                        addNewProblemBlock
                        //dispatch({ type: "FETCH_COURSE_START" })
                    }
                    color="primary"
                >
                    確認
                </Button>
            </DialogActions>
        </Dialog>



    )
}