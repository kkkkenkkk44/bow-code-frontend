import React from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import TextEllipsis from 'react-text-ellipsis'
import { useHistory } from "react-router-dom";
import { CardMedia } from "@material-ui/core";
import { Typography } from "@material-ui/core";

export default function CoursePlanCard(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            height: theme.spacing(25)
        },
        info: {
            flex: 1,
            height: '80%',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '10px'
        },
    }));

    const classes = useStyles();
    const history = useHistory();

    return (
        <Card>
            <CardActionArea onClick={() => history.push(`/coursePlanEditor/${props.coursePlan.id}`)}>
                <CardContent className={classes.title}>
                    <h3>{props.coursePlan.name}</h3>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}