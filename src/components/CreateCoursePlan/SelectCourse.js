import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { Redirect } from "react-router";
import { useSelector } from 'react-redux';
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

export default function SelectCourse() {

    const classes = useStyles();

    const [coursePlanID, setCoursePlanID] = useState("")
    const name = useSelector(state => state.createCoursePlanReducer.name)
    const visibility = useSelector(state => state.createCoursePlanReducer.visibility)

    const handleSubmit = (event) => {
        var coursePlan_info = {
            name: name,
            courseList: ["60f019b561f4bfba10d74e39", "60f01a7a61f4bfba10d74e3a", "60f053fe61f4bfba10d74e3d"],
            visibility: parseInt(visibility),
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course_plan`, {
            method: 'POST',
            body: JSON.stringify(coursePlan_info),
            credentials: "include"
            })
        .then(res => res.json())
        .then(data => {
          setCoursePlanID(data.CoursePlanID);
          //setIsSuccessful(true);
        })
        .catch(error => console.error('Error:', error))

    }

    return(
        <div>
            <Button
              //type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
          >
              建立教案
          </Button>
        </div>
    )
}
