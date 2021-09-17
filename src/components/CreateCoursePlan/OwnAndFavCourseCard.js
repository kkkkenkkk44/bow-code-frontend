import React, { useState } from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import TextEllipsis from 'react-text-ellipsis'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { CardMedia } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import { Chip } from "@material-ui/core";
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';

export default function OwnAndFavCourseCard(props) {
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
        title: {
            display: 'flex',
            alignItems: 'baseline'
        },
        author: {
            flex: 1,
            color: "#959595",
            marginLeft: '10px',
            marginTop: '5px',
            display: 'flex',
            alignItems: 'center'
        },
        abstract: {
            flex: 4,
            color: "#707070",
            height: theme.spacing(8.5),
            marginLeft: '10px',
            fontSize: '12pt'
        },
        tagAndDiff: {
            display: 'flex'
        },
        tags: {
            flex: 1,
        },
        tagChip: {
            margin: '3px'
        },
        difficulty: {
            marginRight: 0,
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            fontSize: '11pt'
        },
        cover: {
            height: '100%'
        },
        card: {
            margin: theme.spacing(2),
        }
    }));
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()

    const abstract = props.course.abstract
    const creator = props.course.creator
    const courseName = props.course.name
    const tags = props.course.tags
    const { chosenCourseList } = useSelector(state => state.coursePlanEditorReducer)

    var chosen
    if (chosenCourseList.findIndex(course => course.id === props.course.id) === -1){
        chosen = false
    }
    else{
        chosen = true
    }

        var difficulty
        
    switch (props.course.difficulty) {
        case 0:
            difficulty = <div className={classes.difficulty}>
                <Typography variant="p" component="p" style={{ marginRight: '5px' }}>
                    簡單
                </Typography>
                <StarIcon></StarIcon>
                <StarOutlineIcon></StarOutlineIcon>
                <StarOutlineIcon></StarOutlineIcon>
            </div>
            break
        case 1:
            difficulty = <div className={classes.difficulty}>
                <Typography variant="p" component="h3">
                    挑戰
                </Typography>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
                <StarOutlineIcon></StarOutlineIcon>
            </div>
            break
        case 2:
            difficulty = <div className={classes.difficulty}>
                <Typography variant="p" component="h3">
                    專精
                </Typography>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
            </div>
            break

    }

    const tagChips = tags.map(tag => <Chip className={classes.tagChip} key={tag} label={tag} variant="outlined" />)

    const handleChooseCourse = () => {
        if (!chosen) {
            dispatch({ type: "CHOOSE_COURSE", payload: { course: props.course } })
        }
        else{
            dispatch({ type: "UNCHOOSE_COURSE", payload: { course: props.course } })
        }
    }

    return (
        props.brief ?
            <Card onClick={() => (handleChooseCourse())}>
                <CardActionArea >
                    <CardContent className={classes.title} style={{ backgroundColor: chosen ? "#ccc" : "" }}>
                        <h3>{props.course.name}</h3>
                    </CardContent>
                </CardActionArea>
            </Card> :
            <Card className={classes.card}>
                <CardActionArea className={classes.root}>
                    <CardMedia
                        className={classes.cover}
                        children={<img
                            style={{
                                maxHeight: '100%',
                                maxWidth: '100%',
                                objectFit: "contain"
                            }}
                            src="https://2.bp.blogspot.com/-VDnQXA1LJ-Y/Wfg0wEvvGSI/AAAAAAABH0A/L56uBITK8Y82HsE8-_xlJWjG6ZMjKZcFQCLcBGAs/s600/bg_school_room_yuyake.jpg"
                        />}
                    />
                    <CardContent className={classes.info}>
                        <div className={classes.title}>
                            <Typography variant="h4" component="h3">
                                {courseName}
                            </Typography>
                            <div className={classes.author}>
                                <CreateIcon fontSize='inherit' style={{ marginRight: "2px" }} />
                                <Typography variant="caption" component="h3">
                                    {creator}
                                </Typography>
                            </div>
                        </div>
                        <div className={classes.abstract}>
                            <TextEllipsis
                                lines={3}
                                tag={'p'}
                                ellipsisChars={'...'}
                                tagClass={'className'}
                                debounceTimeoutOnResize={200}
                                useJsOnly={true}
                            >{abstract}
                            </TextEllipsis>
                        </div>
                        <div className={classes.tagAndDiff}>
                            <div className={classes.tags}>
                                {tagChips}
                            </div>
                            <div className={classes.difficulty}>
                                {difficulty}
                            </div>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
    )
}