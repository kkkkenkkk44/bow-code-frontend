import React from 'react'
import { Accordion, DialogContent, IconButton } from '@material-ui/core'
import { AccordionSummary, AccordionDetails } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core'
import { ListItem } from '@material-ui/core'
import ListItemText from '@material-ui/core/ListItemText';
import { Switch } from '@material-ui/core'
import { Button } from '@material-ui/core'
import EventIcon from '@material-ui/icons/Event';
import { DatePicker } from "@material-ui/pickers";
import { TimePicker } from "@material-ui/pickers";
import { Dialog } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import { DialogActions } from '@material-ui/core'
import { Zoom } from '@material-ui/core'
import { Card } from '@material-ui/core'
import { ProblemListContent } from '../../pages/ProblemListPage'
import { useDispatch, useSelector } from 'react-redux'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { addProblemsToQuiz, changeDeadlineOfQuiz, publishQuiz } from '../../actions/classroomPage'
import { resetPickedProblem } from '../../actions/problemList'

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function DeadlineSetter(props) {
    const { open, defaultDeadline, handleClose, handleConfirmChange } = props
    const [date, changeDate] = React.useState(defaultDeadline);
    return <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="lg">
        <DialogTitle id="simple-dialog-title">變更截止日期</DialogTitle>
        <div style={{ display: 'flex' }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <DatePicker
                    autoOk
                    variant="static"
                    openTo="date"
                    value={date}
                    onChange={changeDate}
                />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <TimePicker
                    autoOk
                    variant="static"
                    format="HH:mm:ss"
                    views={["hours", "minutes", "seconds"]}
                    openTo="hours"
                    value={date}
                    onChange={changeDate}
                />
            </MuiPickersUtilsProvider>
        </div>
        <DialogActions>
            <div style={{
                marginTop: 'auto',
                marginRight: '20px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
            }}>
                <Button variant="contained" color="primary" onClick={() => { handleConfirmChange(date); handleClose() }}>變更</Button>
            </div>
        </DialogActions>
    </Dialog>
}

export default function QuizTile(props) {
    const quiz = props.quiz
    const quizType = props.type
    const index = props.index
    const isRecord = props.isRecord
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            minHeight: '80px',
        },
        main: {
            display: 'flex',
            alignItems: 'center',
            height: '80px',
            opacity: `${!quiz.private ? "100%" : "40%"}`
        },
        title: {
            flex: `${isRecord ? 2 : 7}`,
            fontSize: theme.typography.pxToRem(22),
            fontWeight: theme.typography.fontWeightRegular,
            zIndex: 10
        },
        score: {
            flex: 5,
            zIndex: 10
        },
        deadline: {
            flex: 1,
            zIndex: 11,
            display: 'flex',
            alignItems: 'center'
        },
        problemList: {
            zIndex: 10
        },
        content: {
            flex: 1,
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
            zIndex: 10
        },
        actions: {
            display: 'flex',
            zIndex: 10,
            alignItems: 'center',
            '& > *': {
                marginRight: '25px'
            }
        },
        detail: {
            display: 'flex',
            flexDirection: 'column'
        },
        gradingDisplay: {
            backgroundColor: '#dcf3f7',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${isRecord ? quiz.score / quiz.totalScore * 100 : 0}%`,
            zIndex: 9
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
            maxHeight: '90%'
        },
        postButton: {
            marginTop: 'auto',
            marginRight: '20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
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
    }));
    const classes = useStyles()
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [expandPublishDialog, setExpandPublishDialog] = React.useState(false)
    const [showProblemPicker, setShowProblemPicker] = React.useState(false)
    const [showAddProblemDialog, setShowAddProblemDialog] = React.useState(false)
    const classroomID = useSelector(state => state.classroomPageReducer.classroomID)
    const pickedProblems = useSelector(state => state.problemListReducer.pickedProblems)
    const onConfirmChange = (date) => { dispatch(changeDeadlineOfQuiz(quizType, quiz, date, classroomID, index)) }
    const problemList = quiz.component.setList.map((problem, i) => <ListItemLink className={classes.content} key={i} target="_blank" rel="noopener noreferrer" href={`/problem/${problem.id}`}>
        <ListItemText primary={problem.name} />
    </ListItemLink>)
    const remain = (quiz.end - Date.now()) / 1000
    var remainText = ""
    var due = false
    if (remain < 0) {
        due = true
    } else if (remain < 60 * 60) {
        remainText = parseInt(remain / 60).toString() + " 分"
    } else if (remain < 60 * 60 * 24) {
        remainText = parseInt(remain / 60 / 60).toString() + " 時"
    } else {
        remainText = parseInt(remain / 60 / 60 / 24).toString() + " 天"
    }
    return <div className={classes.root}>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.main}
            >
                <Typography className={classes.title}>{quiz.component.name}</Typography>
                {isRecord && <Typography className={classes.score} variant="h5">{quiz.score}/{quiz.total}</Typography>}
                {isRecord && <div className={classes.gradingDisplay}></div>}
                <div className={classes.deadline}>
                    {due ? <Typography variant="subtitle1">{`已截止`}</Typography> :
                        <Typography className={classes.deadline} variant="subtitle1">{`剩下 ${remainText}`}</Typography>
                    }
                    {!isRecord && <IconButton onClick={() => { setOpen(true) }} style={{ maxHeight: '40px', maxWidth: '40px', zIndex: 20 }}><EventIcon></EventIcon></IconButton>}
                </div>
                <DeadlineSetter defaultDeadline={new Date(quiz.end)} open={open} handleClose={() => { setOpen(false) }} handleConfirmChange={onConfirmChange}></DeadlineSetter>
            </AccordionSummary>
            {isRecord ?
                <AccordionDetails className={classes.detail}>
                    <List className={classes.problemList}>
                        {problemList}
                    </List>
                    <div className={classes.gradingDisplay}></div>
                </AccordionDetails> : <AccordionDetails className={classes.detail}>
                    <List className={classes.problemList}>
                        {problemList}
                        <ListItemLink className={classes.content} onClick={() => setShowProblemPicker(true)}>
                            <AddIcon style={{ fontSize: '14pt', color: '#989898' }} />
                            <ListItemText primary={"追加題目"} />
                        </ListItemLink>
                    </List>
                    {showProblemPicker && <div className={classes.layer} onClick={() => setShowProblemPicker(false)}></div>}
                    <Zoom in={showProblemPicker}>
                        <Card className={classes.problemPicker}>
                            <div className={classes.problemList}>
                                <ProblemListContent isPicker={true} />
                            </div>
                            <div className={classes.postButton}>
                                <Button variant="contained" color="primary" size="large" onClick={() => { setShowAddProblemDialog(true) }}>
                                    追加
                                </Button>
                                <Dialog
                                    open={showAddProblemDialog}
                                    onClose={() => setShowAddProblemDialog(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{`確定要將追加以下題目嗎?`}</DialogTitle>
                                    <DialogContent>
                                        {pickedProblems.map(problem => <Typography variant="subtitle2">{problem.name}</Typography>)}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => { setShowAddProblemDialog(false) }} color="primary">
                                            取消
                                        </Button>
                                        <Button onClick={() => { dispatch(addProblemsToQuiz(quizType, quiz, pickedProblems, classroomID, index)); dispatch(resetPickedProblem()); setShowProblemPicker(false); setShowAddProblemDialog(false) }} variant="contained" color="primary" autoFocus>
                                            確定
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>

                        </Card>
                    </Zoom>
                    <div className={classes.actions}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Switch
                                checked={!quiz.private}
                                onClick={() => setExpandPublishDialog(true)}

                                color="primary"
                            />
                            <Typography variant='subtitle2'>公開</Typography>
                        </div>
                        <div>
                            <Button variant="contained">作答結果</Button>
                        </div>
                    </div>
                    <Dialog
                        open={expandPublishDialog}
                        onClose={() => setExpandPublishDialog(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{`確定要將 ${quiz.component.name} 設為${quiz.private ? "公開" : "不公開"}嗎?`}</DialogTitle>
                        <DialogActions>
                            <Button onClick={() => setExpandPublishDialog(false)} color="primary">
                                取消
                            </Button>
                            <Button onClick={() => { dispatch(publishQuiz(quizType, quiz, classroomID, index)); setExpandPublishDialog(false) }} variant="contained" color="primary" autoFocus>
                                確定
                            </Button>
                        </DialogActions>
                    </Dialog>
                </AccordionDetails>
            }

        </Accordion>
    </div>
}
