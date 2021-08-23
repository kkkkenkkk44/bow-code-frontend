import React from 'react'
import { Accordion } from '@material-ui/core'
import { AccordionSummary, AccordionDetails } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

function QuizTile(props) {
    const quiz = props.quiz
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            minHeight: '80px'
        },
        main: {
            display: 'flex',
            alignItems: 'center',
            height: '80px'
        },
        title: {
            flex: 2,
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
            zIndex: 10
        },
        problemList: {
            zIndex: 10
        },
        content: {
            flex: 1,
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
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
    const problemList = quiz.problems.map(problem => <Typography className={classes.content}>
        <Link to={`/problem/${problem.problemId}`} target="_blank" rel="noopener noreferrer">{problem.name}</Link>
    </Typography>)
    const remain = (new Date(quiz.deadline).getTime() - Date.now())/1000
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
                    <Typography className={classes.score} variant="h5">{quiz.score}/{quiz.total}</Typography>
                    <Typography className={classes.deadline} variant="subtitle1">{`剩下 ${remainText}`}</Typography>
                    <div className={classes.gradingDisplay}></div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.problemList}>
                        {problemList}
                    </div>
                    <div className={classes.gradingDisplay}></div>
                </AccordionDetails>
            </Accordion>
        </div>
}

export default function Quiz() {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            minHeight: '80px'
        },
        tile: {
            margin: '15px',
            marginLeft: '15%',
            marginRight: '15%'
        }
    }));
    const mockQuiz = {
        title: "Sample quiz",
        score: 30,
        total: 100,
        deadline: "2021-08-25T23:59:59",
        problems: [
            {
                name: "考題",
                score: 15,
                total: 40,
                problemId: "611e5ee3979cfa842197499a",
            },
            {
                name: "考題二",
                score: 15,
                total: 60,
                problemId: "611e5f32979cfa842197499b",
            }
        ]
    }
    const classes = useStyles()
    return <div className={classes.root}>
        <div className={classes.tile}>
            <QuizTile quiz={mockQuiz}></QuizTile>
        </div>
        <div className={classes.tile}>
            <QuizTile quiz={mockQuiz}></QuizTile>
        </div>
        <div className={classes.tile}>
            <QuizTile quiz={mockQuiz}></QuizTile>
        </div>
    </div>
}
