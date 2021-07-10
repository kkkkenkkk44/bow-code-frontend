import React from 'react'
import NavBar from '../components/NavBar'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { switchTo } from '../actions/userPage';

import Overview from './UserPages/Overview'
import MyCourse from './UserPages/MyCourse'

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

function MainWindow(props) {
    const currentTab = useSelector(state => state.userPageReducer.currentTab)
    return (
        <div>
            <div hidden={currentTab !== "overview"}>
                <Overview />
            </div>
            <div hidden={currentTab !== "myCourse"}>
                <MyCourse />
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

    return (
        <div>
            <NavBar context="Bow-Code" />

            <div className={classes.root}>
                <Paper className={classes.userInfo} square elevation={4}>

                    <Avatar className={classes.avatar} alt="Remy Sharp" src="https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png" />
                    <Typography className={classes.userName} variant="h4" component="h2">
                        {"George"}
                    </Typography>
                    <Divider />
                    <List>
                        <ListItem className={classes.listItem} button onClick={() => dispatch(switchTo("overview"))}>
                            <ListItemIcon>
                                <FaceIcon />
                            </ListItemIcon>
                            <ListItemText primary="總覽" />
                        </ListItem>
                        <ListItem className={classes.listItem} button onClick={() => dispatch(switchTo("myCourse"))}>
                            <ListItemIcon>
                                <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText primary="教材" />
                        </ListItem>
                        <ListItem className={classes.listItem} button>
                            <ListItemIcon>
                                <NearMeIcon />
                            </ListItemIcon>
                            <ListItemText primary="教學計畫" />
                        </ListItem>
                        <ListItem className={classes.listItem} button>
                            <ListItemIcon>
                                <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText primary="班級" />
                        </ListItem>
                        <ListItem className={classes.listItem} button>
                            <ListItemIcon>
                                <AttachFileIcon />
                            </ListItemIcon>
                            <ListItemText primary="檔案" />
                        </ListItem>
                    </List>

                </Paper>
                <div className={classes.main}>
                    <MainWindow />
                </div>
            </div>
        </div>
    )
}