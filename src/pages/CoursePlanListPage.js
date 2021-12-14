import { CircularProgress, Grid, Card, makeStyles, CardContent, Typography, Divider, CardActionArea, IconButton, Tooltip, Zoom, Dialog, DialogTitle, DialogActions, Button, DialogContent } from "@material-ui/core"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NavBar from "../components/NavBar"
import { copyCoursePlan, fetchCoursePlanList } from "../actions/coursePlanListPage"
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useHistory } from "react-router-dom"

const useStyle = makeStyles((theme) => ({
    coursePlanCard: {
        margin: "20px",
        // height: "250px"
    },
    root: {
        height: "calc(100vh - 180px)",
        margin: theme.spacing(5),
        overflow: "visible"
    },
    coursePlanCardTitle: {
        fontSize: 24
    },
    coursePlanCardCreator: {
        marginTop: "15px"
    },
    coursePlanCardCourse: {
        display: "flex",
        alignItems: "flex-start",
        // maxHeight: "65px"
    },
    coursePlanCardActions: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    coursePlanCardActionDivider: {
        // height: "100%"
    },
    coursePlanCardActionsIcon: {
        fontSize: 30,
        margin: '10px'
    },
    coursePlanCardActionArea: {
        // maxHeight: 175
    }
}))

export default function CoursePlanListPage() {

    const classes = useStyle()
    const dispatch = useDispatch()
    const { isFetching, coursePlanList } = useSelector(state => state.coursePlanListReducer)
    const { isLogin, user } = useSelector(state => state.loginReducer)
    const history = useHistory()
    const [openCopyDialog, setOpenCopyDialog] = useState(false)
    const [copyCoursePlanID, setCopyCoursePlanID] = useState(true)

    useEffect(() => {
        dispatch(fetchCoursePlanList())
    }, [])

    // for adding favorite coursePlan
    // var favoriteCoursePlanList = []
    // if (isLogin) {
    //     console.log(user)
    // }

    const handleCopy = (CoursePlanID) => {
        setCopyCoursePlanID(CoursePlanID)
        setOpenCopyDialog(true)
    }

    var CoursePlanList = []
    if (!isFetching) {
        CoursePlanList = coursePlanList.map(coursePlan => {
            const { id, name, userInfo, createTime, componentList } = coursePlan
            return (
                <Grid item xs={6} md={4} lg={3} key={id}>
                    <Card className={classes.coursePlanCard}>
                        <CardActionArea className={classes.coursePlanCardActionArea} onClick={e => { history.push(`./coursePlanEditor/${id}`) }}>
                            <CardContent>
                                <Typography className={classes.coursePlanCardTitle}>
                                    {name}
                                </Typography>
                                <Divider />
                                <Typography className={classes.coursePlanCardCreator}>
                                    作者：{userInfo.name}
                                </Typography>
                                <div className={classes.coursePlanCardCourse}>
                                    <Typography>
                                        單元：
                                    </Typography>
                                    <div>
                                        {componentList.slice(0, 3).map(component => {
                                            return <Typography key={component.name}>{component.name}</Typography>
                                        })}
                                        {componentList.length > 3 ? <Typography>...</Typography> : <></>}
                                        {componentList.length === 0 ? <Typography>無</Typography> : <></>}
                                    </div>
                                </div>
                            </CardContent>
                        </CardActionArea>
                        <Divider />
                        <div className={classes.coursePlanCardActions}>
                            <Tooltip title="收藏教案" TransitionComponent={Zoom}>
                                <IconButton
                                // onClick={() => setRedirectToCourseDetailPage(true)}  
                                >
                                    <FavoriteBorderIcon className={classes.coursePlanCardActionsIcon} />
                                </IconButton>
                            </Tooltip>
                            {/* <Divider orientation="vertical" flexItem className={classes.coursePlanCardActionDivider} /> */}
                            <Tooltip title="複製教案" TransitionComponent={Zoom}>
                                <IconButton
                                    onClick={() => handleCopy(id)}
                                >
                                    <FileCopyIcon className={classes.coursePlanCardActionsIcon} />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Card>
                </Grid>
            )
        })
    }

    return (
        <div>
            <NavBar context="CoDai 教室" />
            <div className={classes.root}>
                <Typography className={classes.sectionTitle} variant="h5" component="h2">
                    所有教案
                    <Divider className={classes.divider} />
                </Typography>
                {
                    isFetching ?
                        <CircularProgress />
                        :
                        <Grid container>
                            {CoursePlanList}
                        </Grid>
                }
            </div>
            <Dialog open={openCopyDialog} onClose={() => setOpenCopyDialog(false)} aria-labelledby="form-dialog-title" maxWidth="lg">
                <DialogTitle id="form-dialog-title">確定要複製此教案？</DialogTitle>
                <DialogContent>
                    <Typography>
                        將新增一份屬於你的教案
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenCopyDialog(false)
                    }}>
                        取消
                    </Button>
                    <Button onClick={() => {
                        console.log("click")
                        dispatch(copyCoursePlan(copyCoursePlanID))
                        setOpenCopyDialog(false)
                    }}>
                        確定
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}