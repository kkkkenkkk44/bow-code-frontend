import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { switchTo } from '../actions/userPage';
import { auth } from "../actions/login"

import Overview from './UserPages/Overview'
import MyCourse from './UserPages/MyCourse'
import ProblemSubmission from './UserPages/ProblemSubmission';
import MyJoinedClassroom from './UserPages/MyJoinedClassroom';
import MyOwnClassroom from './UserPages/MyOwnClassroom';
import MyCoursePlan from './UserPages/MyCoursePlan'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import VisibilityIcon from '@material-ui/icons/Visibility';
import NearMeIcon from '@material-ui/icons/NearMe';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FaceIcon from '@material-ui/icons/Face';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SchoolIcon from '@material-ui/icons/School';
import HistoryIcon from '@material-ui/icons/History';

function MainWindow(props) {
    const currentTab = useSelector(state => state.userPageReducer.currentTab)
    return (
        <div>
            <div hidden={currentTab !== "myCourse"}>
                <MyCourse />
            </div>
            <div hidden={currentTab !== "problemSubmission"}>
                <ProblemSubmission />
            </div>
            <div hidden={currentTab !== "myJoinedClassroom"}>
                <MyJoinedClassroom />
            </div>
            <div hidden={currentTab !== "myCoursePlan"}>
                <MyCoursePlan />
            </div>
        </div>
    )
}

export default function UserPage(props) {
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
        }
    }));
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.loginReducer.user)
    const authFinish = useSelector(state => state.loginReducer.authFinish)
    const myOwnClassroomList = useSelector(state => state.userPageReducer.ownClassrooms)
    const myJoinedClassroomList = useSelector(state => state.userPageReducer.joinedClassrooms)
    // useEffect(() => {
    //     dispatch(auth())
    // }, [])
    return (
        <div>
            <NavBar context="CoDAI 教室" />
            <div className={classes.root}>
                <Paper className={classes.userInfo} square elevation={4}>

                    <Avatar className={classes.avatar} alt="Remy Sharp" src={typeof user.userInfo === 'undefined' ? null : user.userInfo.avatar} />
                    <Typography className={classes.userName} variant="h4" component="h2">
                        {typeof user.userInfo === 'undefined' ? "" : user.userInfo.name}
                    </Typography>
                    <Divider />
                    <List>
                        {<ListItem className={classes.listItem} button onClick={() => dispatch(switchTo("myJoinedClassroom"))}>
                            <ListItemIcon>
                                <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText primary="班級" />
                        </ListItem>}
                        <ListItem className={classes.listItem} button onClick={() => dispatch(switchTo("myCoursePlan"))}>
                            <ListItemIcon>
                                <NearMeIcon />
                            </ListItemIcon>
                            <ListItemText primary="教案" />
                        </ListItem>
                        <ListItem className={classes.listItem} button onClick={() => dispatch(switchTo("myCourse"))}>
                            <ListItemIcon>
                                <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText primary="單元" />
                        </ListItem>
                        <ListItem className={classes.listItem} button onClick={() => dispatch(switchTo("problemSubmission"))}>
                            <ListItemIcon>
                                <HistoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="作答紀錄" />
                        </ListItem>
                    </List>

                </Paper>
                {
                    authFinish ?
                        <div className={classes.main}>
                            <MainWindow />
                        </div> : null
                }
            </div>
        </div>
    )
}