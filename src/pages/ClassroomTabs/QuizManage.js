import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import QuizTile from '../../components/ClassroomTabs/QuizTile'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
        }
    }));
    const mockQuiz = {
        title: "Sample quiz",
        score: 30,
        total: 100,
        public: false,
        deadline: "2021-08-25T23:59:59",
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
    const mockQuiz2 = {
        title: "Sample quiz 2",
        score: 60,
        total: 100,
        public: true,
        deadline: "2021-08-23T23:59:59",
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
        <Fab color="primary" className={classes.fab}>
            <AddIcon />
        </Fab>
        <div className={classes.quizList}>
            <div className={classes.tile}>
                <QuizTile quiz={mockQuiz}></QuizTile>
            </div>
            <div className={classes.tile}>
                <QuizTile quiz={mockQuiz2}></QuizTile>
            </div>
            <div className={classes.tile}>
                <QuizTile quiz={mockQuiz}></QuizTile>
            </div>
            <div className={classes.tile}>
                <QuizTile quiz={mockQuiz}></QuizTile>
            </div>
            <div className={classes.tile}>
                <QuizTile quiz={mockQuiz2}></QuizTile>
            </div>
            <div className={classes.tile}>
                <QuizTile quiz={mockQuiz}></QuizTile>
            </div>
            <div className={classes.tile}>
                <QuizTile quiz={mockQuiz}></QuizTile>
            </div>
            <div className={classes.tile}>
                <QuizTile quiz={mockQuiz2}></QuizTile>
            </div>
            <div className={classes.tile}>
                <QuizTile quiz={mockQuiz}></QuizTile>
            </div>
            <div className={classes.tile}>
                <QuizTile quiz={mockQuiz}></QuizTile>
            </div>
            <div className={classes.tile}>
                <QuizTile quiz={mockQuiz2}></QuizTile>
            </div>
            <div className={classes.tile}>
                <QuizTile quiz={mockQuiz}></QuizTile>
            </div>
        </div>
    </div>
}
