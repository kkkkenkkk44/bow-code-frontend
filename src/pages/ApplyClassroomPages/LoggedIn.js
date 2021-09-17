import { CircularProgress, makeStyles, Paper, Typography, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import { fetchClassroom, applyClassroom } from "../../actions/applyClassroomPage";

const useStyles = makeStyles((theme) => ({
    title: {
        paddingTop: theme.spacing(4),
        width: "40vw",
        display: 'flex',
        justifyContent: "center"
    },
    confirmBar: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center"
    },
    spacingBetweenButton: {
        width: "20px"
    },
    root: {
        width: "100vw"
    },
    classroomDetail: {
        paddingTop: theme.spacing(3),
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center"
    }
}));

export default function LoggedIn(props) {

    const classes = useStyles();
    const { ClassroomID } = useParams()
    const dispatch = useDispatch()
    const { isFetching, classroomDetail } = useSelector(state => state.applyClassroomPageReducer)
    const [result, setResult] = useState("none")

    useEffect(() => {
        console.log("start")
        dispatch(fetchClassroom(ClassroomID))
    }, [])

    console.log(classroomDetail)

    const handleApplyClassroom = () => {
        applyClassroom(ClassroomID)
        setResult("confirm")
    }

    const handleQuit = () => {
        setResult("cancel")
    }

    const executeResult = () => {
        switch (result) {
            case "confirm":
                return (
                    <Redirect
                        to={{
                            pathname: `/classroom/${ClassroomID}`,
                        }}
                    />
                )
            case "cancel":
                return <Redirect to="/home" />
            default:
                return <div></div>
        }
    }

    return (
        <div>
            {
                isFetching === true ?
                    <CircularProgress />
                    :
                    <Paper width="100vw" elevation={5}>
                        <div className={classes.title}>
                            <Typography variant="h5">
                                是否要申請加入此教室
                            </Typography>
                        </div>
                        <div className={classes.classroomDetail}>
                            <Typography variant="subtitle1">
                                {`教室名稱: ${classroomDetail.name}`}
                            </Typography>
                            <Typography variant="subtitle1">
                                {`教師名稱: ${classroomDetail.creator}`}
                            </Typography>
                        </div>
                        <div className={classes.confirmBar}>
                            <Button variant="contained" color="primary" onClick={() => { handleApplyClassroom() }}>
                                加入
                            </Button>
                            <div className={classes.spacingBetweenButton} />
                            <Button variant="contained" color="gray" onClick={() => { handleQuit() }}>
                                取消
                            </Button>
                        </div>
                    </Paper>
            }
            <div>
                {
                    executeResult()
                }
            </div>
        </div>

    )
}