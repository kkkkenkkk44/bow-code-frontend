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
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '93%',
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

    visibilityValue: {
      marginLeft: '20px',
    },

  }));



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

    const [isSuccessful, setIsSuccessful] = useState(false)
    const [coursePlanID, setCoursePlanID] = useState("")

    const handleSubmit = (event) => {
      var coursePlan_info = {
          name: name,
          componentList: [],
          visibility: parseInt(visibility),
      }
      fetch(`${process.env.REACT_APP_BACKEND_URL}/course_plan`, {
          method: 'POST',
          body: JSON.stringify(coursePlan_info),
          credentials: "include"
          })
      .then(res => res.json())
      .then(data => {
        setCoursePlanID(data.CoursePlanID)
        setIsSuccessful(true);
      })
      .catch(error => console.error('Error:', error))
      //console.log(courseIDs)

  }


    return (
      isSuccessful ? 
      <Redirect to={'/coursePlanEditor/' + coursePlanID} />
      :
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
            <div className={classes.visibilityText}>
              <span>教案權限</span>
              <FormControl className={classes.formControl}>
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
              </FormControl>
              </div>
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
            </form>
        </div>
    )
}