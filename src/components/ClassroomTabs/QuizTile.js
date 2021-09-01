import React from 'react'
import { Accordion, IconButton } from '@material-ui/core'
import { AccordionSummary, AccordionDetails } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
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
import { useDispatch, useSelector } from 'react-redux'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { changeDeadlineOfQuiz, publishQuiz } from '../../actions/classroomPage'

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function DeadlineSetter(props) {
    const { open, defaultDeadline, handleClose, handleConfirmChange } = props
    const [date, changeDate] = React.useState(defaultDeadline);
    return <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth={'80%'}>
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
                <Button variant="contained" color="primary" onClick={() => {handleConfirmChange(date); handleClose()}}>變更</Button>
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
        }
    }));
    const classes = useStyles()
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [expandPublishDialog, setExpandPublishDialog] = React.useState(false)
    const classroomID = useSelector(state => state.classroomPageReducer.classroomID)
    const onConfirmChange = (date) => { dispatch(changeDeadlineOfQuiz(quizType, quiz, date, classroomID, index)) }
    const problemList = quiz.component.setList.map(problem => <ListItemLink className={classes.content} target="_blank" rel="noopener noreferrer" href={`/problem/${problem.id}`}>
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
                    </List>
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
