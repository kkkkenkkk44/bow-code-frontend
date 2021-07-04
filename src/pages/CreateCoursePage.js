import { Typography, List, ListItem, ListItemText, Link, makeStyles } from '@material-ui/core'
import { shallowEqual, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import NavBar from '../components/NavBar'
import CreateCourseForm from '../components/CreateCourseForm'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));






export default function CreateCoursePage() {

    const classes = useStyles();

    return (
        <div>
            <NavBar context="Bow-Code" />
            <div className={classes.paper}>
                <Typography component="h1" variant="h6">
                    建立課程
                </Typography>
                <CreateCourseForm />
            </div>
        </div>
    )
}
