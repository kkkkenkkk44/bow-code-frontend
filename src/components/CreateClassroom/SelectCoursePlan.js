import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { Redirect } from "react-router";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add'
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },

    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '50%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },

  }));

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export default function SelectCoursePlan() {

    const classes = useStyles();
    const dispatch = useDispatch()
    const user = useSelector(state => state.loginReducer.user)
    const isLogin = useSelector(state => state.loginReducer.isLogin)

    const [isSuccessful, setIsSuccessful] = useState(false)
    const [classroomID, setClassroomID] = useState("")

    const [coursePlanID, setCoursePlanID] = useState("")
    const handleCoursePlanID= (event) => {
      setCoursePlanID(event.target.value);
    };

    const name = useSelector(state => state.createClassroomReducer.name)
    const review = useSelector(state => state.createClassroomReducer.review)
    const apply = useSelector(state => state.createClassroomReducer.apply)
    const visibility = useSelector(state => state.createClassroomReducer.visibility)

    const [selectedCoursePlanID, setSelectedCoursePlanID] = useState("");
    const [openCoursePlanDialog, setOpenCoursePlanDialog] = useState(false)

    const coursePlanListFromReducer = useSelector(state => state.coursePlanEditorReducer.coursePlanList)

    const handleChange = (event) => {
      setSelectedCoursePlanID(event.target.value);
    };

    const handleOpenCoursePlanDialog = () => {
      setOpenCoursePlanDialog(true)
      console.log(coursePlanListFromReducer)
    }

    const handleCloseCoursePlanDialog = () => {
      setOpenCoursePlanDialog(false)
      setSelectedCoursePlanID("")
    }

    const handleSubmitCoursePlan = () => {
      console.log(selectedCoursePlanID)
      setOpenCoursePlanDialog(false)
    }
    const handleSubmit = (event) => {
          var classroom_info = {
              name: name,
              coursePlan: selectedCoursePlanID,
              review: review,
              apply: true,
              visibility: parseInt("1"),
          }
          console.log(classroom_info)
          fetch(`${process.env.REACT_APP_BACKEND_URL}/classroom`, {
              method: 'POST',
              body: JSON.stringify(classroom_info),
              credentials: "include"
              })
          .then(res => res.json())
          .then(data => {
            setClassroomID(data.ClassroomID);
            setIsSuccessful(true);
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
      if (isLogin) {
          fetchCoursePlanIDList()
      }
  }, [isLogin])

    return(

      isSuccessful ? 
        <Redirect to={'/classroom/' + classroomID} />
      :
      <div className={classes.paper}>
          <form className={classes.form} noValidate>
          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.functionButton}
                            onClick={handleOpenCoursePlanDialog}
                        >
                            選擇教案
                        </Button>
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
                        <DialogActions>
                            <Button autoFocus onClick={handleCloseCoursePlanDialog} color="primary">
                                取消
                            </Button>
                            <Button onClick={handleSubmitCoursePlan} color="primary" disabled={selectedCoursePlanID === ""}>
                                <div>確定選擇</div>
                            </Button>
                        </DialogActions>
            </Dialog>
          <Button
              //type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
          >
              建立班級
          </Button>
          </form>
      </div>
    )
}