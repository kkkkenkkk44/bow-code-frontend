import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar, Typography, Link, IconButton } from '@material-ui/core';
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
import { useHistory } from 'react-router';
import AddIcon from '@material-ui/icons/Add';


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
        marginRight: theme.spacing(3),
        minWidth: '100px'
    },
    toolbar: {
        height: '100%',
        display: 'flex'
    },
    appbar: {
        height: "60px",
        background: theme.palette.primary,
        zIndex: "100",
        position: "relative"

    },
    endSection: {
        flex: '1 0 auto',
        display: 'flex',
        flexGrow: 0,
        marginLeft: 'auto'
    },
    toolbarButton: {
        color: "#ffffff",
        flex: '1 0 auto'
    },
    listButton: {
        flex: 1,
        flexGrow: 0,
        display: 'flex'
    },
    listButtonText: {
        color: "#D7D7D7",
        flex: '1 0 auto'
    }
}));

export default function NavBar(props) {
    const classes = useStyles()
    const user = useSelector(state => state.loginReducer.user)
    const isLogin = useSelector(state => state.loginReducer.isLogin)

    const [open, setOpen] = React.useState(false);
    const [userOpen, setUserOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const userAnchorRef = React.useRef(null);
    const history = useHistory();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleUserToggle = () => {
        setUserOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
        setUserOpen(false)
    };

    return (
        <div>
            <AppBar position="static" className={classes.appbar} elevation={3}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title}>
                        {props.context}
                    </Typography>

                    <div className={classes.listButton}>
                        <Button className={classes.toolbarButton} onClick={() => history.push('/courseList')}>
                            課程列表
                        </Button>
                        <Button className={classes.toolbarButton} onClick={() => history.push('/problemList')}>
                            題目列表
                        </Button>
                    </div>

                    {
                        isLogin ?
                            <div className={classes.endSection}>
                                <IconButton
                                    ref={anchorRef}
                                    aria-controls={open ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle} className={classes.toolbarButton}
                                >
                                    <AddIcon />
                                </IconButton>
                                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: '1' }}>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList autoFocusItem={open} id="menu-list-grow" >
                                                        <Link component={RouterLink} to={"/createCoursePlan"} color="inherit" aria-label="menu">
                                                            <MenuItem onClick={handleClose}>建立教案</MenuItem>
                                                        </Link>
                                                        <Link component={RouterLink} to={"/createCourse"} color="inherit" aria-label="menu">
                                                            <MenuItem onClick={handleClose}>建立課程</MenuItem>
                                                        </Link>
                                                        <Link component={RouterLink} to={"/createProblem"} color="inherit" aria-label="menu">
                                                            <MenuItem onClick={handleClose}>建立題目</MenuItem>
                                                        </Link>
                                                        <Link component={RouterLink} to={"/createClassroom"} color="inherit" aria-label="menu">
                                                            <MenuItem onClick={handleClose}>建立班級</MenuItem>
                                                        </Link>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                                <Button
                                    ref={userAnchorRef}
                                    aria-controls={userOpen ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleUserToggle} className={classes.toolbarButton}>
                                    {user.userInfo.name}
                                    <Avatar alt={user.userInfo.name} src={user.userInfo.avatar} style={{ marginLeft: '10px', width: '35px', height: '35px', border: '1px solid lightgray' }} />
                                </Button>
                                <Popper open={userOpen} anchorEl={userAnchorRef.current} role={undefined} transition disablePortal style={{ zIndex: '1' }}>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList autoFocusItem={userOpen} id="menu-list-grow" >
                                                        <Link component={RouterLink} to={"/user"} color="inherit" aria-label="menu">
                                                            <MenuItem onClick={handleClose}>用戶主頁</MenuItem>
                                                        </Link>
                                                        <Link component={RouterLink} to={"/logout"} color="inherit" aria-label="menu">
                                                            <MenuItem onClick={handleClose}>登出</MenuItem>
                                                        </Link>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </div> :
                            <div className={classes.endSection}>
                                <Button className={classes.toolbarButton} onClick={() => history.push('/login')}>
                                    登入
                                </Button>
                            </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )

}