import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar, Typography, Link, Grid } from '@material-ui/core';
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
import { set } from 'date-fns';
import { useParams } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

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
    const { ProblemID } = useParams()
    const isLogin = useSelector(state => state.loginReducer.isLogin)
    const radioGroupRef = useRef(null);
    const componentRadioGroupRef = useRef(null);
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

    const [selectedComponent, setSelectedComponent] = useState("");

    const [isSelectedCoursePlan, setIsSelectedCoursePlan] = useState(false)

    //const [selectedCoursePlanComponent, setSelectedCoursePlanComponent] = useState([])

    const selectedCoursePlanComponentListFromReducer = useSelector(state => state.coursePlanEditorReducer.selectedCoursePlanComponentList)
    const selectedCoursePlanDetailFromReducer = useSelector(state => state.coursePlanEditorReducer.selectedCoursePlanDetail)


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
                //console.log(data)
                var tempSelectedCoursePlanComponentList = []
                dispatch({ type: "STORE_SELECTEDCOURSEPLANDETAIL", payload: data })
                Promise.all(data.componentList.map(element  => {
                    tempSelectedCoursePlanComponentList.push({ 'id': data.componentList.indexOf(element).toString(), 'name': element.name, 'type': element.type, 'setList': element.setList})
                }))
                dispatch({ type: "STORE_SELECTEDCOURSEPLANCOMPONENTLIST", payload: tempSelectedCoursePlanComponentList })
            
            
            }
            )
    }

    const handleChangeCoursePlan = (event) => {
        setSelectedCoursePlanID(event.target.value);
        setIsSelectedCoursePlan(true)
        fetchSelectedCoursePlanDetail(event.target.value)
    };

    const handleOpenCoursePlanDialog = () => {
        setOpenCoursePlanDialog(true)
    }

    const handleCloseCoursePlanDialog = () => {
        setIsClickedAddButton(false)
        setOpenCoursePlanDialog(false)
        console.log(selectedCoursePlanDetailFromReducer)
        console.log(selectedCoursePlanComponentListFromReducer)
        console.log(selectedComponent)
        
    }
    const handleAddProblem = () => {
        {isClickedAddButton ?
            createNewComponentAndAddProblem(selectedCoursePlanDetailFromReducer)
        :
            updateCoursePlan(selectedCoursePlanDetailFromReducer)
            setOpenCoursePlanDialog(false)
        }
    }

    const handleChangeComponent = (event) => {
        setSelectedComponent(event.target.value)

    }

    function updateCoursePlan(prevCoursePlanDetail) {
        prevCoursePlanDetail.componentList[parseInt(selectedComponent)].setList.push({ id: ProblemID })
        var update_coursePlan_info = {
            name: prevCoursePlanDetail.name,
            componentList: prevCoursePlanDetail.componentList,
            visibility: prevCoursePlanDetail.visibility,
        }
        //console.log(update_coursePlan_info)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course_plan/${selectedCoursePlanID}`, {
            method: 'POST',
            body: JSON.stringify(update_coursePlan_info),
            credentials: "include",
        })
        .catch(error => console.error('Error:', error))
    }

    const [isClickedAddButton, setIsClickedAddButton] = useState(false)

    const displayCreateComponentForm = () => {
        setIsClickedAddButton(true)
    }

    const [examOrHomeworkName, setExamOrHomeworkName] = useState("")

    const handleName = (event) => {
        setExamOrHomeworkName(event.target.value)
    }

    const [problemType, setProblemType] = useState("1")

    const handleProblemType = (event) => {
        setProblemType(event.target.value)
    }

    function createNewComponentAndAddProblem(prevCoursePlanDetail) {
        prevCoursePlanDetail.componentList.push({
            name: examOrHomeworkName,
            type: parseInt(problemType),
            setList: [{ id: ProblemID}]
        })
        var update_coursePlan_info = {
            name: prevCoursePlanDetail.name,
            componentList: prevCoursePlanDetail.componentList,
            visibility: prevCoursePlanDetail.visibility,
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course_plan/${selectedCoursePlanID}`, {
            method: 'POST',
            body: JSON.stringify(update_coursePlan_info),
            credentials: "include",
        })
        .catch(error => console.error('Error:', error))

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
                        maxWidth='sm'
                        fullWidth={true}
                        aria-labelledby="confirmation-dialog-title"
                        open={openCoursePlanDialog}
                        onClose={handleCloseCoursePlanDialog}
                    >
                        <DialogTitle id="confirmation-dialog-title">選擇教案</DialogTitle>
                        <DialogContent dividers>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
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
                                </Grid>
                                { isSelectedCoursePlan ?
                                    <Grid item xs={12} sm={6} >
                                        <RadioGroup
                                            ref={componentRadioGroupRef}
                                            aria-label="ringtone"
                                            name="componentList"
                                            value={selectedComponent}
                                            onChange={handleChangeComponent}
                                            >
                                            {selectedCoursePlanComponentListFromReducer.map((option) => (
                                                <FormControlLabel value={option.id} key={option.id} control={<Radio />} label={option.name} />
                                            ))}
                                        </RadioGroup>
                                        <Divider />
                                        <ListItem button onClick={displayCreateComponentForm}>
                                            <AddIcon />
                                            <ListItemText primary="建立新考試或作業並加入" style={{'paddingLeft': '10px'}}/>
                                        </ListItem>
                                        <ListItem >
                                        {isClickedAddButton ? 
                                            <TextField
                                                id="name"
                                                label="考試或作業名稱"
                                                onChange={handleName}
                                            />   
                                        :
                                            null
                                        }
                                        </ListItem>
                                        <ListItem style={{'marginTop': '20px'}}>
                                        {isClickedAddButton ? 
                                            <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-label">類型</InputLabel>
                                                <Select
                                                    native
                                                    value={problemType}
                                                    onChange={handleProblemType}
                                                    label="類型"
                                                    inputProps={{
                                                    name: 'type',
                                                    }}
                                                    //className={classes.visibilityValue}
                                                >
                                                    <option value={1}>作業</option>
                                                    <option value={2}>考試</option>
                                                </Select>
                                            </FormControl> 
                                        :
                                            null
                                        }
                                        </ListItem>
                                        
                                    </Grid>
                                    :
                                    null
                                }
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleCloseCoursePlanDialog} color="primary">
                                取消
                            </Button>
                            <Button onClick={handleAddProblem} color="primary">
                                {isClickedAddButton ?
                                <div>確定建立並加入</div>
                                :
                                <div>確定加入</div>
                                }
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