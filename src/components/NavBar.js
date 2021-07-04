import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';


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
        fontFamily: "Comic Sans MS"
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

export default function NavBar(props) {
    const classes = useStyles()
    const user = useSelector(state => state.loginReducer.user)
    const isLogin = useSelector(state => state.loginReducer.isLogin)

    return (
        <div>
            <AppBar position="static" className={classes.appbar} elevation={3}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title}>
                        {props.context}
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
                                <Button className={classes.toolbarButton}>
                                    我的教學
                                </Button>
                                <Button className={classes.toolbarButton} href="#">
                                    {user.userInfo.name}
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