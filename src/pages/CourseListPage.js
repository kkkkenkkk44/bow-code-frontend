import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import CourseCard from '../components/CourseCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourseListAsync } from '../actions/courseList'
import { CircularProgress, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'

function CourseList() {
    const dispatch = useDispatch()
    const courseList = useSelector(state => state.courseListReducer.courseList);
    const isfetching = useSelector(state => state.courseListReducer.isfetching);
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
            height: theme.spacing(100),
            margin: theme.spacing(5)
        },
        searchBar: {
            marginLeft: "10%",
            marginRight: "10%"
        },
        searchText: {
            fontSize: "2em"
        },
        content: {
            display: 'flex',
            flexWrap: 'wrap',
            margin: theme.spacing(3)
        },
        filter: {
            flex: 1,
            margin: theme.spacing(3),
            height: theme.spacing(64)
        },
        courseList: {
            flex: 6,
            margin: theme.spacing(3)
        }
    }));
    const classes = useStyles();
    return (
        <div>
            <NavBar context="Bow-Code" />
            <div className={classes.root}>
                <div className={classes.searchBar}>
                    <TextField
                        id="standard-basic"
                        placeholder="搜尋課程"
                        fullWidth
                        size="small"
                        InputProps={{ classes: { input: classes.searchText } }}
                    />
                </div>
                <div className={classes.content}>
                    <Paper className={classes.filter}>
                    </Paper>
                    <Paper elevation={1} className={classes.courseList}>
                        <CourseList />
                    </Paper>
                </div>
            </div>
        </div>
    )
}
