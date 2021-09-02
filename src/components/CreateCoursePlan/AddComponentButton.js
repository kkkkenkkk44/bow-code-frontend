import React from 'react';
import { useHistory } from "react-router-dom";
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { Grid, Popper, Paper, MenuList, MenuItem, ClickAwayListener, makeStyles, IconButton, Typography, Divider } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { fetchOwnCourseAsync, fetchFavCourseAsync } from '../../actions/userPage'
import { CircularProgress } from '@material-ui/core'
import OwnAndFavCourseCard from './OwnAndFavCourseCard'
import { ProblemListContent } from '../../pages/ProblemListPage'
import { problemPicker } from '../../actions/problemList';

const useStyles = makeStyles((theme) => ({
    button_container: {
        display: "flex",
        justifyContent: "center"
    },
    block_typography: {
        padding: "1px 20px 1px 20px",
        minHeight: "30px"
    },
    root: {
        flexGrew: 1,
    },
    paper: {
        //padding: theme.spacing(2),
        textAlign: 'center',
    },
    courseCard: {
        margin: theme.spacing(2)
    },
}));

export default function AddComponentButton(props) {

    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory();

    const [courseOptionConfig, setCourseOptionConfig] = useState({
        open: false,
        anchor: null,
        placement: 'right-start'
    })
    const handleCloseCourseOption = () => {
        setCourseOptionConfig({
            open: false,
            anchor: null,
            placement: 'right-start'
        })
    }

    const [problemOptionConfig, setProblemOptionConfig] = useState({
        open: false,
        anchor: null,
        placement: 'right-start'
    })
    const handleCloseProblemOption = () => {
        setProblemOptionConfig({
            open: false,
            anchor: null,
            placement: 'right-start'
        })
    }

    const [openOwnAndFavCourseDialog, setOpenOwnAndFavCourseDialog] = useState(false)

    var ownCourse = useSelector(state => state.userPageReducer.ownCourse)
    var favCourse = useSelector(state => state.userPageReducer.favCourse)
    const favFetching = useSelector(state => state.userPageReducer.favCourseFetching);
    const ownFetching = useSelector(state => state.userPageReducer.ownCourseFetching);
    const user = useSelector(state => state.loginReducer.user);
    var ownCardList = []
    var favCardList = []

    if (!ownFetching && ownCourse != null) {
        ownCardList = ownCourse.map((course) =>
            <div key={course.id} className={classes.courseCard}>
                <OwnAndFavCourseCard brief course={course} />
            </div>
        )
    }
    if (!favFetching && favCourse != null) {
        favCardList = favCourse.map((course) =>
            <div key={course.id} className={classes.courseCard}>
                <OwnAndFavCourseCard brief course={course} />
            </div>
        )
    }
    

    const handleOwnAndFavCourseDialog = () => {
        setOpenOwnAndFavCourseDialog(true)
        if (typeof user.id !== 'undefined') {
            dispatch(fetchOwnCourseAsync(user.ownCourseList))
            dispatch(fetchFavCourseAsync(user.favoriteCourseList))
        }
    }
    const handleCloseOwnAndFavCourseDialog = () => {
        setOpenOwnAndFavCourseDialog(false);
      };


    const [openProblemDialog, setOpenProblemDialog] = useState(false)

    const handleOpenProblemDialog = () => {
        setOpenProblemDialog(true)

    }
    const handleCloseProblemDialog = () => {
        setOpenProblemDialog(false);
      };

    

    return (
        <div>
            <Grid container direction="column" alignItems="center">
                <Tooltip title="加入課程" TransitionComponent={Zoom}>
                    <IconButton
                        id={`addCourseButton_${props.index}`}
                        onClick={(e) => {
                            setCourseOptionConfig({
                                open: !courseOptionConfig.open,
                                anchor: document.getElementById(`addCourseButton_${props.index}`),
                                placement: 'right-start'
                            })
                        }
                        }
                    >
                        <MenuBookIcon />
                    </IconButton>
                </Tooltip>
                <Popper
                    open={courseOptionConfig.open}
                    anchorEl={courseOptionConfig.anchor}
                    placement={courseOptionConfig.placement}
                    transition
                >
                    <Paper>
                        <ClickAwayListener
                            onClickAway={() => {
                                handleCloseCourseOption()
                            }}>
                            <MenuList>
                                <MenuItem onClick={() => history.push(`/courseList`)}>
                                    跳轉至課程列表瀏覽
                                </MenuItem>
                                <MenuItem onClick={handleOwnAndFavCourseDialog}>
                                    加入我建立或收藏的課程
                                </MenuItem>
                                <Dialog 
                                onClose={handleCloseOwnAndFavCourseDialog}
                                aria-labelledby="customized-dialog-title"
                                open={openOwnAndFavCourseDialog}
                                maxWidth="sm"
                                fullWidth="true"
                                >
                                    <DialogTitle id="customized-dialog-title" onClose={handleCloseOwnAndFavCourseDialog}>
                                    我建立或收藏的課程
                                    </DialogTitle>
                                    <DialogContent dividers>
                                    
                                        <Grid container spacing={1}>
                                        <Grid item xs={12} sm={6} >
                                            <Typography className={classes.paper}>我建立的課程</Typography>
                                            <div className={classes.card}>
                                            {
                                                ownFetching ?
                                                    <CircularProgress /> :
                                                    ownCardList
                                            }
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <Typography className={classes.paper}>我收藏的課程</Typography>
                                            <div className={classes.card}>
                                            {
                                                favFetching ?
                                                    <CircularProgress /> :
                                                    favCardList
                                            }
                                            </div>
                                        </Grid>
                                        </Grid>
                                    
                                    
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleCloseOwnAndFavCourseDialog} color="primary">
                                        取消
                                    </Button>
                                    <Button autoFocus onClick={handleCloseOwnAndFavCourseDialog} color="primary">
                                        確認加入
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Popper>
                <Tooltip title="加入考試或作業" TransitionComponent={Zoom}>
                    <IconButton
                        id={`addProblemButton_${props.index}`}
                        onClick={(e) => {
                            setProblemOptionConfig({
                                open: !problemOptionConfig.open,
                                anchor: document.getElementById(`addProblemButton_${props.index}`),
                                placement: 'right-start'
                            })
                        }
                        }
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Popper
                    open={problemOptionConfig.open}
                    anchorEl={problemOptionConfig.anchor}
                    placement={problemOptionConfig.placement}
                    transition
                >
                    <Paper>
                        <ClickAwayListener
                            onClickAway={() => {
                                handleCloseProblemOption()
                            }}>
                            <MenuList>
                                <MenuItem onClick={() => history.push(`/problemList`)}>
                                    跳轉至題目列表瀏覽
                                </MenuItem>
                                <MenuItem onClick={handleOpenProblemDialog}>
                                    加入題目
                                </MenuItem>
                                <Dialog 
                                onClose={handleCloseProblemDialog}
                                aria-labelledby="customized-dialog-title"
                                open={openProblemDialog}
                                maxWidth="md"
                                fullWidth="true"
                                >
                                    <DialogTitle id="customized-dialog-title" onClose={handleCloseProblemDialog}>
                                        題目
                                    </DialogTitle>
                                    <DialogContent dividers>
                                        <div className={classes.problemList}>
                                            <ProblemListContent isPicker={true} />
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleCloseProblemDialog} color="primary">
                                        取消
                                    </Button>
                                    <Button autoFocus onClick={handleCloseProblemDialog} color="primary">
                                        確認加入
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Popper>
            </Grid>
        </div>
    )
}
