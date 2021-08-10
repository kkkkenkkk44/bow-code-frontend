import React, { useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import { CircularProgress, IconButton } from '@material-ui/core'
import { Redirect } from "react-router";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { InputAdornment } from '@material-ui/core'
import CourseCardForCoursePlan from '../CreateCoursePlan/CourseCardForCoursePlan'
import SearchIcon from '@material-ui/icons/Search';
import { Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/Delete";
import { Box, Grid } from "@material-ui/core";

import { fetchCourseListAsync, changeDifficulty, changeCategory, changeTagsFilter, clickAllTags, handleChangeKeyword } from '../../actions/courseList'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      //alignItems: 'center',
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
    courseAllCourseList: {
      flex: 6,
      marginTop: '15px',
      overflowY: 'scroll',
      maxHeight: '100%'
    },
    courseCard: {
      flex: 1,
      margin: theme.spacing(2),
    },

    copyTitle: {
      flex: 1,
      margin: theme.spacing(1),
    },

    left: {
      flex: 1,
    },

    right: {
      flex: 1,
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

export default function SelectCourse() {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [coursePlanID, setCoursePlanID] = useState("")
    const name = useSelector(state => state.createCoursePlanReducer.name)
    const visibility = useSelector(state => state.createCoursePlanReducer.visibility)

    const [selectedCourseID, setSelectedCourseID] = useState("")

    const courseList = useSelector(state => state.courseListReducer.courseList);
    const tagsCount = useSelector(state => state.courseListReducer.tagsCount);
    const isfetching = useSelector(state => state.courseListReducer.isfetching);
    const difficultyRange = useSelector(state => state.courseListReducer.difficultyRange);
    const category = useSelector(state => state.courseListReducer.category);
    const checked = useSelector(state => state.courseListReducer.checked);
    const allChecked = useSelector(state => state.courseListReducer.allChecked);
    const keyword = useSelector(state => state.courseListReducer.keyword)
    var cardList = []
    var tagList = []
    useEffect(() => {
        dispatch(fetchCourseListAsync())
    }, [])


    function filter(course) {
        if (course.difficulty > difficultyRange[1] || course.difficulty < difficultyRange[0]) {
            return false
        }
        if (category != "all" && course.category != category) {
            return false
        }
        if (course.tags == null) {
            return false
        }
        if (!allChecked){
            if (course.tags.length == 0){
                return false
            }
            for (var i = 0; i < course.tags.length; i++) {
                if (checked[course.tags[i]]) {
                    break
                }
                if (i == course.tags.length - 1) {
                    return false
                }
            }
        }
        return true
    }


    if (!isfetching) {
        cardList = courseList.map((course) =>
            <div key={course.id} className={classes.courseCard}>
                <CourseCardForCoursePlan course={course} setSelectedCourseID={setSelectedCourseID}/>
            </div>
        )
    }
    
    const handleEnterSearch = (event) => {
        if(event.key === 'Enter') {
            filter = {
                "keyword": keyword.split(/[\s,]+/).filter((w) => w != "")
            }
            dispatch(fetchCourseListAsync(filter))
        }
    }

    const [isSuccessful, setIsSuccessful] = useState(false)

    const [courseIDs, setCourseIDs] = useState([]);
    const addValue = () => {
      setCourseIDs([...courseIDs, ""]);
    };
    const handleValueChange = (index, e) => {
      const updatedValues = courseIDs.map((courseID, i) => {
        if (i === index) {
          return e.target.value;
        } else {
          return courseID;
        }
      });
      setCourseIDs(updatedValues);
    };
    const deleteValue = (jump) => {
      setCourseIDs(courseIDs.filter((j) => j !== jump));
    };

    const handleSubmit = (event) => {
        var coursePlan_info = {
            name: name,
            courseList: courseIDs,
            visibility: parseInt(visibility),
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course_plan`, {
            method: 'POST',
            body: JSON.stringify(coursePlan_info),
            credentials: "include"
            })
        .then(res => res.json())
        .then(data => {
          setCoursePlanID(data.CoursePlanID);
          setIsSuccessful(true);
        })
        .catch(error => console.error('Error:', error))
        //console.log(courseIDs)

    }

    return(
      isSuccessful ? 
      <Redirect to={'/user'} />
      :
      <div >
          <Grid container spacing={3} >
            <Grid item xs={6}>
              
              <Typography variant="h6" component="h3" className={classes.copyTitle}>點擊課程即可複製該課程 id</Typography>
              <TextField
                id="standard-full-width"
                placeholder="搜尋課程"
                fullWidth
                onChange={(e)=>dispatch(handleChangeKeyword(e.target.value))}
                InputProps={{
                    classes: {
                        input: classes.searchFont,
                    },
                    endAdornment: <InputAdornment position="end">
                        <IconButton onClick={() => {
                            filter = {
                                "keyword": keyword.split(/[\s,]+/).filter((w) => w != "")
                            }
                            dispatch(fetchCourseListAsync(filter))
                        }}>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>,
                }}
              />
              <div className={classes.courseAllCourseList}>
                  {isfetching ? <CircularProgress /> : cardList}
              </div>
              
              </Grid>
              <Grid item xs={6}>
                
                  <Typography  variant='h6'>課程 id</Typography>
                    {courseIDs.map((jump, index) => (
                        <Box key={"jump" + index}>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item xs={10} >
                            <TextField
                                autoFocus
                                
                                margin="dense"
                                label="課程 id"
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
                </Grid>
        </Grid>
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
      </div>
    )
}
