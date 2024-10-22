import React from "react"
import { useEffect } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import TextEllipsis from 'react-text-ellipsis'
import { useHistory } from "react-router-dom";
import { CardMedia } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import { Chip } from "@material-ui/core";
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import ContentLoader from 'react-content-loader'

import { asyncGetUserInfo } from "../utils/user";
import ClassroomCard from "./ClassroomCard";

export default function CourseCard(props) {
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
            display: 'flex',
            flex: 4,
            color: "#707070",
            height: theme.spacing(8.5),
            marginLeft: '10px',
            fontSize: '12pt'
        },
        abstractText: {
            flexGrow: 1
        },
        tagAndDiff: {
            display: 'flex'
        },
        tags: {
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-start'
        },
        tagChip: {
            margin: '3px',

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
    }));
    const classes = useStyles();
    const history = useHistory();

    const abstract = props.course.abstract
    const creator = props.course.creator
    const courseName = props.course.name
    const classroomID = props.classroomID
    const tags = props.course.tags
    var difficulty
    const [creatorInfo, setCreatorInfo] = React.useState(null)
    const [isFetchingCreator, setIsFetchingCreator] = React.useState(true)

    useEffect(() => {
        asyncGetUserInfo(creator).then(res => res.json()).then(data => {
            setCreatorInfo(data.userInfo)
            setIsFetchingCreator(false)
        })
    }, [])
    switch (props.course.difficulty) {
        case 0:
            difficulty = <div className={classes.difficulty}>
                <Typography variant="subtitle2" component="p" style={{ marginRight: '5px' }}>
                    簡單
                </Typography>
                <StarIcon></StarIcon>
                <StarOutlineIcon></StarOutlineIcon>
                <StarOutlineIcon></StarOutlineIcon>
            </div>
            break
        case 1:
            difficulty = <div className={classes.difficulty}>
                <Typography variant="subtitle2" component="h3">
                    挑戰
                </Typography>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
                <StarOutlineIcon></StarOutlineIcon>
            </div>
            break
        case 2:
            difficulty = <div className={classes.difficulty}>
                <Typography variant="subtitle2" component="h3">
                    專精
                </Typography>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
            </div>
            break

    }

    const handleClick = () => {
        if (!props.unclickable) {
            if (typeof classroomID === 'undefined') {
                history.push(`/course/${props.course.id}`)
            }
            else {
                history.push(`/classroom/${classroomID}/course/${props.course.id}`)
            }
        }
    }

    const tagChips = tags.map(tag => <Chip className={classes.tagChip} key={tag} label={tag} variant="outlined" />)
    return (
        isFetchingCreator ? <ContentLoader /> :
            props.brief ?
                <Card>
                    <CardActionArea onClick={handleClick}>
                        <CardContent className={classes.title}>
                            <h3>{props.course.name}</h3>
                        </CardContent>
                    </CardActionArea>
                </Card> :
                <Card>
                    <CardActionArea onClick={handleClick} className={classes.root}>
                        <CardMedia
                            className={classes.cover}
                            children={<img
                                style={{
                                    maxHeight: '100%',
                                    maxWidth: '100%',
                                    objectFit: "contain"
                                }}
                                src={props.course.image}
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
                                        {creatorInfo.name}
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.abstract}>
                                <p>{abstract}</p>
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
