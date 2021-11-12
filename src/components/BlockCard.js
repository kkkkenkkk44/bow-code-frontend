import React, { useEffect, useState } from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router";
import { useHistory, Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from "@material-ui/core";
import { showCourseIndex } from "../actions/courseDetailPage";



export default function BlockCard(props) {
    const useStyles = makeStyles((theme) => ({
        title: {
            marginLeft: '20px',
        },
        card: {
            width: '60%',
            margin: '20px',
            marginLeft: '280px',
            borderColor: 'primary.main',
        },
        root: {
            height: '60px',
            display: 'flex',
            alignItems: 'center'
        },
        name: {
            marginLeft: '20px'
        }

    }));
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()
    const isProblemBlock = useSelector(state => state.courseEditorReducer.isProblemBlock)
    //console.log(isProblemBlock)
    //const exampleCourseID = '60ebca1c14447a1cc7d84bc0'
    const { CourseID } = useParams()
    var blockIndex = props.value.id
    const route2ProblemOrCourse = () => {
        isProblemBlock ?
            history.push(`/problem/${blockIndex}`)
            :
            dispatch(showCourseIndex(blockIndex))
            // typeof props.classroomID === 'undefined' ?
            //     history.push(`/course/${CourseID}/${blockIndex}`)
            //     :
            //     history.push(`/classroom/${props.classroomID}/course/${CourseID}/${blockIndex}`)
    }

    return (
        <Card className={classes.root} square>
            <CardActionArea style={{ height: '100%' }} onClick={route2ProblemOrCourse}>
                <Typography variant="subtitle1" className={classes.name}>
                    {props.value.title}
                </Typography>
            </CardActionArea>
        </Card>
    )
}