import React, { useEffect } from 'react'
import NavBar from "../components/NavBar"
import { Grid, Button, makeStyles } from "@material-ui/core"
import { Redirect } from "react-router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddComponentButton from '../components/CreateCoursePlan/AddComponentButton';
import { useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    finishButton: {
        background: "rgba(104, 144, 79, 0.9)",
        margin: "20px 0 20px 0"
    }
}))

export default function CoursePlanEditorPage(props) {

    const { CoursePlanID } = useParams()
    const dispatch = useDispatch()
    console.log(CoursePlanID)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course_plan/${CoursePlanID}`, {
            method: 'GET',
            credentials: "include"
        })
            .then(res => res.json())
            .then(res =>
                dispatch({ type: "SAVE_COURSEPLAN_INFO", payload: res })
            )
    }, [])

    return (
        <div>
            <NavBar context="Bow-Code" />
            <AddComponentButton />
        </div>
    )

}