import { CircularProgress, Grid, Card, makeStyles, CardContent, Typography, Divider, CardActionArea } from "@material-ui/core"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NavBar from "../components/NavBar"
import { fetchCoursePlanList } from "../actions/coursePlanListPage"
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { useHistory } from "react-router-dom"

const useStyle = makeStyles((theme) => ({
    coursePlanCard: {
        margin: "20px",
        height: "205px"
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
        alignItems: "flex-start"
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
    }
}))

export default function CoursePlanListPage() {

    const classes = useStyle()
    const dispatch = useDispatch()
    const { isFetching, coursePlanList } = useSelector(state => state.coursePlanListReducer)
    const { isLogin, user } = useSelector(state => state.loginReducer)
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchCoursePlanList())
    }, [])

    //for adding favorite coursePlan
    var favoriteCoursePlanList = []
    if (isLogin) {
        console.log(user)
    }

    var CoursePlanList = []
    if (!isFetching) {
        CoursePlanList = coursePlanList.map(coursePlan => {
            const { id, name, userInfo, createTime, componentList } = coursePlan
            return (
                <Grid item xs={6} md={4} lg={3} key={id}>
                    <Card className={classes.coursePlanCard}>
                        <CardActionArea onClick={e => { history.push(`./coursePlanEditor/${id}`) }}>
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
                        {/* <Divider /> */}
                        {/* <div className={classes.coursePlanCardActions}>
                            <FavoriteBorderIcon className={classes.coursePlanCardActionsIcon}/>
                            <Divider orientation="vertical" flexItem className={classes.coursePlanCardActionDivider}/>
                            <FavoriteIcon className={classes.coursePlanCardActionsIcon}/>
                        </div> */}
                    </Card>
                </Grid>
            )
        })
    }

    return (
        <div>
            <NavBar context="Bow-Code" />
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

        </div>
    )
}