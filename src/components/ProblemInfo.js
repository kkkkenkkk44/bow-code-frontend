import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";

export default function ProblemInfo(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
        },
        name: {
            padding: "25px"
        },
        description: {
            padding: "20px",
            paddingTop: "0px"
        }
    }))
    const problem = props.problem
    const classes = useStyles()
    return <Paper className={classes.root}>
    <div className={classes.name}>
        <Typography variant="h4">
            {problem.name}
        </Typography>
    </div>
        <div className={classes.description}>
            <Typography variant="subtitle1" dangerouslySetInnerHTML={{ __html: problem.description }}>
            </Typography>
        </div>
    </Paper>
}