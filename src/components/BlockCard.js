import React, { useEffect, useState }from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router";
import { useHistory, Link } from "react-router-dom";
import { useParams } from 'react-router-dom'



export default function BlockCard(props) {
    const useStyles = makeStyles((theme) => ({
        title: {

        },
        card: {
            width: '60%',
            margin: '20px',
            marginLeft: '280px',
        }
    }));
    const classes = useStyles();
    //const exampleCourseID = '60ebca1c14447a1cc7d84bc0'
    const { CourseID } = useParams()
    var blockIndex = props.value.id
       
    return (
        <Card className={classes.card}>
            <Link to={`/course/${CourseID}/${blockIndex}`}>
            <CardActionArea>
                <CardContent className={classes.title}>
                    <h2>{props.value.title}</h2>
                </CardContent>
            </CardActionArea>
            </Link>
        </Card>
    )
}