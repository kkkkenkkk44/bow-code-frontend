
import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Redirect, Route, Switch } from "react-router";




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
      width: '50%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },

    difficultyText: {
      marginRight: '40px',
      
    },

    publicText:{
      margin: '40px'
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


export default function CreatCourseForm() {

  const [isSuccessful, setIsSuccessful] = useState(false)

  const [CourseID, setCourseID] = useState()

  const classes = useStyles();
  const dispatch = useDispatch();

  const exampleBlockList = [];
  const exampleCreator = "60d8b6e607304cf14a3a9faa"

  const [name, setName] = useState("")
  const handleName= (event) => {
    setName(event.target.value);
  };

  const [abstract, setAbstract] = useState("")
  const handleAbstract = (event) => {
    setAbstract(event.target.value);
  };

  const [tags, setTags] = useState("")
  const handleTags = (event) => {
    setTags(event.target.value);
    tags.split(' ');
  };

  const [difficulty, setDifficulty] = useState("")
  const handleDifficulty = (event) => {
  setDifficulty(event.target.value);
  };

  const [isPublish, setIsPublish] = useState(Boolean)
  const handleIsPublish = (event) => {
  setIsPublish(event.target.value);
  };


  const handleSubmit = (event) => {
    if (name === ""){
      alert("請輸入課程名稱")
      document.getElementById("name").focus()
    }
    else if (abstract === ""){
      alert("請輸入課程說明")
      document.getElementById("abstract").focus()
    }
    else{
      var course_info = {
        blockList: exampleBlockList,
        name,
        abstract,
        creator: exampleCreator,
        tags,
        difficulty: parseInt(difficulty),
        isPublish,
      }
      fetch("http://140.112.106.174:8087/course", {
        method: 'POST',
        body: JSON.stringify(course_info)
        })
      .then(res => res.json())
      .then(data => {
        setCourseID(data.CourseID);
        setIsSuccessful(true);
        console.log('Success:', CourseID)
        console.log(isSuccessful)
      })
      .catch(error => console.error('Error:', error))
      

    }
  }

    return (
      isSuccessful ? 
        <Redirect to={'/courseEditor/' + CourseID} />
      :
        <div className={classes.paper}>
            <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="課程名稱"
                name="name"
                onChange={handleName}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="abstract"
                label="課程說明"
                type="abstract"
                id="abstract"
                onChange={handleAbstract}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="tags"
                label="課程標籤，請用空白分開"
                type="tags"
                id="tags"
                onChange={handleTags}
            />
            <span className={classes.difficultyText}>選擇課程難度</span>
            <FormControl className={classes.formControl}>
              <Select
                native
                value={difficulty}
                onChange={handleDifficulty}
                label=""
                inputProps={{
                  name: 'difficulty',
                }}
              >
                <option value={1}>初級</option>
                <option value={2}>中級</option>
                <option value={3}>進階</option>
              </Select>
            </FormControl>
            <span className={classes.publicText}>是否公開課程</span>
            <FormControl className={classes.formControl}>
              <Select
                native
                value={isPublish}
                onChange={handleIsPublish}
                label="公開課程"
                inputProps={{
                  name: 'isPublic',
                }}
              >
                <option value={true}>公開課程</option>
                <option value={false}>私人課程</option>
              </Select>
            </FormControl>
            <Button
                //type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
            >
                建立課程
            </Button>
            </form>
        </div>
      
    )
}