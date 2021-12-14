import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from "../actions/login"
import { withStyles } from '@material-ui/core';

import Overview from './UserPages/Overview'
import BulletinBoard from './ClassroomPages/BulletinBoard';
import Student from './ClassroomPages/Student'
import Quiz from './ClassroomPages/Quiz'
import QuizManage from './ClassroomPages/QuizManage'
import { fetchClassroomAsync, switchTo } from '../actions/classroomPage';
import Divider from '@material-ui/core/Divider';
import ViewCourse from './ClassroomPages/ViewCourse'
// import ClassroomConfig from './ClassroomPages/ClassroomConfig'
import ProblemSubmission from './UserPages/ProblemSubmission';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';
import SchoolIcon from '@material-ui/icons/School';
import SettingsIcon from '@material-ui/icons/Settings';
import HistoryIcon from '@material-ui/icons/History';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LinkIcon from '@material-ui/icons/Link';
import ForumIcon from '@material-ui/icons/Forum';
import DescriptionIcon from '@material-ui/icons/Description';
import Badge from '@material-ui/core/Badge';
import { useParams } from 'react-router-dom';
import ApplicationTab from './ClassroomPages/ApplicationTab';

function MainWindow(props) {
    const currentTab = useSelector(state => state.classroomPageReducer.currentTab)
    const isCreator = props.isCreator
    return (
        <div>
            <div hidden={currentTab !== "bulletinBoard"}>
                <BulletinBoard />
            </div>
            <div hidden={currentTab !== "student"}>
                { <Student />}
            </div>
            <div hidden={currentTab !== "quiz"}>
                {!isCreator && <Quiz />}
            </div>
            <div hidden={currentTab !== "quizManage"}>
                {isCreator && <QuizManage />}
            </div>
            <div hidden={currentTab !== "viewcourse"}>
                <ViewCourse />
            </div>
            <div hidden={currentTab !== "application"}>
                <ApplicationTab />
            </div>
            {/* <div hidden={currentTab !== "config"}>
                <ClassroomConfig />
            </div> */}
        </div>
    )
}

const StyledBadge = withStyles((theme) => ({
    badge: {
        verticalAlign: 'center',
        left: '50px',
        top: '13px',
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

export default function ClassroomManagerPage(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            height: "calc(100vh - 60px)",
        },
        userInfo: {
            width: "300px",
            zIndex: 2
        },
        main: {
            flex: 1,
            overflowX: "hidden",
            overflowY: "scroll"
        },
        courseList: {
            margin: theme.spacing(5),
            height: theme.spacing(30)
        },
        avatar: {
            marginTop: "30px",
            width: "200px",
            height: "200px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
        },
        userName: {
            margin: "30px",
            textAlign: 'center'
        },
        listItem: {
            paddingLeft: "30px",
            paddingRight: "30px"
        },
        classroomTitle: {
            textAlign: 'center',
            margin: '20px'
        }
    }));
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.loginReducer.user)
    const authFinish = useSelector(state => state.loginReducer.authFinish)
    const applicants = useSelector(state => state.classroomPageReducer.applicants)
    const isFetching = useSelector(state => state.classroomPageReducer.isFetching)
    const classroom = useSelector(state => state.classroomPageReducer)
    const isCreator = useSelector(state => state.classroomPageReducer.userIsCreator)
    const { ClassroomID } = useParams()

    useEffect(() => {
        dispatch(auth())
        dispatch(fetchClassroomAsync(ClassroomID))
    }, [])
    return (
        <div>
            <NavBar context="CoDAI 教室" />
            {isFetching ? <CircularProgress /> : <div className={classes.root}>
                <Paper className={classes.userInfo} square elevation={4}>
                    <Typography variant="h4" className={classes.classroomTitle}>
                        {classroom.name}
                    </Typography>
                    <Divider style={{marginLeft: '20px', marginRight: '20px'}} />
                    <List>
                        <ListItem className={classes.listItem} button onClick={() => dispatch(switchTo("viewcourse"))}>
                            <ListItemIcon>
                                <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText primary="單元內容" />
                        </ListItem>
                        {isCreator && <ListItem className={classes.listItem} button onClick={() => dispatch(switchTo("application"))}>
                            <ListItemIcon>
                                <LinkIcon />
                            </ListItemIcon>
                            <ListItemText primary="申請連結" />
                        </ListItem>}
                        <ListItem className={classes.listItem} button onClick={() => dispatch(switchTo("student"))}>
                            <ListItemIcon>
                                <FaceIcon />
                            </ListItemIcon>
                            <ListItemText primary={<StyledBadge badgeContent={applicants.length} color="secondary">學生名單與成績</StyledBadge>} />
                        </ListItem>
                        {!isCreator && <ListItem className={classes.listItem} button onClick={() => dispatch(switchTo("quiz"))}>
                            <ListItemIcon>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary="考試及作業" />
                        </ListItem>}
                        {isCreator && <ListItem className={classes.listItem} button onClick={() => dispatch(switchTo("quizManage"))}>
                            <ListItemIcon>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary="考試及作業管理" />
                        </ListItem>}
                        <ListItem className={classes.listItem} button onClick={() => dispatch(switchTo("bulletinBoard"))}>
                            <ListItemIcon>
                                <ForumIcon />
                            </ListItemIcon>
                            <ListItemText primary="討論區" />
                        </ListItem>
                    </List>

                </Paper>
                {
                    authFinish ?
                        <div className={classes.main}>
                            <MainWindow isCreator={isCreator} />
                        </div> : null
                }
            </div>}
        </div>
    )
}