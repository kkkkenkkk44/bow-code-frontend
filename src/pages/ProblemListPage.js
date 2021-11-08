import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import ProblemListTile from '../components/ProblemListTile'
import ProblemInfo from '../components/ProblemInfo'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProblemListAsync, showProblemInfo, handleChangeKeyword, clickAllTags, changeTagsFilter, problemPicker } from '../actions/problemList'
import { CircularProgress, IconButton, Paper } from '@material-ui/core'
import { changeDifficulty } from '../actions/problemList'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'
import { Divider } from '@material-ui/core'
import { Slider } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'
import { Checkbox } from '@material-ui/core'
import { Popover } from '@material-ui/core'
import { FormGroup } from '@material-ui/core'
import { useHistory } from 'react-router'


export function ProblemListContent(props) {
    const isPicker = props.isPicker
    const useStyles = makeStyles((theme) => ({
        root: {
            height: "calc(100vh - 180px)",
            margin: theme.spacing(5),
            overflow: "visible"
        },
        filter: {
            display: "flex",
        },
        difficultySlide: {
            flex: 1,
            maxWidth: theme.spacing(20),
            margin: "15px"
        },
        tags: {
            margin: "15px",
            marginLeft: "40px"
        },
        search: {
            flex: 2,
            maxWidth: theme.spacing(50),
            margin: "15px",
        },
        searchFont: {
            fontSize: '14pt'
        },
        problemAll: {
            display: 'flex',
            marginLeft: "10%",
            marginRight: "10%",
            justifyContent: 'center'
        },
        problemAllproblemList: {
            flex: 4,
            maxWidth: theme.spacing(120)
        },
        problemInfo: {
            flex: 3,
            marginLeft: theme.spacing(3)
        },
        problemTile: {

        }
    }));

    const [anchorTagsSelector, setAnchorTagsSelector] = React.useState(null);

    const handleClickTagsSelector = (event) => {
        setAnchorTagsSelector(event.currentTarget);
    };

    const handleCloseTagsSelector = () => {
        setAnchorTagsSelector(null);
    };
    const classes = useStyles();
    const dispatch = useDispatch()
    const problemList = useSelector(state => state.problemListReducer.problemList);
    const isfetching = useSelector(state => state.problemListReducer.isfetching);
    const showingInfoProblem = useSelector(state => state.problemListReducer.showingInfoProblem);
    const difficultyRange = useSelector(state => state.problemListReducer.difficultyRange)
    const tagsCount = useSelector(state => state.problemListReducer.tagsCount)
    const checked = useSelector(state => state.problemListReducer.checked)
    const keyword = useSelector(state => state.problemListReducer.keyword)
    const history = useHistory();
    var problemBoard = []
    var tagList
    useEffect(() => {
        dispatch(fetchProblemListAsync())
    }, [])

    function filter(problem) {
        if (problem.difficulty > difficultyRange[1] || problem.difficulty < difficultyRange[0]) {
            return false
        }
        if (keyword != "") {
            var keys = keyword.split(/[\s,]+/).filter((w) => w != "")
            for (var i = 0; i < keys.length; i++) {
                if (problem.name.toLowerCase().includes(keys[i].toLowerCase()) || problem.description.toLowerCase().includes(keys[i].toLowerCase())) {
                    break;
                }
                if (i == keys.length - 1) {
                    console.log("Failed keyword")
                    return false
                }
            }
        }
        return true
    }

    if (!isfetching) {
        problemBoard = problemList.map((problem) =>
            filter(problem) ?
                <div key={problem.id} className={classes.problemTile} onMouseOver={() => {
                    dispatch(showProblemInfo(problem))
                }} onClick={() => {
                    isPicker ? 
                    dispatch(problemPicker(problem)) : history.push(`/problem/${problem.id}`)
                }}>
                    <ProblemListTile problem={problem} isPicker={isPicker}/>
                </div> : null
        )
        var tagList = tagsCount.map((tag) =>
            <FormControlLabel
                control={<Checkbox
                    checked={checked[tag.tag]}
                    onChange={() => dispatch(changeTagsFilter(checked, tag.tag))}
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
    }


    return (
        <div>
            <div className={classes.root}>
                <Typography className={classes.sectionTitle} variant="h5" component="h2">
                    所有題目
                    <Divider className={classes.divider}></Divider>
                </Typography>
                <div className={classes.filter}>
                    <div className={classes.difficultySlide}>
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
                    </div>
                    <div className={classes.tags}>
                        <TextField
                            defaultValue="Tags"
                            onClick={handleClickTagsSelector}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                            size="small"
                        ></TextField>
                        <Popover
                            anchorEl={anchorTagsSelector}
                            keepMounted
                            open={Boolean(anchorTagsSelector)}
                            onClose={handleCloseTagsSelector}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                              }}
                        >
                            <FormGroup>
                                {tagList}
                            </FormGroup>
                        </Popover>
                    </div>
                    <div className={classes.search}>
                        <TextField
                            id="standard-full-width"
                            placeholder="搜尋單元"
                            fullWidth
                            onChange={(e) => dispatch(handleChangeKeyword(e.target.value))}
                            InputProps={{
                                classes: {
                                    input: classes.searchFont,
                                },
                            }}
                        />
                    </div>
                </div>
                <div className={classes.problemAll}>

                    <div className={classes.problemAllproblemList}>
                        {isfetching ? <CircularProgress /> : problemBoard}
                    </div>
                    {
                        showingInfoProblem == null ? null :
                            <div className={classes.problemInfo}>
                                <ProblemInfo problem={showingInfoProblem} />
                            </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default function problemListPage(){
    return <div>
        <NavBar context="Bow-Code" />
        <ProblemListContent isPicker={false}></ProblemListContent>
    </div>
}