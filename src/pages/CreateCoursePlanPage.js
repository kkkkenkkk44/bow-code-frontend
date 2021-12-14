import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateCoursePlanForm from '../components/CreateCoursePlan/CreateCoursePlanForm';
import SelectCourse from '../components/CreateCoursePlan/SelectCourse';
import NavBar from '../components/NavBar'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    stepContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    stepContentBody: {
      width: '60%',
      marginBottom: '20px'
    },
    stepper: {
      marginLeft: '15%',
      marginRight: '15%'
    }
  }));

export default function CreateCoursePlanPage() {
    const classes = useStyles();
    return(
        <div>
            <NavBar context="CoDAI 教室" />
            <div className={classes.paper}>
                <Typography component="h1" variant="h6">
                    建立教案
                </Typography>
                <CreateCoursePlanForm />
            </div>
        </div>
    )
  }