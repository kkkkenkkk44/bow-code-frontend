import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar, Typography, Link } from '@material-ui/core';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import React, { useEffect, useState, useRef} from "react";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
//import { DropDownButton } from "@progress/kendo-react-buttons";
//import { useDetectOutsideClick } from "/Users/ken/Desktop/bow-code-frontend/src/useDetectOutsideClick.js";




const useStyles = makeStyles((theme) => ({
    homepagebutton:{
      marginRight: theme.spacing(3),
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(3),
    },
    title: {
      marginLeft: theme.spacing(1),
      flexGrow: 1,
      fontFamily: "Comic Sans MS",
    },
    toolbar: {
        height: '100%'
    },
    appbar: {
        height: "60px",
        background: "rgba(104, 144, 79, 0.9)"

    },
    toolbarButton: {
        color: "#ffffff",
    },
}));




export default function NavBar(props){
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user, shallowEqual)

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
    };


    return(
        <div>
        <AppBar position="static" className={classes.appbar} elevation={3}>
            <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title}>
                    <Link component={RouterLink} to={"/home"} >
                        {props.context}
                    </Link>
                    </Typography>
                <Button className={classes.toolbarButton}>
                    課程列表
                </Button>
                <Button className={classes.toolbarButton}>
                    題目列表
                </Button>
                <Button className={classes.toolbarButton}>
                    我的學習
                </Button>
        
                <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle} className={classes.toolbarButton}
                >
                我的教學
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" >
                            <Link component={RouterLink} to={"/createCourse"} color="inherit" aria-label="menu">
                                <MenuItem onClick={handleClose}>建立課程</MenuItem>
                            </Link>
                            <MenuItem onClick={handleClose}>建立題目</MenuItem>
                            <MenuItem onClick={handleClose}>建立教室</MenuItem>
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
                </Popper>
                
                <Button className={classes.toolbarButton}>
                    登入
                </Button>
            </Toolbar>
        </AppBar>
        </div>
    )
}