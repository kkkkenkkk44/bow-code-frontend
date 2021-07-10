import React, { useEffect } from 'react'
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

export default function Overview() {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            height: "calc(100vh - 60px)",
        },
        feed: {
            flex: 6,
            margin: theme.spacing(5),
            marginRight: theme.spacing(2.5),
            height: '90%'
        },
        profile: {
            flex: 3,
            margin: theme.spacing(5),
            marginRight: theme.spacing(2.5),
            height: '90%'
        }
    }));
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.feed}>
                Feed
            </Paper>
            <Paper className={classes.profile}>
                Profile
            </Paper>
        </div>
    )
}