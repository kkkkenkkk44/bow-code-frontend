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

    difficultyText: {
      marginRight: '20px',
        
    },

    contentText: {
      marginTop: theme.spacing(8),
      textAlign: 'center',
    },

    categoryText: {
      margin: '20px',
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

export default function CreatProblemForm() {
    const [isSuccessful, setIsSuccessful] = useState(false)
    const classes = useStyles();

    const [ProblemID, setProblemID] = useState()

    const [name, setName] = useState("")
    const handleName= (event) => {
      setName(event.target.value);
    };

    const [tags, setTags] = useState("")
    const handleTags = (event) => {
        setTags(event.target.value);
    };

    const [difficulty, setDifficulty] = useState("easy")
    const handleDifficulty = (event) => {
    setDifficulty(event.target.value);
    };

    const [category, setCategory] = useState("exam")
    const handleCategory = (event) => {
    setCategory(event.target.value);
    };

    const [visibility, setVisibility] = useState("self")
    const handleVisibility = (event) => {
    setVisibility(event.target.value);
    };

    const [content, setContent] = useState("")

    const user = useSelector(state => state.loginReducer.user)
    const desc = useSelector(state => state.createProblemReducer.description)
    const testdatas = useSelector(state => state.createProblemReducer.testdatas)

    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        if (name === ""){
          alert("請輸入題目名稱")
          document.getElementById("name").focus()
        }
        else{
          var testcase_input = []
          var testcase_output = []
          testdatas.forEach((data)=>{
            testcase_input.push(data.input)
            testcase_output.push(data.output)
          })
          var problem_info = {
            name,
            tags: tags.split(' '),
            difficulty: parseInt(difficulty),
            creator: user.id,
            category,
            testcase: {
              testcaseCnt: testcase_input.length,
              input: testcase_input,
              expectedOutput: testcase_output
            },
            description: desc,
            visibility: parseInt(visibility),
            content: content,
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/problem`, {
            method: 'POST',
            body: JSON.stringify(problem_info),
            credentials: "include"
            })
        .then(res => res.json())
        .then(data => {
            setProblemID(data.id);
            setIsSuccessful(true);
            dispatch(resetForm())
        })
        .catch(error => console.error('Error:', error))
        }
    }

    return (
        isSuccessful ? 
        <Redirect to={'/user'} />
        :
        <div className={classes.paper}>
            <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="題目名稱"
                name="name"
                onChange={handleName}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="tags"
                label="題目標籤，請用空白分開"
                type="tags"
                id="tags"
                onChange={handleTags}
                style={{marginBottom: '20px'}}
            />
            <span className={classes.difficultyText}>題目難度</span>
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
                <option value={0}>簡單</option>
                <option value={1}>挑戰</option>
                <option value={2}>專精</option>
              </Select>
            </FormControl>
            <span className={classes.categoryText}>題目類別</span>
            <FormControl className={classes.formControl}>
              <Select
                native
                value={category}
                onChange={handleCategory}
                label="題目類別"
                inputProps={{
                  name: 'category',
                }}
              >
                <option value={"exam"}>考試題</option>
                <option value={"homework"}>作業題</option>
                <option value={"practice"}>練習題</option>
              </Select>
            </FormControl>
            <span className={classes.visibilityText}>題目權限</span>
            <FormControl className={classes.formControl}>
              <Select
                native
                value={visibility}
                onChange={handleVisibility}
                label="題目權限"
                inputProps={{
                  name: 'visibility',
                }}
              >
                <option value={0}>限定自己瀏覽</option>
                <option value={1}>題庫存取者可瀏覽</option>
                <option value={2}>所有人皆可瀏覽</option>
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
                建立題目
            </Button>
            </form>
        </div>
    )
}
