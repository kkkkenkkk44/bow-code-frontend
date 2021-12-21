import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { Redirect } from "react-router";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Typography } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/Delete";
import { Box, Grid } from "@material-ui/core";




export default function MultipleClassroomName() {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex'
        },
        paper: {
            marginTop: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          },
        
        header: {
            display: 'flex'
        },
        headerTitleLeft: {
            flex: 5,
            marginLeft: '5%',
            marginRight: '10px',
            textAlign: 'center'
        },
        headerTitleRight: {
            flex: 5,
            marginLeft: '10px',
            textAlign: 'center'
        },
        blankPadding: {
            flex: 1
        },
        datas: {
            textAlign: 'center',
            width: '300px',
            flex: 1
        },
        addButton: {
            width: '90%',
            borderBottom: '0.1px #bbbbbb solid',
            borderRadius: 0,
            marginLeft: '5%',
            marginRight: '5%',
            height: '40px'
        },
        form: {
            width: '50%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
          },
    }))

    const classes = useStyles()
    const dispatch = useDispatch()

    const [isSuccessful, setIsSuccessful] = useState(false)
    const [classroomIDs, setClassroomIDs] = useState([])

    const coursePlanID = useSelector(state => state.createClassroomReducer.coursePlanID)
    const review = useSelector(state => state.createClassroomReducer.review)
    const apply = useSelector(state => state.createClassroomReducer.apply)
    const visibility = useSelector(state => state.createClassroomReducer.visibility)

    const [classroomNames, setClassroomNames] = useState([]);
    const addValue = () => {
      setClassroomNames([...classroomNames, ""]);
    };
    const handleValueChange = (index, e) => {
      const updatedValues = classroomNames.map((classroomName, i) => {
        if (i === index) {
          return e.target.value;
        } else {
          return classroomName;
        }
      });
      setClassroomNames(updatedValues);
    };
    const deleteValue = (jump) => {
      setClassroomNames(classroomNames.filter((j) => j !== jump));
    };

    const handleSubmit = (event) => {
        classroomNames.forEach((e) => {
            var classroom_info = {
                name: e,
                coursePlan: coursePlanID,
                review: review,
                apply: true,
                visibility: parseInt("1"),
            }
            console.log(classroom_info)
            fetch(`${process.env.REACT_APP_BACKEND_URL}/classroom`, {
                method: 'POST',
                body: JSON.stringify(classroom_info),
                credentials: "include"
                })
            .then(res => res.json())
            .then(data => {
                setClassroomIDs(oldClassroomIDs => [...oldClassroomIDs, data.ClassroomID])
                setIsSuccessful(true)
            })
            .catch(error => console.error('Error:', error))
        })
    }

    return (
        isSuccessful ? 
        <Redirect to={'/user'} />
        :
        <div className={classes.paper}>
            <form className={classes.form} noValidate>
            <Typography  variant='h6'>教室名稱</Typography>
            {classroomNames.map((jump, index) => (
                <Box key={"jump" + index}>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item xs={10} >
                    <TextField
                        autoFocus
                        
                        margin="dense"
                        label="教室名稱"
                        value={jump || ""}
                        onChange={(e) => handleValueChange(index, e)}
                        fullWidth
                    />
                    </Grid>
                    <Grid item xs={2}>
                    <div
                        className="font-icon-wrapper"
                        onClick={() => deleteValue(jump)}
                    >
                        <IconButton aria-label="delete">
                        <DeleteIcon />
                        </IconButton>
                    </div>
                    </Grid>
                </Grid>
                </Box>
            ))}
            <Button onClick={addValue} color="primary" className={classes.submit}>
                <AddIcon />
            </Button>
            <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            >
                建立多個教室
            </Button>
            </form>
        </div>
    )
}