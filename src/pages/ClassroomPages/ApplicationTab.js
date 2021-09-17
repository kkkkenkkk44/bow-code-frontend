import React, { useEffect } from 'react'
import SubmissionListTile from '../../components/SubmissionListTile'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSubmissionAsync } from '../../actions/userPage'
import { CircularProgress } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom'
import { fetchCoursePlanAsync } from '../../actions/classroomPage'
import CourseCard from '../../components/CourseCard'
import { Link as RouterLink } from 'react-router-dom';

export default function ApplicationTab() {
    const useStyles = makeStyles((theme) => ({
        root: {
            textAlign: 'center'
        },
        sectionTitle: {
            margin: theme.spacing(5),
            padding: theme.spacing(2)
        },
        submissionListTile: {
            width: '75%',
            marginBottom: theme.spacing(2),
            display: 'inline-block'
        },
        courseCard: {
            flex: 1,
            paddingLeft: theme.spacing(3),
            margin: theme.spacing(3),
        },
    }));
    const dispatch = useDispatch()
    const classes = useStyles()
    const { ClassroomID } = useParams()

    return (
        <div>
            <Typography className={classes.sectionTitle} variant="h5" component="h2">
                教室申請連結
                <Divider className={classes.divider}></Divider>
            </Typography>
            <div className={classes.root}>
                {`${process.env.REACT_APP_BOWCODE_PREFIX}/apply/${ClassroomID}`}
            </div>
        </div>
    )
}
