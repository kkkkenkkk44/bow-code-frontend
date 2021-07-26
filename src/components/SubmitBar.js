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

    const handleSubmit = () => {
        var submission = {
            sourceCode: props.sourceCode,
            language: getLanguageID(props.language)
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/submit/problem/${props.ProblemID}`, {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(submission)
        })
            .then(res => res.json())
            .then(res => {
                props.setOpenSubmissions(true)
            })
        // console.log(props.sourceCode, props.language, getLanguageID(props.language))
    }

    const handleCheckSubmission = () => {
        props.setOpenSubmissions(true)
    }

    return (
        <AppBar position="fixed" color="primary" className={classes.appbar} elevation={3}>
            <Toolbar className={classes.toolbar}>
                {/* <Typography className={classes.context}>123</Typography> */}
                <Button className={classes.submissionButton} onClick={handleCheckSubmission}>
                    check submissions
                </Button>
                <div className={classes.context}></div>
                <Button className={classes.submitButton} onClick={handleSubmit}>
                    submit
                </Button>
            </Toolbar>
        </AppBar>
    )

}