import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { Redirect } from "react-router";
import { useSelector } from 'react-redux';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import { set } from 'date-fns';
import Resizer from "react-image-file-resizer";




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

    categoryText: {
      margin: '20px'
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
  //const exampleCreator = "60d8b6e607304cf14a3a9faa"

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
  };

  const [difficulty, setDifficulty] = useState("")
  const handleDifficulty = (event) => {
  setDifficulty(event.target.value);
  };

  const [isPublic, setIsPublic] = useState(Boolean)
  const handleIsPublic = (event) => {
  setIsPublic(event.target.value);
  };

  const [category, setCategory] = useState("teach")
  const handleCategory = (event) => {
  setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    if (name === ""){
      alert("請輸入單元名稱")
      document.getElementById("name").focus()
    }
    else if (abstract === ""){
      alert("請輸入單元說明")
      document.getElementById("abstract").focus()
    }
    else{
      var course_info = {
        blockList: exampleBlockList,
        name,
        abstract,
        tags: tags.split(/[\s,]+/).filter((w) => w != ""),
        difficulty: parseInt(difficulty),
        isPublic: isPublic === 'true',
        category,
        image: imageLink
      }
      fetch(`${process.env.REACT_APP_BACKEND_URL}/course`, {
        method: 'POST',
        body: JSON.stringify(course_info),
        credentials: "include"
        })
      .then(res => res.json())
      .then(data => {
        setCourseID(data.CourseID);
        setIsSuccessful(true);
      })
      .catch(error => console.error('Error:', error))
      

    }
  }

  

  const [image, setImage] = useState()

  const [imageLink, setImageLink] = useState("")

  const imageSelectedHandler = (event) => {
    setImage(event.target.files[0])
  }

  const imageUploadHandler = (event) => {
    //console.log(image)
    const formdata = new FormData();
    formdata.append('image', image)
    const config = {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`
      },
    };
    
    axios.post("https://api.imgur.com/3/image", formdata, config)

    .then(data => {
      //console.log(data.data.data.link)
      setImageLink(data.data.data.link)
    })
    .catch(e => {
      console.log(e)
    })

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
                label="單元名稱"
                name="name"
                onChange={handleName}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="abstract"
                label="單元說明"
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
                label="單元標籤，請用空白分開"
                type="tags"
                id="tags"
                onChange={handleTags}
            />
            <span className={classes.difficultyText}>選擇單元難度</span>
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
                <option value={0}>初級</option>
                <option value={1}>中級</option>
                <option value={2}>進階</option>
              </Select>
            </FormControl>
            <span className={classes.publicText}>是否公開單元</span>
            <FormControl className={classes.formControl}>
              <Select
                native
                value={isPublic}
                onChange={handleIsPublic}
                label="公開單元"
                inputProps={{
                  name: 'isPublic',
                }}
              >
                <option value={true}>公開單元</option>
                <option value={false}>私人單元</option>
              </Select>
            </FormControl>
            <span className={classes.categoryText}>單元類別</span>
            <FormControl className={classes.formControl}>
              <Select
                native
                value={category}
                onChange={handleCategory}
                label="單元類別"
                inputProps={{
                  name: 'category',
                }}
              >
                <option value={"teach"}>教學用單元</option>
                <option value={"self-learn"}>自學用單元</option>
              </Select>
            </FormControl>
            <input type="file" onChange={imageSelectedHandler}/>
            <Button onClick={imageUploadHandler}>上傳單元封面</Button>
            <Button
                //type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
            >
                建立單元
            </Button>
            </form>
        </div>
      
    )
}