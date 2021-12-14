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
    const { isFetching, componentList, componentDetailList, creator } = useSelector(state => state.coursePlanEditorReducer)
    const user = useSelector(state => state.loginReducer.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: "FETCHING_COURSEPLAN" })
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course_plan/${CoursePlanID}`, {
            method: 'GET',
            credentials: "include"
        })
            .then(res => res.json())
            .then(res => {
                var newComponentList = res.componentList
                console.log(res)
                dispatch({ type: "SAVE_COURSEPLAN_INFO", payload: res })
                Promise.all(res.componentList.map(component => {
                    switch (component.type) {
                        case 0:
                            return fetch(`${process.env.REACT_APP_BACKEND_URL}/course/details?courses=${component.setList[0].id}`, {
                                method: 'GET',
                                credentials: 'include',
                            })
                                .then(res => res.json())
                                .then(res => res.courseList)
                        default:
                            return Promise.all(component.setList.map(problem => {
                                return fetch(`${process.env.REACT_APP_BACKEND_URL}/problem/${problem.id}`, {
                                    method: 'GET',
                                    credentials: 'include',
                                })
                                    .then(res => res.json())
                            }))
                    }
                }))
                    .then(res => res.map((r, index) => {
                        return {
                            name: newComponentList[index].name,
                            type: newComponentList[index].type,
                            setList: r
                        }
                    }))
                    .then(res => {
                        console.log(res)
                        dispatch({ type: "SAVE_COMPONENT_DETAIL_LIST", payload: { componentDetailList: res } })
                    })
            })
    }, [])

    var componentCardList = []
    componentCardList = componentDetailList.map(component => {
        if (component.type === 0) {
            return <div className={classes.componentCard}><CourseCard course={component.setList[0]} /></div>
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
            <NavBar context="CoDai 教室" />
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
                        {user.id === creator ?
                            <AddComponentButton />
                            :
                            <></>
                        }
                    </Grid>
                </Grid>
            </div>
        </div>
    )

}