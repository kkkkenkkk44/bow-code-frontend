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
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function DeadlineSetter(props) {
    const { open, handleClose } = props
    const [date, changeDate] = React.useState(new Date());
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
        <div style={{
            marginTop: 'auto',
            marginRight: '20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        }}>
            <Button variant="contained" color="primary" onClick={() => { }}>變更</Button>
        </div>
    </Dialog>
}

export default function QuizTile(props) {
    const quiz = props.quiz
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
            opacity: `${quiz.public ? "100%" : "40%"}`
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
            width: `${quiz.score / quiz.total * 100}%`,
            zIndex: 9
        }
    }));
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const problemList = quiz.problems.map(problem => <ListItemLink className={classes.content} target="_blank" rel="noopener noreferrer" href={`/problem/${problem.problemId}`}>
        <ListItemText primary={problem.name} />
    </ListItemLink>)
    const remain = (new Date(quiz.deadline).getTime() - Date.now()) / 1000
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
                <Typography className={classes.title}>{quiz.title}</Typography>
                {isRecord && <Typography className={classes.score} variant="h5">{quiz.score}/{quiz.total}</Typography>}
                {isRecord && <div className={classes.gradingDisplay}></div>}
                <div className={classes.deadline}>
                    {due ? <Typography variant="subtitle1">{`已截止`}</Typography> :
                        <Typography className={classes.deadline} variant="subtitle1">{`剩下 ${remainText}`}</Typography>
                    }
                    {!isRecord && <IconButton onClick={() => { setOpen(true) }} style={{ maxHeight: '40px', maxWidth: '40px', zIndex: 20 }}><EventIcon></EventIcon></IconButton>}
                </div>
                <DeadlineSetter open={open} handleClose={() => { setOpen(false) }}></DeadlineSetter>
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
                                checked={quiz.public}
                                onChange={() => { }}
                                color="primary"
                            />
                            <Typography variant='subtitle2'>公開</Typography>
                        </div>
                        <div>
                            <Button variant="contained">作答結果</Button>
                        </div>
                    </div>
                </AccordionDetails>
            }

        </Accordion>
    </div>
}
