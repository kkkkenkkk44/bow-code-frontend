import React from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import TextEllipsis from 'react-text-ellipsis'
import { useHistory } from "react-router-dom";


export default function CourseCard(props) {
    const useStyles = makeStyles((theme) => ({
        title: {
            height: theme.spacing(3)
        },
        abstract: {
            color: "#707070",
            height: theme.spacing(8.5),
        },
        abstractText: {
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: "150px",
            textOverflow: "ellipsis"
        }
    }));
    const classes = useStyles();
    const history = useHistory();

    var abstract = props.course.abstract

    var CourseID = props.course.id

    if (abstract.length > 80) {
        abstract = abstract.substring(0, 80) + "..."
    }
    const removeCourse = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${props.course.id}`,
            {
                method: "DELETE",
                credentials: "include"
            })
    }
    return (
        <Card>
            <CardActionArea onClick={()=>history.push(`/course/${props.course.id}`)}>
                <CardContent className={classes.title}>
                    <h3>{props.course.name}</h3>
                </CardContent>
                <CardContent className={classes.abstract}>
                    <TextEllipsis
                        lines={4}
                        tag={'p'}
                        ellipsisChars={'...'}
                        tagClass={'className'}
                        debounceTimeoutOnResize={200}
                        useJsOnly={true}
                    >{abstract}</TextEllipsis>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
