import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import BlockCard from '../components/BlockCard'
import CourseInfoBar from '../components/CourseInfoBar'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@progress/kendo-react-buttons'
import { useParams } from 'react-router-dom'

export default function CourseDetailPage() {

    return (
        <div>
            <NavBar context="Bow-Code" />
            ClassroomPage
        </div>
    )
}