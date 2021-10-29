import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import BlockCard from '../components/BlockCard'
import CourseInfoBar from '../components/CourseInfoBar'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@progress/kendo-react-buttons'
import { useParams } from 'react-router-dom'
import ContentLoader from 'react-content-loader'

import { asyncGetUserInfo } from '../utils/user'

export default function CourseDetailPage() {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            height: theme.spacing(1),
            margin: theme.spacing(5),
        },
        blockListStyle: {
            flex: 3,
            margin: theme.spacing(3)
        },
        history: {
            flex: 1,
            margin: theme.spacing(3)
        }
    }));
    const classes = useStyles();

    //const exampleCourseID = '60ebca1c14447a1cc7d84bc0'
    const { CourseID } = useParams()

    const [name, setName] = useState("")
    const [abstract, setAbstract] = useState("")
    const [creator, setCreator] = useState({})
    const [displayBlockList, setDisplayBlockList] = useState([])
    const [isFetchingClassroom, setIsFetchingClassroom] = useState(true)
    const [isFetchingCreator, setIsFetchingCreator] = useState(true)

    function BlockList() {

        var cardList = []
        cardList = displayBlockList.map((value) =>
            <BlockCard key={value.id} value={value} />)

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
    }, [])

    return (
        <div>
            <NavBar context="Bow-Code" />
            {
                isFetchingClassroom ? null :
                    <div>
                        {isFetchingCreator ?
                        <ContentLoader /> : <CourseInfoBar context={name} abstract={abstract} creator={creator} />}
                        {BlockList()}
                    </div>
            }
        </div>
    )
}
