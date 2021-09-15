import { makeStyles, Paper, Typography, Button } from "@material-ui/core"
import { useState } from "react";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
    title: {
        paddingTop: theme.spacing(4),
        // width: "20vw",
        display: 'flex',
        justifyContent: "center"
    },
    confirmBar: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: "center",
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
    },
    spacingBetweenButton: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
    root: {
        width: "100vw"
    },
}));

export default function NotLoggedIn(props) {

    const classes = useStyles();
    const [action, setAction] = useState('none')

    const execute = () => {
        switch (action) {
            case 'login':
                return <Redirect to="/login" />
            case 'register':
                return <Redirect to='/register' />
            default:
                return <div></div>
        }
    }

    const handleLogin = () => {
        setAction('login')
    }

    const handleRegister = () => {
        setAction('register')
    }

    return (
        <Paper width="100vw" elevation={5}>
            <div className={classes.title}>
                <Typography variant="h5">
                    您尚未登入
                </Typography>
            </div>
            <div className={classes.confirmBar}>
                <Button variant="contained" color="primary" onClick={() => { handleLogin() }}>
                    登入並加入教室
                </Button>
                <Typography variant="body2" className={classes.spacingBetweenButton}>
                    {/* 還沒有帳號? */}
                </Typography>
                <Button variant="contained" color="gray" onClick={() => { handleRegister() }}>
                    註冊
                </Button>
            </div>
            <div>
                {execute()}
            </div>
        </Paper>
    )
}