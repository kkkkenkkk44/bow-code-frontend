import React from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';


export default function CourseCard(props) {
    const useStyles = makeStyles((theme) => ({
        title: {

        },
        abstract: {
            color: "#707070"
        }
    }));
    const classes = useStyles();

    var abstract = props.course.abstract
    if (abstract.length > 80) {
        abstract = abstract.substring(0, 80) + "..."
    }
    return (
        <Card>
            <CardActionArea>
                <CardContent className={classes.title}>
                    <h3>{props.course.name}</h3>
                </CardContent>
                <CardContent className={classes.abstract}>
                    <p>{abstract}</p>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
