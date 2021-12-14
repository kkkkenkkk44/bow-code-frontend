import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux"
import NavBar from "../components/NavBar"
import LoggedIn from "./ApplyClassroomPages/LoggedIn"
import NotLoggedIn from "./ApplyClassroomPages/NotLoggedIn"

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

export default function ApplyClassroomPage() {

    const classes = useStyles();

    const loginInfo = useSelector(state => state.loginReducer)

    return (
        <div>
            <NavBar context="CoDAI 教室" />
            <div className={classes.paper}>
                {loginInfo.isLogin === false ?
                    <NotLoggedIn />
                    :
                    <LoggedIn />
                }
            </div>

        </div>
    )
}