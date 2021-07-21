import React, { useEffect } from 'react'
import SubmissionListTile from '../../components/submissionListTile'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSubmissionAsync } from '../../actions/userPage'
import { CircularProgress } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

export default function ProblemSubmissionPage() {
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
            marginBottom: theme.spacing(3),
            display: 'inline-block'
        }
    }));
    const dispatch = useDispatch()
    const classes = useStyles()
    const user = useSelector(state => state.loginReducer.user);
    const submissions = useSelector(state => state.userPageReducer.submissions)
    const submissionFetching = useSelector(state => state.userPageReducer.submissionFetching)
    
    useEffect(() => {
        if (typeof user.id !== 'undefined') {
            dispatch(fetchSubmissionAsync())
        }
    }, [user])
    if (!submissionFetching && submissions != null) {
        var submissionList = submissions.map((submission) =>
            <div key={submission.id} className={classes.submissionListTile}>
                <SubmissionListTile submission={submission}/>
            </div>
        )
    }
    return (
        <div>
            <Typography className={classes.sectionTitle} variant="h5" component="h2">
                作答紀錄
                <Divider className={classes.divider}></Divider>
            </Typography>
            <div className={classes.root}>
                {
                    submissionFetching ?
                        <CircularProgress /> :
                        submissionList
                }
            </div>
        </div>
    )
}
