import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import CourseCard from '../components/CourseCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourseListAsync } from '../actions/courseList'
import { CircularProgress, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

export default function CourseEditorPage () {
    return (
        <div>
            <NavBar context="Bow-Code" />
            Course Editor
        </div>
    )
}