import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { Redirect } from "react-router";
import { useSelector } from 'react-redux';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '80%',
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
        marginRight: '50px',
        
    },

    contentText: {
        textAlign: 'center',
    }

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

    const [difficulty, setDifficulty] = useState("")
    const handleDifficulty = (event) => {
    setDifficulty(event.target.value);
    };

    const [content, setContent] = useState("")

    const user = useSelector(state => state.loginReducer.user)

    const handleSubmit = (event) => {
        if (name === ""){
          alert("請輸入題目名稱")
          document.getElementById("name").focus()
        }
        else{
          var problem_info = {
            name,
            tags: tags.split(' '),
            difficulty,
            creator: user.id,
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
            />
            <span className={classes.difficultyText}>選擇題目難度</span>
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
                <option value={"easy"}>Easy</option>
                <option value={"medium"}>Medium</option>
                <option value={"hard"}>Hard</option>
              </Select>
            </FormControl>
            <h4 className={classes.contentText}>題目內容</h4>
                <CKEditor
                    editor={ ClassicEditor }
                    data=""
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        setContent(editor.getData())
                        //console.log( { event, editor, data } );
                    } }
                />
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
