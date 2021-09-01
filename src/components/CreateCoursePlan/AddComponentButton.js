import { DialogTitle } from '@material-ui/core'
import React from 'react';
import { useHistory } from "react-router-dom";
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { Grid, Popper, Paper, MenuList, MenuItem, ClickAwayListener, makeStyles, IconButton, Typography } from '@material-ui/core'
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

const useStyles = makeStyles((theme) => ({
    button_container: {
        display: "flex",
        justifyContent: "center"
    },
    block_typography: {
        padding: "1px 20px 1px 20px",
        minHeight: "30px"
    }
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
                                    從課程列表瀏覽
                                </MenuItem>
                                <MenuItem>
                                    加入我建立或我收藏的課程
                                </MenuItem>
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
                                    從題目列表瀏覽
                                </MenuItem>
                                <MenuItem>
                                    ...
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Popper>
            </Grid>
        </div>
    )
}
