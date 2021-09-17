import React from 'react'
import useState from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Accordion } from '@material-ui/core'
import { AccordionSummary, AccordionDetails } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { Tabs, Tab } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core'
import { useEffect } from 'react'
import { fetchSingleStudentInfo } from '../../actions/classroomPage'
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
    const dispatch = useDispatch()
    const quizes = useSelector(state => state.classroomPageReducer.quizList)
    const homeworks = useSelector(state => state.classroomPageReducer.homeworkList)
    const user = useSelector(state => state.loginReducer.user)
    const studentInfos = useSelector(state => state.classroomPageReducer.studentInfos)
    const classroomId = useSelector(state => state.classroomPageReducer.classroomID)
    const [homeworkScoreList, setHomeworkScoreList] = React.useState([])
    const [quizScoreList, setQuizScoreList] = React.useState([])
    const [tab, setTab] = React.useState(0)
    const [isAuthing, setIsAuthing] = React.useState(true)
    const [isLoadingScore, setIsLoadingScore] = React.useState(true)
    const classes = useStyles()
    useEffect(() => {
        if (typeof user.id !== 'undefined' && classroomId !== "") {
            setIsAuthing(false)
            dispatch(fetchSingleStudentInfo(user.id, classroomId))
        } else {
            setIsAuthing(true)
        }
    }, [user, classroomId])
    useEffect(() => {
        if (!isAuthing){
            if (studentInfos.hasOwnProperty(user.id)){
                var scoreRecord = studentInfos[user.id].scores
                scoreRecord.homeworkComponentScoreList.map(record => {
                    var score = 0
                    record.setScoreList.map(p => {
                        score += p.score == -1 ? 0 : p.score
                    })
                    setHomeworkScoreList(oldArray => [...oldArray, score])
                })
                scoreRecord.examComponentScoreList.map(record => {
                    var score = 0
                    record.setScoreList.map(p => {
                        score += p.score == -1 ? 0 : p.score
                    })
                    setQuizScoreList(quizScoreList.concat([score]))
                })
                setIsLoadingScore(false)
            } else {
                setIsLoadingScore(true)
            }
        }
    }, [studentInfos])
    var homeworkTiles = []
    var quizTiles = []
    if (!isLoadingScore) {
        homeworkTiles = homeworks.map((hw, i) => <div key={i} className={classes.tile}>
            <QuizTile user={user} quiz={hw} index={i} type="homework" isRecord={true} score={homeworkScoreList[i]}/>
        </div>)
        quizTiles = quizes.filter(hw => !hw.private).map((quiz, i) => <div key={i} className={classes.tile} isRecord>
            <QuizTile user={user} quiz={quiz} index={i} type="quiz" isRecord={true} score={quizScoreList[i]} />
        </div>)
    }
    return <div className={classes.root}>
        {isLoadingScore ? <CircularProgress /> : <div><Tabs
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
            </div> : <div className={classes.quizList}>
                {quizTiles}
            </div>}
        </div>
        }

    </div>

}
