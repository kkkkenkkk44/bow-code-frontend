import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import CourseCard from '../components/CourseCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourseListAsync, changeDifficulty, changeCategory, changeTagsFilter, clickAllTags, handleChangeKeyword } from '../actions/courseList'
import { CircularProgress, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'
import { ListItem } from '@material-ui/core'
import { List } from '@material-ui/core'
import { Select } from '@material-ui/core'
import { FormGroup } from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'
import { Divider } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { InputAdornment } from '@material-ui/core'
import { Slider } from '@material-ui/core'
import { Checkbox } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';


export default function CourseListPage() {
    const useStyles = makeStyles((theme) => ({
        root: {
            height: "calc(100vh - 180px)",
            margin: theme.spacing(5),
            overflow: "visible"
        },
        courseAll: {
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: '15px',
            height: '100%'
        },
        filter: {
            flex: 1,
            flexBasis: theme.spacing(15),
            height: '100%',
            margin: theme.spacing(2),
        },
        textfield: {
            marginBottom: '15px',
            marginRight: '15px',
            marginTop: theme.spacing(2),
        },
        searchFont: {
            fontSize: '14pt'
        },
        difficulty: {
            display: 'flex',
            flexWrap: 'wrap',
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
    }));
    const classes = useStyles();
    const dispatch = useDispatch()
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
            filter(course) ?
                <div key={course.id} className={classes.courseCard}>
                    <CourseCard course={course} />
                </div> : null
        )
        var firstCheckbox = [
            <FormControlLabel
                control={<Checkbox
                    checked={allChecked}
                    onChange={() => dispatch(clickAllTags())}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
                label={"全選"}
                labelPlacement="end"
                key={"all"}
            />
        ]
        tagList = tagsCount.map((tag) =>
            <FormControlLabel
                control={<Checkbox
                    checked={checked[tag.tag]}
                    onChange={() => dispatch(changeTagsFilter(tag.tag))}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    style={{
                        marginLeft: "15px"
                    }}
                />}
                label={`${tag.tag} (${tag.count})`}
                labelPlacement="end"
                key={tag.tag}
            />)
        tagList = firstCheckbox.concat(tagList)
    }

    const handleEnterSearch = (event) => {
        if(event.key === 'Enter') {
            filter = {
                "keyword": keyword.split(/[\s,]+/).filter((w) => w != "")
            }
            dispatch(fetchCourseListAsync(filter))
        }
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
                                onChange={(e)=>dispatch(handleChangeKeyword(e.target.value))}
                                onKeyDown={handleEnterSearch}
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
                                    <option value={"teach"}>教學用課程</option>
                                    <option value={"self-learn"}>自學用課程</option>
                                </Select>
                            </ListItem>
                            <ListItem style={{ marginTop: '8px' }}>
                                <Typography id="tags"
                                    style={{
                                        flex: 1,
                                        marginRight: '10px',
                                        alignSelf: 'flex-start'
                                    }}>
                                    標籤
                                </Typography>
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
