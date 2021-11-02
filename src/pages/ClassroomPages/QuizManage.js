import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import QuizTile from '../../components/ClassroomTabs/QuizTile'
import { useDispatch } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import { TextField, Typography, Zoom } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import { FormControlLabel } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { ListItemSecondaryAction } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Button } from '@material-ui/core';
import { Tabs, Tab } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useSelector } from 'react-redux';
import { ProblemListContent } from '../ProblemListPage'
import { problemPicker, resetPickedProblem } from '../../actions/problemList';
import { createQuizAsync } from '../../actions/classroomPage';


function PickedProblemTile(props) {
    const index = props.index
    const problem = props.problem
    const dispatch = useDispatch()

    return (
        <div>
            <ListItem style={{
                flex: 1,
                backgroundColor: '#f0f0f0',
                marginBottom: '5px'
            }}>
                <ListItemText primary={problem.name} />
                <TextField
                    style={{ maxWidth: '60px' }}
                    value={100}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">分</InputAdornment>,
                    }}></TextField>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => { dispatch(problemPicker(problem)) }}>
                        <ClearIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </div>
    );
}

export default function QuizManage() {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            height: "calc(100vh - 60px)",
            position: 'relative',
            overflow: 'hidden'
        },
        tile: {
            margin: '15px',
            marginLeft: '15%',
            marginRight: '15%'
        },
        fab: {
            position: 'absolute',
            left: '30px',
            top: '30px'
        },
        quizList: {
            height: '100%',
            overflow: 'scroll'
        },
        layer: {
            backgroundColor: "#000000",
            opacity: 0.5,
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            zIndex: 99
        },
        expandedCard: {
            position: 'fixed',
            top: 0,
            left: 0,
            height: '80vh',
            width: '80vh',
            marginLeft: "calc(50vw - 40vh)",
            marginTop: '10vh',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column'
        },
        problemPicker: {
            position: 'fixed',
            top: 0,
            left: 0,
            height: '85vh',
            width: '80vw',
            marginLeft: "calc(50vw - 40vw)",
            marginTop: '7.5vh',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column'
        },
        problemList: {
            maxHeight: '90%',
            overflowY: 'auto'
        },
        expandedTitle: {
            margin: '20px'
        },
        postButton: {
            marginTop: 'auto',
            marginRight: '20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        form: {
            marginLeft: '15%',
            marginRight: '15%'
        },
    }));
    const dispatch = useDispatch()
    const quizes = useSelector(state => state.classroomPageReducer.quizList)
    const homeworks = useSelector(state => state.classroomPageReducer.homeworkList)
    const pickedProblems = useSelector(state => state.problemListReducer.pickedProblems)
    const classroomID = useSelector(state => state.classroomPageReducer.classroomID)
    const [createQuizExpanded, setCreateQuizExpanded] = useState(false)
    const [scoreDetailExpanded, setScoreDetailExpanded] = useState(false)
    const [showProblemPicker, setShowProblemPicker] = useState(false)
    var defaultDeadline = new Date(Date.now())
    defaultDeadline.setHours(23)
    defaultDeadline.setMinutes(59)
    defaultDeadline.setSeconds(59)
    const [selectedDate, setSelectedDate] = React.useState(defaultDeadline);
    const [problemType, setProblemType] = React.useState('homework');
    const [title, setTitle] = React.useState("")
    const [tab, setTab] = React.useState(0)
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleProblemTypeChange = (event) => {
        setProblemType(event.target.value);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const classes = useStyles()
    const homeworkTiles = homeworks.map((hw, i) => <div key={i} className={classes.tile}>
        <QuizTile quiz={hw} index={i} type="homework" />
    </div>)
    const quizTiles = quizes.map((quiz, i) => <div key={i} className={classes.tile}>
        <QuizTile quiz={quiz} index={i} type="quiz" />
    </div>)
    const pickedProblemTiles = pickedProblems.map((problem, i) => <PickedProblemTile problem={problem} index={i}></PickedProblemTile>)
    return <div className={classes.root}>
        <Fab color="primary" className={classes.fab} onClick={() => { setCreateQuizExpanded(true) }}>
            <AddIcon />
        </Fab>
        {(createQuizExpanded || scoreDetailExpanded) && <div className={classes.layer} onClick={() => setCreateQuizExpanded(false) && setScoreDetailExpanded(false)}></div>}
        <Zoom in={createQuizExpanded}>
            <Card className={classes.expandedCard}>
                <div className={classes.expandedTitle}>
                    <Typography variant='h5'>建立考試與作業</Typography>
                </div>
                <div className={classes.form}>
                    <div>
                        <FormLabel component="legend">類型</FormLabel>
                        <RadioGroup row aria-label="position" name="position" value={problemType} onChange={handleProblemTypeChange}>
                            <FormControlLabel
                                value="homework"
                                control={<Radio color="primary" />}
                                label="作業"
                            />
                            <FormControlLabel
                                value="quiz"
                                control={<Radio color="primary" />}
                                label="考試"
                            />
                        </RadioGroup>
                    </div>
                    <TextField
                        fullWidth
                        label={"標題"}
                        onChange={handleTitleChange}
                    ></TextField>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy/MM/dd"
                            margin="normal"
                            id="date-picker-inline"
                            label="截止日期"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="截止時間"
                            format="HH:mm:ss"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <Button variant="contained" onClick={() => { setShowProblemPicker(true) }}>
                        匯入題目
                    </Button>
                    <List>
                        {pickedProblemTiles}
                    </List>
                    <Zoom in={showProblemPicker}>
                        <Card className={classes.problemPicker}>
                            <div className={classes.problemList}>
                                <ProblemListContent isPicker={true} />
                            </div>
                            <div className={classes.postButton}>
                                <Button variant="contained" color="primary" size="large" onClick={() => { setShowProblemPicker(false); }}>
                                    完成
                                </Button>
                            </div>

                        </Card>
                    </Zoom>
                </div>
                <div className={classes.postButton}>
                    <Button variant="contained" color="primary" size="large" onClick={() => {dispatch(createQuizAsync(problemType, title, selectedDate, pickedProblems, classroomID)) ; setCreateQuizExpanded(false);  dispatch(resetPickedProblem())}}>
                        發布
                    </Button>
                </div>
            </Card>
        </Zoom>
        <Tabs
            value={tab}
            onChange={(e, value) => setTab(value)}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="作業" />
            <Tab label="考試" />
        </Tabs>
        {tab == 0 ? <div className={classes.quizList}>
            {homeworkTiles}
        </div>: <div className={classes.quizList}>
            {quizTiles}
        </div>}
        
    </div>
}
