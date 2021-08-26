import React, { useEffect } from 'react'
import CourseCard from '../../components/CourseCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOwnCourseAsync, fetchFavCourseAsync } from '../../actions/userPage'
import { CircularProgress } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { fetchBulletinAsync } from '../../actions/classroomPage'
import Bulletin from '../../components/Bulletin'

export default function BulletinBoard() {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            margin: theme.spacing(5)
        },
        bulletinPostit: {
            flex: 1,
            margin: theme.spacing(2),
            flexGrow: 0,
            flexShrink: 0,
        },
        sectionTitle: {
            margin: theme.spacing(5),
            padding: theme.spacing(2)
        },
        divider: {
            margin: theme.spacing(0.5)
        }
    }));
    const classes = useStyles();
    const dispatch = useDispatch()
    const user = useSelector(state => state.loginReducer.user);
    var bulletins = useSelector(state => state.classroomManagerPageReducer.bulletins)
    var fetchingBulletin = useSelector(state => state.classroomManagerPageReducer.fetchingBulletin)
    var bulletinList = []
    useEffect(() => {
        dispatch(fetchBulletinAsync())
    }, [])
    if (!fetchingBulletin) {
        bulletinList = bulletins.map((bulletin) =>
            <div key={bulletin.timeStamp} className={classes.bulletinPostit}>
                <Bulletin bulletin={bulletin} />
            </div>
        )
    }
    return (
        <div>
            <div className={classes.root}>
                {
                    fetchingBulletin ?
                        <CircularProgress /> :
                        bulletinList
                }
            </div>
        </div>
    )
}
