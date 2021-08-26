import React from 'react'
import { Accordion } from '@material-ui/core'
import { AccordionSummary, AccordionDetails } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import QuizTile from '../../components/ClassroomTabs/QuizTile'

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
        public: true,
        problems: [
            {
                name: "考題",
                score: 40,
                total: 40,
                problemId: "60fc25e0dc40d09a9a0b0a40",
            },
            {
                name: "考題二",
                score: 20,
                total: 60,
                problemId: "6103623ffc77e001dde59406",
            }
        ]
    }
    const classes = useStyles()
    return <div className={classes.root}>
        <div className={classes.tile}>
            <QuizTile quiz={mockQuiz} isRecord></QuizTile>
        </div>
        <div className={classes.tile}>
            <QuizTile quiz={mockQuiz} isRecord></QuizTile>
        </div>
        <div className={classes.tile}>
            <QuizTile quiz={mockQuiz} isRecord></QuizTile>
        </div>
    </div>
}
