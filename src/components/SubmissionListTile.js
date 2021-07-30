import React from "react";
import { Paper } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";

function statusText(code) {
    if (code & 0x8000) {
        return "伺服器錯誤"
    } else if (code & 0x1000) {
        return "Runtime Error"
    } else if (code & 0x2000) {
        return "Compile Error"
    } else if (code & 0x0008) {
        return "TLE"
    } else if (code & 0x0010) {
        return "WA"
    } else if (!code) {
        return "AC"
    }
}

export default function SubmissionListTile(props) {
    const submission = props.submission
    const useStyles = makeStyles((theme) => ({
        green: {
            display: 'flex',
            height: theme.spacing(7),
            borderLeft: "20px #9ed351 solid",
            alignItems: "center"
        },
        grey: {
            display: 'flex',
            height: theme.spacing(7),
            borderLeft: "20px #c3bebd solid",
            alignItems: "center"
        },
        red: {
            display: 'flex',
            height: theme.spacing(7),
            borderLeft: "20px #d35b51 solid",
            alignItems: "center"
        },
        status: {
            display: 'flex',
            alignItems: "center",
            height: '80%',
            width: '120px',
            borderRight: '0.25px #a0a0a0 solid'
        },
        statusText: {
            flex: 1
        },
        name: {
            flex: 6,
        },
        score: {
            flex: 1,
        },
        time: {
            flex: 4,
        }
    }))

    const classes = useStyles();
    var paperClass
    var score
    if (submission.testcaseCnt != submission.judgementCompleted) {
        paperClass = classes.grey
        score = "-/-"
    } else if (statusText(submission.status) == "AC") {
        paperClass = classes.green
        score = `${submission.judgementCompleted}/${submission.judgementCompleted}`
    } else {
        paperClass = classes.red
        var ac = 0
        submission.judgements.forEach((jug) => { if (statusText(jug.status) == "AC") { ac += 1 } })
        score = `${ac}/${submission.judgementCompleted}`
        console.log(score)
    }

    var scoreText = submission.testcaseCnt != submission.judgementCompleted ? "-/-" : score

    return <Paper elevation={1} square >
        <CardActionArea className={paperClass} onClick={() => { }}>
            <div className={classes.status}>
                <Typography className={classes.statusText} variant="h6" component="h5">
                    {submission.testcaseCnt == submission.judgementCompleted ? statusText(submission.status) : "處理中"}
                </Typography>
            </div>
            <div className={classes.name}>
                <Typography className={classes.statusText} variant="h6" component="h5">
                    {submission.problem.name}
                </Typography>
            </div>
            <div className={classes.score}>
                {scoreText}
            </div>
            <div className={classes.time}>
                {submission.createTime}
            </div>
        </CardActionArea>
    </Paper>
}