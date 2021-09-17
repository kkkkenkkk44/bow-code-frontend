import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar, Typography, Link } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import React from "react";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Avatar } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';
import { getLanguageID } from "../constants";

const useStyles = makeStyles((theme) => ({
    appbar: {
        // height: "50px",
        background: "rgba(144, 144, 144, 1)",
        top: 'auto',
        bottom: 0, 
        zIndex: "100",
    },
    context: {
        flexGrow: 1
    },
    submitButton: {
        color: "#ffffff",
    },
    submissionButton: {
        // flexGrow: 2,
        color: "#ffffff",
    }
}));

export default function SubmitBar(props) {
    const classes = useStyles()
    const classroomID = props.classroomID
    const handleSubmit = () => {
        var submission = {
            sourceCode: props.sourceCode,
            languageID: getLanguageID(props.language)
        }
        const url = typeof classroomID === 'undefined' ? new URL(`${process.env.REACT_APP_BACKEND_URL}/submit/problem/${props.ProblemID}`) : new URL(`${process.env.REACT_APP_BACKEND_URL}/submit/problem/${props.ProblemID}?classroom=${classroomID}`)
        fetch(url, {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(submission)
        })
            .then(res => res.json())
            .then(res => {
                props.handleCheckSubmission()
            })
    }

    return (
        <AppBar position="fixed" color="primary" className={classes.appbar} elevation={3}>
            <Toolbar className={classes.toolbar}>
                {/* <Typography className={classes.context}>123</Typography> */}
                <Button className={classes.submissionButton} onClick={props.handleCheckSubmission}>
                    作答紀錄
                </Button>
                <div className={classes.context}></div>
                <Button className={classes.submitButton} onClick={handleSubmit}>
                    提交
                </Button>
            </Toolbar>
        </AppBar>
    )

}