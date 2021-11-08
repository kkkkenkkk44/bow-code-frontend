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

export default function ViewCourse() {
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
    const classroom = useSelector(state => state.classroomPageReducer)
    var cardList = []

    // console.log(coursePlan)

    useEffect(() => {
        //fetch classroom detail
        //dispatch classroom detail
        //fetch courseplan detail
        //dispatch courseplan detail
        if(classroom.coursePlan)
            dispatch(fetchCoursePlanAsync(classroom.coursePlan))
    }, [classroom.coursePlan])
    
    if (!classroom.isfetching) {
        cardList = classroom.courseList.map((course) =>
            <div key={course.id} className={classes.courseCard}>
                <CourseCard course={course} classroomID={ClassroomID}/>
            </div>
        )
    }

    return (
        <div>
            <Typography className={classes.sectionTitle} variant="h5" component="h2">
                單元內容
                <Divider className={classes.divider}></Divider>
            </Typography>
            <div className={classes.root}>
                {
                    classroom.isFetching ?
                        <CircularProgress />
                        :
                        cardList
                }
            </div>
        </div>
    )
}
