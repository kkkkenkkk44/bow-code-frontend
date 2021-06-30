import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import CourseCard from '../components/CourseCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourseListAsync } from '../actions/courseList'
import { CircularProgress } from '@material-ui/core'

export default function CourseListPage() {
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
            <NavBar context="Bow-Code" />
            {
                isfetching ? <div><CircularProgress /></div> : <div>
                    {cardList}
                </div>
            }

        </div>
    )
}
