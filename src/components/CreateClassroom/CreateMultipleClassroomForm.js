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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { changeReview, changeApply, changeVisibility, changeCoursePlanID } from "../../actions/createClassroom";

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

    visibilityText: {
      margin: '20px',
    },

    reviewText: {
      margin: '20px',
    },

    applyText: {
      margin: '20px',
    },

    visibilityValue: {
      marginLeft: '20px',
    },

    reviewValue: {
      marginLeft: '20px',
    },

    applyValue: {
      marginLeft: '20px',
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

export default function CreateMultipleClassroomForm() {

    const coursePlanID = useSelector(state => state.createClassroomReducer.coursePlanID)
    const review = useSelector(state => state.createClassroomReducer.review)
    const apply = useSelector(state => state.createClassroomReducer.apply)
    const visibility = useSelector(state => state.createClassroomReducer.visibility)

    const classes = useStyles();
    const dispatch = useDispatch()

    const handleCoursePlanID= (e) => {
        //setName(event.target.value);
        dispatch(changeCoursePlanID(e.target.value));
      };

    const handleReview = (e) => {

        dispatch(changeReview(e.target.checked));
      };
  
      //const [apply, setApply] = useState(true)
      const handleApply = (e) => {
        //setApply(event.target.value);
        dispatch(changeApply(e.target.value));
      }
  
      //const [visibility, setVisibility] = useState(0)
      const handleVisibility = (e) => {
        //setVisibility(event.target.value);
        dispatch(changeVisibility(e.target.value));
      };

    return (

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
            <div className={classes.reviewText}>
              <FormControl className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={review} onChange={handleReview} name="review" />
                    }
                    label="申請需要老師審核"
                  />
                </FormGroup>
              </FormControl>
            </div>
            </form>
        </div>

    )

}