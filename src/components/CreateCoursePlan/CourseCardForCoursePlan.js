import React, { useState } from "react"
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar';

export default function CourseCardForCoursePlan(props) {
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

        courseID: {
            flex: 1,
            marginTop: '10px',
        },
    }));
    const classes = useStyles();
    const history = useHistory();

    const abstract = props.course.abstract
    const creator = props.course.creator
    const courseName = props.course.name
    const tags = props.course.tags
    var difficulty
    //console.log(props.course.difficulty)
    switch (props.course.difficulty) {
        case 0:
            difficulty = <div className={classes.difficulty}>
                <Typography variant="subtitle2" component="h3" style={{ marginRight: '5px' }}>
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

    const [selectCourseID, setSelectCourseID] = useState("")

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const clickAction = () => {
        console.log(props.course.id)
        setOpenSnackbar(true)
        setSelectCourseID(props.course.id);
        
        //console.log(selectCourseID)

    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }

    const onCopy = () => {
        console.log('Copied')
    }

    const tagChips = tags.map(tag => <Chip className={classes.tagChip} key={tag} label={tag} variant="outlined" />)

    return (
        props.brief ?
            <Card>          
                <CardContent className={classes.title}>
                    <h3>{props.course.name}</h3>
                </CardContent>    
            </Card> :
            <Card>
                <CopyToClipboard onCopy={onCopy} text={props.course.id}>
                    <CardActionArea onClick={clickAction}>
                    <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                        <Alert onClose={handleCloseSnackbar} severity="success">
                            成功複製單元 id !
                        </Alert>
                    </Snackbar>
                    <CardContent className={classes.info}>
                        <div className={classes.title}>
                            <Typography variant="h5" component="h3">
                                {courseName}
                            </Typography>
                            <div className={classes.author}>
                                <CreateIcon fontSize='inherit' style={{ marginRight: "2px" }} />
                                <Typography variant="caption" component="h3">
                                    {creator}
                                </Typography>
                            </div>
                        </div>
                        <div className={classes.courseID}>
                            <Typography variant="caption" component="h3">
                                單元 id ：
                                {props.course.id}
                            </Typography>
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
                </CopyToClipboard>
            </Card>
    )
}