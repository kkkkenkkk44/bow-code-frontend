import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";

export default function SubmissionListTile(props) {
    const submission = props.submission
    const useStyles = makeStyles((theme) => ({
        green: {
            display: 'flex',
            height: theme.spacing(15),
            borderLeft: "7px #9ed351 solid",
            alignItems: "center"
        },
        grey: {
            display: 'flex',
            height: theme.spacing(15),
            borderLeft: "7px #c3bebd solid",
            alignItems: "center"
        },
        red: {
            display: 'flex',
            height: theme.spacing(15),
            borderLeft: "7px #d35b51 solid",
            alignItems: "center"
        },
        status: {
            display: 'flex',
            alignItems: "center",
            height: '80%',
            width: '180px',
            borderRight: '0.25px #a0a0a0 solid'
        },
        statusText: {
            flex: 1
        },
        name: {
            flex: 1,

        },
        time: {
            flex: 1,

        }
    }))

    const classes = useStyles();
    var paperClass
    if (submission.testcaseCnt != submission.judgementCompleted) {
        paperClass = classes.grey
    } else if (submission.status == "AC") {
        paperClass = classes.green
    } else {
        paperClass = classes.red
    }
    return <Paper className={paperClass} elevation={1}>
        <div className={classes.status}>
            <Typography className={classes.statusText} variant="h4" component="h3">
                {submission.testcaseCnt == submission.judgementCompleted ? submission.status : "處理中"}
            </Typography>
        </div>
        <div className={classes.name}>
            {submission.problem.name}
        </div>
        <div className={classes.time}>
            {submission.createTime}
        </div>
    </Paper>
}