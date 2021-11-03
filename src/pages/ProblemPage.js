import NavBar from "../components/NavBar";
import Editor from "@monaco-editor/react";
import { CircularProgress, Divider, Grid, Typography, makeStyles, List, ListItem, Chip, Dialog, DialogContentText, DialogTitle, DialogContent, DialogActions, Select } from "@material-ui/core";
import SubmitBar from "../components/SubmitBar"
import { useDispatch, useSelector } from "react-redux";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import SubmissionListTile from "../components/SubmissionListTile";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { Button } from '@material-ui/core';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { getLanguageID } from '../constants'

export default function ProblemPage() {
    const useStyles = makeStyles((theme) => ({
        root: {
            height: "calc(100vh - 165px)",
            padding: theme.spacing(5),
            overflow: "visible"
        },
        root2: {
            padding: theme.spacing(3),
            overflow: "visible",
            width: "100%"
        },
        name: {
            flexGrow: 1
        },
        submitBar: {
            height: "10vh"
        },
        taglist: {
            padding: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
        tagChip: {
            margin: '3px'
        },
        languageSelector: {
            margin: theme.spacing(1),
            marginLeft: theme.spacing(3.5),
        },
        container: {
            display: "flex",
            flexDirection: "row",
            width: "100%"
        },
        submissionListRoot: {
            textAlign: 'center'
        },
        submissionListTile: {
            width: '75%',
            marginBottom: theme.spacing(2),
            display: 'inline-block'
        },
        difficulty: {
            display: "flex",
            justifyContent: "center"
        },
    }))
    const classes = useStyles()

    const { isFetchingSubmission, submissions, isFetching, name, description, defaultContent, difficulty } = useSelector(state => state.problemPageReducer)
    const [sourceCode, setSourceCode] = useState(defaultContent)

    const [codeTemplate, setCodeTemplate] = useState("")
    const [language, setLanguage] = useState("cpp")
    const [openSubmissions, setOpenSubmissions] = useState(false)
    const { ProblemID } = useParams()
    const { ClassroomID } = useParams()
    const isLogin = useSelector(state => state.loginReducer.isLogin)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: "FETCH_PROBLEM_START" })
        fetch(`${process.env.REACT_APP_BACKEND_URL}/problem/${ProblemID}`, {
            method: 'GET',
            credentials: "include"
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.defaultContent.length === 0){
                    setCodeTemplate("")
                }
                else{
                    setCodeTemplate(res.defaultContent[0].content)
                }
                dispatch({ type: "FETCH_PROBLEM_END", payload: res })
            })
    }, [])

    const difficultyStars = () => {
        var stars = []
        for (var i = 0; i < difficulty + 1; i++) {
            stars.push("s")
        }
        for (var i = 0; i < 2 - difficulty; i++) {
            stars.push("sb")
        }
        return stars
    }

    const TagList = () => {
        const tags = useSelector(state => state.problemPageReducer.tags)
        return (
            <div className={classes.taglist}>
                {tags.map(tag => {
                    return <Chip className={classes.tagChip} key={tag} label={tag} variant="outlined" />
                })}
            </div>
        )
    }

    const handleEditorChange = (value, event) => {
        setSourceCode(value)
    }

    const handleCloseSubmission = () => {
        setOpenSubmissions(false)
    }

    const handleCheckSubmission = () => {
        setOpenSubmissions(true)
        dispatch({ type: "FETCH_SUBMISSION_START" })
        fetch(`${process.env.REACT_APP_BACKEND_URL}/submit/user?pid=${ProblemID}`, {
            method: 'GET',
            credentials: "include"
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                dispatch({ type: "FETCH_SUBMISSION_END", payload: { submissions: res } })
            })
    }

    if (!isFetchingSubmission && submissions != null) {
        var submissionList = submissions.map((submission) =>
            <div key={submission.id} className={classes.submissionListTile}>
                <SubmissionListTile submission={submission} />
            </div>
        )
    }

    return (
        isFetching ?
            <CircularProgress />
            :
            <div>
                <NavBar context="Bow-Code" />
                <Grid container justify="center">
                    <Grid item xs={5}>
                        <div className={classes.rootHeight}>
                            <div className={classes.root}>
                                <Grid container alignItems="center">
                                    <Typography variant="h5" component="h2" className={classes.name}>
                                        {name}
                                    </Typography>
                                    <TagList />
                                    <div id="difficulty">
                                        <div className={classes.difficulty}>
                                            {difficulty === 0 ? "簡單" : difficulty === 1 ? "挑戰" : "專精"}
                                        </div>
                                        {difficultyStars().map((icon, index) => {
                                            if (icon === "sb") return <StarBorderIcon key={index} />
                                            if (icon === "s") return <StarIcon key={index} />
                                        })}
                                    </div>
                                </Grid>
                                <Divider />
                                <List>
                                    <ListItem>
                                        <Typography dangerouslySetInnerHTML={{ __html: description }}>
                                        </Typography>
                                    </ListItem>
                                </List>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={7}>
                        <div className={classes.container}>
                            <Divider orientation="vertical" flexItem />
                            <div className={classes.root2}>
                                <Select
                                    native
                                    autoWidth
                                    labelId="language"
                                    value={language}
                                    onChange={(e) => { setLanguage(e.target.value) }}
                                    className={classes.languageSelector}
                                >
                                    <option value={"cpp"}>C++</option>
                                    <option value={"c"}>C</option>
                                    <option value={"csp"}>C#</option>
                                    <option value={"python"}>Python</option>
                                </Select>
                                <Editor

                                    height="calc(100vh - 220px)"
                                    language={language}
                                    defaultValue={codeTemplate}
                                    onChange={handleEditorChange}
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <SubmitBar classroomID={ClassroomID} ProblemID={ProblemID} sourceCode={sourceCode} language={language} handleCheckSubmission={handleCheckSubmission} />
                <Dialog open={openSubmissions} onClose={handleCloseSubmission} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>
                    <DialogTitle id="form-dialog-title">submissions</DialogTitle>
                    <div className={classes.submissionListRoot}>
                        {
                            isFetchingSubmission ?
                                <CircularProgress /> :
                                submissionList
                        }
                    </div>
                </Dialog>
            </div>
    )
}