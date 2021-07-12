import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import CourseCard from '../components/CourseCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourseListAsync, changeDifficulty, changeCategory, changeTagsFilter } from '../actions/courseList'
import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'
import { ListItem } from '@material-ui/core'
import { List } from '@material-ui/core'
import { Select } from '@material-ui/core'
import { FormGroup } from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'
import { Divider } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Slider } from '@material-ui/core'
import { Checkbox } from '@material-ui/core'


export default function CourseListPage() {
    const useStyles = makeStyles((theme) => ({
        root: {
            height: theme.spacing(100),
            margin: theme.spacing(5)
        },
        courseAll: {
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: '15px'
        },
        filter: {
            flex: 1,
            flexBasis: theme.spacing(5),
            height: '100%',
            margin: theme.spacing(2),
        },
        textfield: {
            marginBottom: '15px',
            marginRight: '15px',
            marginTop: theme.spacing(2),
        },
        searchFont: {
            fontSize: '16pt'
        },
        difficulty: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        courseAllCourseList: {
            flex: 6,
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: '15px'
        },
        courseCard: {
            flex: 1,
            margin: theme.spacing(2),
            flexShrink: 0,
            flexGrow: 0,
            flexBasis: theme.spacing(40),
        },
    }));
    const classes = useStyles();
    const dispatch = useDispatch()
    const courseList = useSelector(state => state.courseListReducer.courseList);
    const tagsCount = useSelector(state => state.courseListReducer.tagsCount);
    const isfetching = useSelector(state => state.courseListReducer.isfetching);
    const difficultyRange = useSelector(state => state.courseListReducer.difficultyRange);
    const category = useSelector(state => state.courseListReducer.category);
    const checked = useSelector(state => state.courseListReducer.checked);
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
        if (course.tags == null){
            return false
        }
        for (var i = 0; i < course.tags.length; i++){
            if (checked[course.tags[i]]){
                break
            }
            if (i == course.tags.length - 1){
                return false
            }
        }
        return true
    }

    if (!isfetching) {
        console.log(checked)
        cardList = courseList.map((course) =>
            filter(course) ?
                <div key={course.id} className={classes.courseCard}>
                    <CourseCard course={course} />
                </div> : null
        )
        tagList = tagsCount.map((tag) =>
            <FormControlLabel
                value="top"
                control={<Checkbox
                    checked={checked[tag.tag]}
                    onChange={() => dispatch(changeTagsFilter(tag.tag))}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
                label={`${tag.tag} (${tag.count})`}
                labelPlacement="end"
                key={tag.tag}
            />)
    }


    return (
        <div>
            <NavBar context="Bow-Code" />
            <div className={classes.root}>
                <Typography className={classes.sectionTitle} variant="h5" component="h2">
                    所有教材
                    <Divider className={classes.divider}></Divider>
                </Typography>
                <div className={classes.courseAll}>
                    <div className={classes.filter}>
                        <div className={classes.textfield}>
                            <TextField
                                id="standard-full-width"
                                placeholder="搜尋課程"
                                fullWidth
                                InputProps={{
                                    classes: {
                                        input: classes.searchFont,
                                    },
                                }}
                            />
                        </div>
                        <List>
                            <ListItem>
                                <Typography id="range-slider"
                                    style={{
                                        flex: 1,
                                        marginRight: '10px'
                                    }}>
                                    難易度
                                </Typography>
                                <Slider
                                    value={difficultyRange}
                                    style={{
                                        flex: 3,
                                        marginRight: '10px',
                                        marginLeft: '10px'
                                    }}
                                    onChange={(e, val) => { dispatch(changeDifficulty(val)) }}
                                    min={0}
                                    max={2}
                                    aria-labelledby="range-slider"
                                    marks={[
                                        {
                                            value: 0,
                                            label: '簡單',
                                        },
                                        {
                                            value: 1,
                                            label: '挑戰',
                                        },
                                        {
                                            value: 2,
                                            label: '專精',
                                        },
                                    ]}
                                />
                            </ListItem>
                            <ListItem>
                                <Typography id="category"
                                    style={{
                                        flex: 1,
                                        marginRight: '10px'
                                    }}>
                                    類別
                                </Typography>
                                <Select
                                    native
                                    autoWidth
                                    labelId="category"
                                    value={category}
                                    onChange={(e) => { dispatch(changeCategory(e.target.value)) }}
                                >
                                    <option value={"all"}>全部</option>
                                    <option value={"teach"}>教學用教材</option>
                                    <option value={"self-learn"}>自學用教材</option>
                                </Select>
                            </ListItem>
                            <ListItem>
                                <FormGroup aria-label="position">
                                    {tagList}
                                </FormGroup>
                            </ListItem>
                        </List>
                    </div>
                    <div className={classes.courseAllCourseList}>
                        {isfetching ? <CircularProgress /> : cardList}
                    </div>
                </div>
            </div>
        </div>
    )
}
