import React, { useEffect, useState, useRef } from 'react'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { useParams } from 'react-router-dom';
import loginReducer from '../redux/loginReducer.js';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
    },

    title: {
        marginLeft: theme.spacing(1),
        flexGrow: 1,
        margin: '20px',
        marginLeft: '280px',

    },
    toolbar: {
        height: '100%'
    },
    appbar: {
        height: "100%",
        background: "rgba(104, 144, 79, 0.3)",
        color: '#000000',
        display: 'flex',

    },
    abstract: {
        marginLeft: theme.spacing(1),
        margin: '20px',
        marginLeft: '280px',


    },
    creator: {
        marginLeft: theme.spacing(1),
        margin: '20px',
        marginLeft: '280px',

    },
    left: {
        float: 'left'
        //flexShrink: '0',
    },
    button: {
        margin: theme.spacing(1),
        width: '90%',
        paddingLeft: '265px',
        flex: '1',
    },
    functionButton: {
        margin: theme.spacing(1),
        width: '8%',
        position: 'relative',
    },
}));

export default function CourseInfoBar(props) {
    const classes = useStyles()

    const { CourseID } = useParams()

    const [open, setOpen] = useState(false);

    const [isCreator, setIsCreator] = useState(false)

    const user = useSelector(state => state.loginReducer.user)

    const isLogin = useSelector(state => state.loginReducer.isLogin)

    const history = useHistory();
    const dispatch = useDispatch()

    const route2PreviousPage = () => {
        history.goBack()
    }

    function checkUserIsCreator() {
        if (props.creator === user.id) {
            setIsCreator(true)
        }
        else {
            setIsCreator(false)
        }
    }


    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
    
    const [openCoursePlanDialog, setOpenCoursePlanDialog] = useState(false)

    const [coursePlanList, setCoursePlanList] = useState([])
    const [selectedCoursePlanID, setSelectedCoursePlanID] = useState("");

    const handleChange = (event) => {
        setSelectedCoursePlanID(event.target.value);
      };

    const handleOpenCoursePlanDialog = () => {
        setOpenCoursePlanDialog(true)
        fetchCoursePlanIDList()
    }

    const handleCloseCoursePlanDialog = () => {
        setCoursePlanList([])
        setOpenCoursePlanDialog(false)
    }

    const handleSubmit = () => {
        console.log(selectedCoursePlanID)
    }


    function fetchCoursePlanIDList () {


        fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${user.id}`, {
            method: 'GET',
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data.ownCoursePlanList)
                Promise.all(data.ownCoursePlanList.map(ownCoursePlanID => {
                    fetch(`${process.env.REACT_APP_BACKEND_URL}/course_plan/${ownCoursePlanID}`, {
                        method: 'GET',
                        credentials: "include"
                    })
                    .then(res => res.json())
                    .then(res => {
                        //console.log(res.name)
                        setCoursePlanList((prev) => [...prev, {'id': ownCoursePlanID, 'name': res.name}])
                
                    })

                    //.then(setUniqueCoursePlanList(coursePlanList.filter(onlyUnique)))
                    
                }))
                
                
            })
            

    }


    const radioGroupRef = useRef(null);

    useEffect(() => {
        checkUserIsCreator()

    }, [user])


    const handleFavoriteCourse = () => {
        //send request to favorite the course.
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${CourseID}/favorite`, {
            method: 'POST',
            credentials: "include"
        })
            .then(
                console.log('Success', '200 OK')
            )
            .catch(error => console.error('Error:', error))
    }

    const handleDeleteCourseButton = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteCourse = () => {
        //send a request to delete the course.
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${CourseID}`, {
            method: 'DELETE',
            credentials: "include"
        })
            .then(
                console.log('Success', '200 OK')
            )
            .catch(error => console.error('Error:', error))
    }

    return (
        <div>
            <AppBar position="static" className={classes.appbar} elevation={3}>
                <div className={classes.left}>
                <Typography variant="h4" className={classes.title}>
                    {props.context}
                </Typography>
                <Typography variant="h6" className={classes.abstract}>
                    {props.abstract}
                </Typography>
                <Typography className={classes.creator}>
                    {`創建者：${props.creator}`}
                </Typography>
                </div>
                <div className={classes.button}>
                    <Tooltip title="收藏課程" TransitionComponent={Zoom}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.functionButton}
                            startIcon={<FavoriteIcon />}
                            style={isLogin ? { display: '' } : { display: 'none' }}
                            onClick={handleFavoriteCourse}
                        >
                            收藏
                        </Button>
                    </Tooltip>
                    <Tooltip title="加入教案" TransitionComponent={Zoom}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.functionButton}
                            startIcon={<PlaylistAddIcon />}
                            style={isLogin ? { display: '' } : { display: 'none' }}
                            onClick={handleOpenCoursePlanDialog}
                        >
                            加入
                        </Button>
                    </Tooltip>
                    <Dialog
                        maxWidth='xs'
                        fullWidth={true}
                        aria-labelledby="confirmation-dialog-title"
                        open={openCoursePlanDialog}
                        onClose={handleCloseCoursePlanDialog}
                        >
                        <DialogTitle id="confirmation-dialog-title">選擇教案</DialogTitle>
                        <DialogContent dividers>
                        <RadioGroup
                            ref={radioGroupRef}
                            aria-label="ringtone"
                            name="coursePlanList"
                            value={selectedCoursePlanID}
                            onChange={handleChange}
                            >
                            {coursePlanList.map((coursePlan) => (
                                <FormControlLabel value={coursePlan.id} key={coursePlan.id} control={<Radio />} label={coursePlan.name} />
                            ))}
                            </RadioGroup>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleCloseCoursePlanDialog} color="primary">
                            取消
                            </Button>
                            <Button onClick={handleSubmit} color="primary">
                            確定
                            </Button>
                        </DialogActions>
                        </Dialog>
                    <Tooltip title="編輯課程" TransitionComponent={Zoom}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.functionButton}
                            startIcon={<CreateIcon />}
                            style={isCreator ? { display: '' } : { display: 'none' }}
                            onClick={()=>history.push(`/courseEditor/${CourseID}`)}
                        >
                            編輯
                        </Button>
                    </Tooltip>
                    <Tooltip title="刪除課程" TransitionComponent={Zoom}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.functionButton}
                            startIcon={<DeleteIcon />}
                            style={isCreator ? { display: '' } : { display: 'none' }}
                            onClick={handleDeleteCourseButton}
                        >
                            刪除
                        </Button>
                    </Tooltip>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"是否要刪除此課程?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={() => {
                            handleDeleteCourse()
                            route2PreviousPage()
                        }
                        } color="secondary">
                            刪除
                        </Button>
                    </DialogActions>
                </Dialog>
            </AppBar>
        </div>
    )
}