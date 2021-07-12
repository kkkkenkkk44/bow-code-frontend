import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import BlockCard from '../components/BlockCard'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@progress/kendo-react-buttons'
import { useParams } from 'react-router-dom'


export default function CourseDetailPage() {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            height: theme.spacing(100),
            margin: theme.spacing(5)
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
    const [displayBlockList, setDisplayBlockList] = useState([])

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
    
    const fetchCourseDetail = (e) => {

        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${CourseID}`, {
            method: 'GET',
            credentials: "include"
            })
          .then(res => res.json())
          .then(data => {
                setDisplayBlockList(() => data.blockList)
          })
          .catch(error => console.error('Error:', error))
    }

    return (
        <div>
            <NavBar context="Bow-Code" />
            <Button onClick={fetchCourseDetail}>fetch course detail</Button>
            {BlockList()}
        </div>
    )
}
