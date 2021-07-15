import React from 'react'
import NavBar from "../components/NavBar"
import CourseEditor from "../components/CourseEditor"
import { Grid, Button, makeStyles } from "@material-ui/core"
import { Redirect } from "react-router"
import { useState } from "react"
import { useSelector } from "react-redux"
import ImportBlockDialog from '../components/ImportBlockDialog'


const useStyles = makeStyles((theme) => ({
    finishButton: {
        background: "rgba(104, 144, 79, 0.9)",
        margin: "20px 0 20px 0"
    }
}))

export default function CourseEditorPage(props){

    const classes = useStyles()

    const [done, setDone] = useState(false)

    return(
        <div>
            <NavBar context="Bow-Code"/>
            <CourseEditor CourseID={props.match.params.CourseID}/>
            <Grid container justify="center">
                <Grid item xs={10}>
                    <Grid container justify="center">
                        <Grid item xs={10}>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Button
                                        onClick={(e) => {
                                            setDone(true)
                                        }}
                                        variant="contained"
                                        color="primary"
                                        className={classes.finishButton}
                                    >
                                        完成
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {done?
                <Redirect to={`/course/${props.match.params.CourseID}`}/>
                :
                <></>
            }
            <ImportBlockDialog CourseID={props.match.params.CourseID}/>
        </div>
    )
}