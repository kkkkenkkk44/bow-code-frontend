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
import { changeName, changeReview, changeApply, changeVisibility } from "../../actions/createClassroom";

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

export default function CreateSingleClassroomForm() {

    const name = useSelector(state => state.createClassroomReducer.name)
    const review = useSelector(state => state.createClassroomReducer.review)
    const apply = useSelector(state => state.createClassroomReducer.apply)
    const visibility = useSelector(state => state.createClassroomReducer.visibility)

    const classes = useStyles();
    const dispatch = useDispatch()

    //const [name, setName] = useState("")
    const handleName= (e) => {
      //setName(event.target.value);
      dispatch(changeName(e.target.value));
    };

    //const [review, setReview] = useState(false)
    const handleReview = (e) => {
      //setReview(event.target.value);
      dispatch(changeReview(e.target.value));
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
                id="name"
                label="班級名稱"
                name="name"
                onChange={handleName}
            />
            <div className={classes.reviewText}>
              <span>班級是否需要審核</span>
              <FormControl className={classes.formControl}>
                <Select
                  native
                  value={review}
                  onChange={handleReview}
                  label="是否需要審核"
                  inputProps={{
                    name: 'review',
                  }}
                  className={classes.reviewValue}
                >
                  <option value={true}>需要審核</option>
                  <option value={false}>不需要審核</option>
                </Select>
              </FormControl>
            </div>
            <div className={classes.applyText}>
              <span>班級是否開放申請加入</span>
              <FormControl className={classes.formControl}>
                <Select
                  native
                  value={apply}
                  onChange={handleApply}
                  label="是否開放申請加入"
                  inputProps={{
                    name: 'apply',
                  }}
                  className={classes.applyValue}
                >
                  <option value={true}>開放申請加入</option>
                  <option value={false}>不開放申請加入</option>
                </Select>
              </FormControl>
            </div>
            <div className={classes.visibilityText}>
              <span>班級權限</span>
              <FormControl className={classes.formControl}>
                <Select
                  native
                  value={visibility}
                  onChange={handleVisibility}
                  label="班級權限"
                  inputProps={{
                    name: 'visibility',
                  }}
                  className={classes.visibilityValue}
                >
                  <option value={0}>不公開</option>
                  <option value={1}>公開</option>
                </Select>
              </FormControl>
            </div>
            </form>
        </div>
    )
}