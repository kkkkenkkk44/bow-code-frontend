import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOwnCoursePlanAsync } from '../../actions/userPage'
import { CircularProgress } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CoursePlanCard from '../../components/CoursePlanCard'

export default function MyCoursePlan() {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            margin: theme.spacing(5)
        },
        coursePlanCard: {
            flex: 1,
            margin: theme.spacing(2),
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: theme.spacing(40),
        },
        sectionTitle: {
            margin: theme.spacing(5),
            padding: theme.spacing(2)
        },
        divider: {
            margin: theme.spacing(0.5)
        }
    }));
    const classes = useStyles();
    const dispatch = useDispatch()
    const user = useSelector(state => state.loginReducer.user);
    const ownCoursePlanFetching = useSelector(state => state.userPageReducer.ownCoursePlanFetching);
    var ownCoursePlan = useSelector(state => state.userPageReducer.ownCoursePlan)
    var ownCoursePlanCardList = []
    useEffect(() => {
        if (typeof user.id !== 'undefined') {
            dispatch(fetchOwnCoursePlanAsync(user.ownCoursePlanList))
        }
    }, [user])
    if (!ownCoursePlanFetching && ownCoursePlan != null) {
        ownCoursePlanCardList = ownCoursePlan.map((coursePlan) =>
            <div key={coursePlan.id} className={classes.coursePlanCard}>
                <CoursePlanCard coursePlan={coursePlan}/>
            </div>
        )
    }
    
    return (
        <div>
            <Typography className={classes.sectionTitle} variant="h5" component="h2">
                我建立的教學計畫
                <Divider className={classes.divider}></Divider>
            </Typography>
            <div className={classes.root}>
                {
                    ownCoursePlanFetching ?
                        <CircularProgress /> :
                        ownCoursePlanCardList
                }
            </div>
        </div>
    )
}