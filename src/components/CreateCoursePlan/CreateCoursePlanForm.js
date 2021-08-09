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
import { changeName, changeVisibility } from '../../actions/createCoursePlan';

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

export default function CreateCoursePlanForm() {

    const classes = useStyles();
    const dispatch = useDispatch()

    const name = useSelector(state => state.createCoursePlanReducer.name)
    const visibility = useSelector(state => state.createCoursePlanReducer.visibility)

    const handleName= (event) => {
      dispatch(changeName(event.target.value));
    };

    const handleVisibility = (event) => {
      dispatch(changeVisibility(event.target.value));
    };

    return (
        <div className={classes.paper}>
            <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="教案名稱"
                name="name"
                onChange={handleName}
            />
            <span className={classes.visibilityText}>教案權限</span>
            <FormControl className={classes.formControl}>
              <Select
                native
                value={visibility}
                onChange={handleVisibility}
                label="教案權限"
                inputProps={{
                  name: 'visibility',
                }}
              >
                <option value={0}>不公開</option>
                <option value={1}>公開</option>
              </Select>
            </FormControl>
            </form>
        </div>
    )
}