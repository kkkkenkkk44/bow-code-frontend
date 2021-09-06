import React, { useEffect } from 'react'
import NavBar from "../components/NavBar"
import { Grid, Button, makeStyles, CircularProgress } from "@material-ui/core"
import { Redirect } from "react-router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddComponentButton from '../components/CreateCoursePlan/AddComponentButton';
import { useParams } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import ComponentCard from '../components/ComponentCard'
import ProblemListTile from '../components/ProblemListTile'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3)
    },
    componentCard: {
        marginBottom: theme.spacing(2)
    }
}))

export default function CoursePlanEditorPage(props) {

    const { CoursePlanID } = useParams()
    const classes = useStyles()
    const { isFetching, componentList, componentDetailList } = useSelector(state => state.coursePlanEditorReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: "FETCHING_COURSEPLAN" })
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course_plan/${CoursePlanID}`, {
            method: 'GET',
            credentials: "include"
        })
            .then(res => res.json())
            .then(res => {
                dispatch({ type: "SAVE_COURSEPLAN_INFO", payload: res })
                console.log(res)
                // Promise.all(res.componentList.map(component => {
                //     switch (component.type) {
                //         case 0:
                //             return fetch(`${process.env.REACT_APP_BACKEND_URL}/course/details?courses=${component.setList[0]}`, {
                //                 method: 'GET',
                //                 credentials: 'include',
                //             })
                //     }
                // }))
                //     .then(res => {
                //         Promise.all(res.map(r => r.text()))
                //             .then(res => console.log(res))
                //     })
            })
        // fetch(`${process.env.REACT_APP_BACKEND_URL}/course/details?courses=612c9f38255e0aa1fa29b220`, {
        //     method: 'GET',
        //     credentials: 'include',
        // })
        //     .then(res => res.json())
        //     .then(res => console.log(res))
    }, [])

    var componentCardList = []
    componentCardList = componentDetailList.map(component => {
        if (component.type === 0) {
            return <div className={classes.componentCard}><CourseCard course={component.setList[0]} unclickable /></div>
        }
        else if (component.type === 1) {
            return (
                <div className={classes.componentCard}>
                    <ComponentCard name={component.name} totalScore={component.totalScore}>
                        {
                            component.setList.map(problem => {
                                return <ProblemListTile problem={problem} isPicker={false} />
                            })
                        }
                    </ComponentCard>
                </div>
            )
        }
        else {
            return (
                <div className={classes.componentCard}>
                    <ComponentCard name={component.name} totalScore={component.totalScore}>
                        {
                            component.setList.map(problem => {
                                return <ProblemListTile problem={problem} isPicker={false} />
                            })
                        }
                    </ComponentCard>
                </div>
            )
        }
    })

    return (
        <div>
            <NavBar context="Bow-Code" />
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        {componentCardList}
                        {isFetching ?
                            <CircularProgress />
                            :
                            <div></div>
                        }
                    </Grid>
                    <Grid item xs={2}>
                        <AddComponentButton />
                    </Grid>
                </Grid>
            </div>
        </div>
    )

}