import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar, Typography, Link } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { React, useState, useRef, useEffect } from "react";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Avatar } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';
import { getLanguageID } from "../constants";
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Form } from 'reactstrap';

const useStyles = makeStyles((theme) => ({
    appbar: {
        // height: "50px",
        background: "rgba(144, 144, 144, 1)",
        top: 'auto',
        bottom: 0, 
        zIndex: "100",
    },
    context: {
        flexGrow: 1
    },
    submitButton: {
        color: "#ffffff",
    },
    submissionButton: {
        // flexGrow: 2,
        color: "#ffffff",
    },
    functionButton: {
        margin: theme.spacing(1),
        width: '8%',
        position: 'relative',
    },
}));

export default function SubmitBar(props) {
    const classes = useStyles()
    const isLogin = useSelector(state => state.loginReducer.isLogin)
    const radioGroupRef = useRef(null);
    const coursePlanListFromReducer = useSelector(state => state.coursePlanEditorReducer.coursePlanList)
    const user = useSelector(state => state.loginReducer.user)
    const dispatch = useDispatch()
    const [isCreator, setIsCreator] = useState(false)
    

    function checkUserIsCreator() {
        if (props.creator === user.id) {
            setIsCreator(true)
        }
        else {
            setIsCreator(false)
        }
    }


    const handleSubmit = () => {
        var submission = {
            sourceCode: props.sourceCode,
            languageID: getLanguageID(props.language)
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/submit/problem/${props.ProblemID}`, {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(submission)
        })
            .then(res => res.json())
            .then(res => {
                props.handleCheckSubmission()
            })
    }

    const [openCoursePlanDialog, setOpenCoursePlanDialog] = useState(false)

    const [selectedCoursePlanID, setSelectedCoursePlanID] = useState("");

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

    function fetchSelectedCoursePlanDetail(coursePlanID) {

        fetch(`${process.env.REACT_APP_BACKEND_URL}/course_plan/${coursePlanID}`, {
            method: 'GET',
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.componentList)
                //setPrevCoursePlanDetail(data)
                //console.log(prevCoursePlanDetail)
                //updateCoursePlan(data)
            }
            )
            //.then(console.log(prevCoursePlanDetail))
    }

    const handleChangeCoursePlan = (event) => {
        setSelectedCoursePlanID(event.target.value);
        fetchSelectedCoursePlanDetail(event.target.value)
    };

    const handleOpenCoursePlanDialog = () => {
        setOpenCoursePlanDialog(true)
        //console.log(coursePlanListFromReducer)
    }

    const handleCloseCoursePlanDialog = () => {
        setOpenCoursePlanDialog(false)
    }
    const handleAddProblem = () => {
        console.log("aaa")
    }


    useEffect(() => {
        checkUserIsCreator()
        if (isLogin) {
            fetchCoursePlanIDList()
        }
    }, [isLogin])

    return (
        <AppBar position="fixed" color="primary" className={classes.appbar} elevation={3}>
            <Toolbar className={classes.toolbar}>
                {/* <Typography className={classes.context}>123</Typography> */}
                <Button className={classes.submissionButton} onClick={props.handleCheckSubmission}>
                    作答紀錄
                </Button>
                <Tooltip title="加入教案" TransitionComponent={Zoom}>
                        <Button
                            variant="contained"
                            //color="secondary"
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
                                onChange={handleChangeCoursePlan}
                            >
                                {coursePlanListFromReducer.map((coursePlan) => (
                                    <FormControlLabel value={coursePlan.id} key={coursePlan.id} control={<Radio />} label={coursePlan.name} />
                                ))}
                            </RadioGroup>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleCloseCoursePlanDialog} color="primary">
                                取消
                            </Button>
                            <Button onClick={handleAddProblem} color="primary">
                                確定
                            </Button>
                        </DialogActions>
                    </Dialog>
                <div className={classes.context}></div>
                <Button className={classes.submitButton} onClick={handleSubmit}>
                    提交
                </Button>
            </Toolbar>
        </AppBar>
    )

}