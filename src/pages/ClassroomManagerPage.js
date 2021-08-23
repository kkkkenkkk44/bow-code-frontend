import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { switchTo } from '../actions/classroomManagerPage';
import { auth } from "../actions/login"

import Overview from './UserPages/Overview'
import BulletinBoard from './ClassroomTabs/BulletinBoard';
import Quiz from './ClassroomTabs/Quiz'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import NearMeIcon from '@material-ui/icons/NearMe';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FaceIcon from '@material-ui/icons/Face';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SchoolIcon from '@material-ui/icons/School';
import HistoryIcon from '@material-ui/icons/History';

function MainWindow(props) {
    const currentTab = useSelector(state => state.classroomManagerPageReducer.currentTab)
    return (
        <div>
            <div hidden={currentTab !== "overview"}>
                <Overview />
            </div>
            <div hidden={currentTab !== "bulletinBoard"}>
                <BulletinBoard />
            </div>
            <div hidden={currentTab !== "quiz"}>
                <Quiz />
            </div>
        </div>
    )
}

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
        }
    }));
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.loginReducer.user)
    const authFinish = useSelector(state => state.loginReducer.authFinish)
    useEffect(() => {
        dispatch(auth())
    }, [])
    return (
        <div>
            <NavBar context="Bow-Code" />
            <div className={classes.root}>
                <Paper className={classes.userInfo} square elevation={4}>
                    <List>
                        <ListItem className={classes.listItem} button onClick={() => dispatch(switchTo("overview"))}>
                            <ListItemIcon>
                                <FaceIcon />
                            </ListItemIcon>
                            <ListItemText primary="總覽" />
                        </ListItem>
                        <ListItem className={classes.listItem} button onClick={() => dispatch(switchTo("teachingplan"))}>
                            <ListItemIcon>
                                <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText primary="教案變更" />
                        </ListItem>
                        <ListItem className={classes.listItem} button>
                            <ListItemIcon>
                                <HistoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="課程內容" />
                        </ListItem>
                        <ListItem className={classes.listItem} button>
                            <ListItemIcon>
                                <HistoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="學生" />
                        </ListItem>
                        <ListItem className={classes.listItem} button onClick={() => dispatch(switchTo("quiz"))}>
                            <ListItemIcon>
                                <HistoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="考試及作業" />
                        </ListItem>
                        <ListItem className={classes.listItem} button>
                            <ListItemIcon>
                                <HistoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="成績一覽" />
                        </ListItem>
                        <ListItem className={classes.listItem} button onClick={() => dispatch(switchTo("bulletinBoard"))}>
                            <ListItemIcon>
                                <HistoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="討論區" />
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