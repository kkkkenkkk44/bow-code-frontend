import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { Redirect } from "react-router";
import { useSelector } from 'react-redux';
import { resetForm } from '../../actions/createProblem';
import { useDispatch } from 'react-redux';

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

    const handleSubmit = (event) => {
        if (coursePlanID === ""){
            alert("請輸入教案 id")
            document.getElementById("coursePlan_id").focus()
        }
        else{
            var classroom_info = {
                name: name,
                coursePlan: coursePlanID,
                review: review === "true",
                apply: apply === "true",
                visibility: parseInt(visibility),
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
    }

    return(

      isSuccessful ? 
        <Redirect to={'/classroom/' + classroomID} />
      :
      <div className={classes.paper}>
          <form className={classes.form} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="coursePlan_id"
              label="教案 id"
              name=""
              onChange={handleCoursePlanID}
          />
          <Button
              //type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
          >
              建立教室
          </Button>
          </form>
      </div>
    )
}