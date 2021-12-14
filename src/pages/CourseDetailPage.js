import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import BlockCard from '../components/BlockCard'
import CourseInfoBar from '../components/CourseInfoBar'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@progress/kendo-react-buttons'
import { useParams } from 'react-router-dom'
import { Card } from '@material-ui/core'
import ContentLoader from 'react-content-loader'

import { asyncGetUserInfo } from '../utils/user'
import BlockDetailPage from './BlockDetailPage'

export default function CourseDetailPage() {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            height: theme.spacing(1),
        },
        info: {
            flex: 1,
            height: "calc(100vh - 60px)",
            overflowY: 'auto'
        },
        content: {
            flex: 4,
            height: "calc(100vh - 60px)",
            overflowY: 'auto'
        }
    }));
    const classes = useStyles();

    //const exampleCourseID = '60ebca1c14447a1cc7d84bc0'
    const { ClassroomID, CourseID } = useParams()

    const [name, setName] = useState("")
    const [abstract, setAbstract] = useState("")
    const [creator, setCreator] = useState({})
    const [displayBlockList, setDisplayBlockList] = useState([])
    const [isFetchingClassroom, setIsFetchingClassroom] = useState(true)
    const [isFetchingCreator, setIsFetchingCreator] = useState(true)
    const showingCourseIndex = useSelector(state => state.courseDetailPageReducer.showingCourseIndex)
    const dispatch = useDispatch()

    function BlockList() {
        var cardList = []
        cardList = displayBlockList.map((value) =>
            <BlockCard key={value.id} value={value} classroomID={ClassroomID} />)
        return (
            <div>
                {cardList}
            </div>
        )
    }

    function fetchCourseDetail() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${CourseID}`, {
            method: 'GET',
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setName(data.name)
                setAbstract(data.abstract)
                asyncGetUserInfo(data.creator).then(res => res.json()).then(data => {
                    setCreator(data)
                    setIsFetchingCreator(false)
                })
                setDisplayBlockList(() => data.blockList)
                setIsFetchingClassroom(false)
            })
            .catch(error => console.error('Error:', error))
    }

    useEffect(() => {
        fetchCourseDetail()
        dispatch({ type: 'RESET_SHOWINGCOURSEINDEX' })
    }, [])

    return (
        <div>
            <NavBar context="CoDai 教室" />
            {
                isFetchingClassroom ? null :
                    <div className={classes.root}>
                        <Card className={classes.info}>
                            {isFetchingCreator ?
                                <ContentLoader /> : <CourseInfoBar context={name} abstract={abstract} creator={creator} />}
                            {BlockList()}
                        </Card>
                        <div className={classes.content}>
                            {showingCourseIndex != "" && <BlockDetailPage courseId={CourseID} index={showingCourseIndex}></BlockDetailPage>}
                        </div>
                    </div>
            }
        </div>
    )
}
