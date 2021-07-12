import React, { useEffect } from 'react'
import CourseCard from '../../components/CourseCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOwnCourseAsync, fetchFavCourseAsync } from '../../actions/userPage'
import { CircularProgress } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

export default function CourseListPage() {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            margin: theme.spacing(5)
        },
        courseCard: {
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
    const favFetching = useSelector(state => state.userPageReducer.favCourseFetching);
    const ownFetching = useSelector(state => state.userPageReducer.ownCourseFetching);
    var ownCourse = useSelector(state => state.userPageReducer.ownCourse)
    var favCourse = useSelector(state => state.userPageReducer.favCourse)
    var ownCardList = []
    var favCardList = []
    useEffect(() => {
        if (typeof user.id !== 'undefined') {
            dispatch(fetchOwnCourseAsync(user.ownCourseList))
            dispatch(fetchFavCourseAsync(user.favoriteCourseList))
        }
    }, [user])
    if (!ownFetching && ownCourse != null) {
        ownCardList = ownCourse.map((course) =>
            <div key={course.id} className={classes.courseCard}>
                <CourseCard course={course} />
            </div>
        )
    }
    if (!favFetching && favCourse != null) {
        favCardList = favCourse.map((course) =>
            <div key={course.id} className={classes.courseCard}>
                <CourseCard course={course} />
            </div>
        )
    }
    return (
        <div>
            <Typography className={classes.sectionTitle} variant="h5" component="h2">
                我編寫的教材
                <Divider className={classes.divider}></Divider>
            </Typography>
            <div className={classes.root}>
                {
                    ownFetching ?
                        <CircularProgress /> :
                        ownCardList
                }
            </div>
            <Typography className={classes.sectionTitle} variant="h5" component="h2">
                收藏
                <Divider className={classes.divider}></Divider>
            </Typography>
            <div className={classes.root}>
                {
                    favFetching ?
                        <CircularProgress /> :
                        favCardList
                }
            </div>
        </div>
    )
}
