import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import CourseCard from '../components/CourseCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourseListAsync } from '../actions/courseList'
import { CircularProgress, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

function CourseList() {
    const dispatch = useDispatch()
    const courseList = useSelector(state => state.courseReducer.courseList);
    const isfetching = useSelector(state => state.courseReducer.isfetching);
    var cardList = []
    useEffect(() => {
        dispatch(fetchCourseListAsync())
    }, [])
    if (!isfetching) {
        cardList = courseList.map((course) =>
            <CourseCard key={course.id} course={course} />)
    }
    return (
        <div>
            {isfetching ? <CircularProgress /> : cardList}
        </div>
    )
}

export default function CourseListPage() {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            height: theme.spacing(100),
            margin: theme.spacing(5)
        },
        courseList: {
            flex: 3,
            margin: theme.spacing(3)
        },
        history: {
            flex: 1,
            margin: theme.spacing(3)
        }
    }));
    const classes = useStyles();
    return (
        <div>
            <NavBar context="Bow-Code" />
            <div className={classes.root}>
                <Paper elevation={1} className={classes.courseList}>
                    <CourseList />
                </Paper>
                <Paper className={classes.history}>
                    <CourseList />
                </Paper>
            </div>
        </div>
    )
}
