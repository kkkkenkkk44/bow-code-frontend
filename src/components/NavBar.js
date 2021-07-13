import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar, Typography, Link } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import React from "react";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Avatar } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';


const useStyles = makeStyles((theme) => ({
    homepagebutton: {
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
    },
    toolbar: {
        height: '100%'
    },
    appbar: {
        height: "60px",
        background: "rgba(104, 144, 79, 0.9)",
        zIndex: "100",
        position: "relative"

    },
    toolbarButton: {
        color: "#ffffff",
    },
}));

export default function NavBar(props) {
    const classes = useStyles()
    const user = useSelector(state => state.loginReducer.user)
    const isLogin = useSelector(state => state.loginReducer.isLogin)

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


    return (
        <div>
            <AppBar position="static" className={classes.appbar} elevation={3}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title}>
                        <Link component={RouterLink} to={"/home"} >
                            {props.context}
                        </Link>
                    </Typography>
                    <Button className={classes.toolbarButton} href="/courseList">
                        課程列表
                    </Button>
                    <Button className={classes.toolbarButton}>
                        題目列表
                    </Button>


                    {
                        isLogin ?
                            <div>
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
                                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex: '1'}}>
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
                                <Button className={classes.toolbarButton} href="/user">
                                    {user.userInfo.name}
                                    <Avatar alt={user.userInfo.name} src={user.userInfo.avatar} style={{ marginLeft: '10px', width: '35px', height: '35px', border: '1px solid lightgray' }} />
                                </Button>
                            </div> :
                            <Button className={classes.toolbarButton} href="/login">
                                登入
                            </Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )

}