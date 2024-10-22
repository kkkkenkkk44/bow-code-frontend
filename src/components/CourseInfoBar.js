import React, { useEffect, useState, useRef } from 'react'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add'
import FavoriteIcon from '@material-ui/icons/Favorite';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { useParams } from 'react-router-dom';
import loginReducer from '../redux/loginReducer.js';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from "react-router-dom";
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
import { TramRounded } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import { changeName, changeVisibility } from '../actions/createCoursePlan';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
    },

    title: {
        marginLeft: theme.spacing(1),
        flexGrow: 1,
        margin: '20px',
        marginLeft: '20px',

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
        marginLeft: '20px',


    },
    creator: {
        marginLeft: theme.spacing(1),
        margin: '20px',
        marginLeft: '20px',

    },
    left: {
        float: 'left'
        //flexShrink: '0',
    },
    button: {
        margin: theme.spacing(1),
        width: '90%',
        paddingLeft: '20px',
        flex: '1',
    },
    functionButton: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    addNewCoursePlan: {
        alignItems: 'right',
        maxWidth: '100%',
    }
}));

export default function CourseInfoBar(props) {
    const classes = useStyles()

    const { CourseID } = useParams()

    const [open, setOpen] = useState(false);

    const [isCreator, setIsCreator] = useState(false)

    const user = useSelector(state => state.loginReducer.user)

    const isLogin = useSelector(state => state.loginReducer.isLogin)

    const coursePlanListFromReducer = useSelector(state => state.coursePlanEditorReducer.coursePlanList)

    const name = useSelector(state => state.createCoursePlanReducer.name)
    const visibility = useSelector(state => state.createCoursePlanReducer.visibility)

    const handleName = (event) => {
        dispatch(changeName(event.target.value));
    };

    const handleVisibility = (event) => {
        dispatch(changeVisibility(event.target.value));
    };

    const history = useHistory();
    const dispatch = useDispatch()

    const route2PreviousPage = () => {
        history.goBack()
    }

    function checkUserIsCreator() {
        if (props.creator.id === user.id) {
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

    const [selectedCoursePlanID, setSelectedCoursePlanID] = useState("");

    const [prevCoursePlanDetail, setPrevCoursePlanDetail] = useState({})

    const handleChange = (event) => {
        setSelectedCoursePlanID(event.target.value);
    };

    const handleOpenCoursePlanDialog = () => {
        setOpenCoursePlanDialog(true)
        //console.log(coursePlanListFromReducer)
    }

    const handleCloseCoursePlanDialog = () => {
        setIsClickedAddButton(false)
        setOpenCoursePlanDialog(false)
        setSelectedCoursePlanID("")
        //setIsClickedAddButton(false)
    }

    const handleSubmit = () => {
        {
            isClickedAddButton ?
                createNewCoursePlanAndAddCourse()
                :
                fetchSelectedCoursePlanDetail()
            setOpenCoursePlanDialog(false)
        }
    }

    function fetchSelectedCoursePlanDetail() {

        fetch(`${process.env.REACT_APP_BACKEND_URL}/course_plan/${selectedCoursePlanID}`, {
            method: 'GET',
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                //setPrevCoursePlanDetail(data)
                //console.log(prevCoursePlanDetail)
                updateCoursePlan(data)
            }
            )
        //.then(console.log(prevCoursePlanDetail))
    }

    function updateCoursePlan(data) {
        //console.log(prevCoursePlanDetail)
        data.componentList.push({
            name: props.context,
            type: 0,
            setList: [{ id: CourseID }],
        })
        var update_coursePlan_info = {
            name: data.name,
            componentList: data.componentList,
            visibility: data.visibility,
        }
        //console.log(update_coursePlan_info)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course_plan/${selectedCoursePlanID}`, {
            method: 'POST',
            body: JSON.stringify(update_coursePlan_info),
            credentials: "include",
        })
            .catch(error => console.error('Error:', error))
    }


    function fetchCoursePlanIDList() {

        fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${user.id}`, {
            method: 'GET',
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data.ownCoursePlanList)
                var tempCoursePlanList = []
                Promise.all(data.ownCoursePlanList.map(ownCoursePlanID => {
                    fetch(`${process.env.REACT_APP_BACKEND_URL}/course_plan/${ownCoursePlanID}`, {
                        method: 'GET',
                        credentials: "include"
                    })
                        .then(res => res.json())
                        .then(res => {
                            //console.log(res)
                            tempCoursePlanList.push({ 'id': ownCoursePlanID, 'name': res.name, 'visibility': res.visibility })
                        })

                }))
                    .then(
                        dispatch({ type: "STORE_COURSEPLANLIST", payload: tempCoursePlanList })
                    )
            })
    }


    const radioGroupRef = useRef(null);

    useEffect(() => {
        checkUserIsCreator()
        if (isLogin) {
            fetchCoursePlanIDList()
        }
    }, [isLogin])





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

    const [isClickedAddButton, setIsClickedAddButton] = useState(false)

    const displayCreateCoursePlanForm = () => {
        setIsClickedAddButton(true)
    }

    function createNewCoursePlanAndAddCourse() {
        var coursePlan_info = {
            name: name,
            componentList: [{
                name: props.context,
                type: 0,
                setList: [{ id: CourseID }]
            }],
            visibility: parseInt(visibility),
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course_plan`, {
            method: 'POST',
            body: JSON.stringify(coursePlan_info),
            credentials: "include"
        })
            .catch(error => console.error('Error:', error))
    }

    const [redirectToCourseDetailPage, setRedirectToCourseDetailPage] = useState(false)

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
                        {`創建者：${props.creator.userInfo.name}`}
                    </Typography>
                </div>
                {props.forEditor ?
                    <div className={classes.button}>
                        <Tooltip title="結束編輯" TransitionComponent={Zoom}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.functionButton}
                                startIcon={<CheckIcon />}
                                style={isLogin ? { display: '' } : { display: 'none' }}
                                onClick={() => setRedirectToCourseDetailPage(true)}
                            >
                                完成
                            </Button>
                        </Tooltip>
                    </div>
                    :
                    <div className={classes.button}>
                        <Tooltip title="收藏單元" TransitionComponent={Zoom}>
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
                                    {coursePlanListFromReducer.map((coursePlan) => (
                                        <FormControlLabel value={coursePlan.id} key={coursePlan.id} control={<Radio />} label={coursePlan.name} />
                                    ))}
                                </RadioGroup>
                            </DialogContent>
                            <DialogContent dividers >
                                <ListItem button onClick={displayCreateCoursePlanForm}>
                                    <AddIcon />
                                    <ListItemText primary="建立新教案並加入此教案" style={{ 'paddingLeft': '10px' }} />

                                </ListItem>
                                <ListItem >
                                    {isClickedAddButton ?
                                        <TextField
                                            id="name"
                                            label="教案名稱"
                                            onChange={handleName}
                                        />
                                        :
                                        null
                                    }
                                </ListItem>
                                <ListItem style={{ 'marginTop': '20px' }}>
                                    {isClickedAddButton ?
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-label">教案權限</InputLabel>
                                            <Select
                                                native
                                                value={visibility}
                                                onChange={handleVisibility}
                                                label="教案權限"
                                                inputProps={{
                                                    name: 'visibility',
                                                }}
                                                className={classes.visibilityValue}
                                            >
                                                <option value={0}>不公開</option>
                                                <option value={1}>公開</option>
                                            </Select>
                                            <Button variant="outlined" color="secondary" style={{ marginTop: '20px' }} onClick={() => setIsClickedAddButton(false)}>
                                                取消建立
                                            </Button>
                                        </FormControl>
                                        :
                                        null
                                    }
                                </ListItem>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleCloseCoursePlanDialog} color="primary">
                                    取消
                                </Button>
                                <Button onClick={handleSubmit} color="primary" disabled={selectedCoursePlanID === ""}>
                                    {isClickedAddButton ?
                                        <div>確定建立並加入</div>
                                        :
                                        <div>確定加入</div>
                                    }
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Tooltip title="編輯單元" TransitionComponent={Zoom}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.functionButton}
                                startIcon={<CreateIcon />}
                                style={isCreator ? { display: '' } : { display: 'none' }}
                                onClick={() => history.push(`/courseEditor/${CourseID}`)}
                            >
                                編輯
                            </Button>
                        </Tooltip>
                        <Tooltip title="刪除單元" TransitionComponent={Zoom}>
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
                }
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"是否要刪除此單元?"}</DialogTitle>
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
            {redirectToCourseDetailPage ?
                <Redirect to={`/course/${CourseID}`} />
                :
                <></>
            }
        </div>
    )
}