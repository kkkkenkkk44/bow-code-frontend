import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';


export default function BlockDetailPage (props) {

    const useStyles = makeStyles((theme) => ({
        text: {
            width: '80%',
            margin: '40px',
            borderColor: 'primary.main',
        },

    }));
    
    const { CourseID } = useParams()
    const { index } = useParams()
    const CourseID_ = props.courseId || CourseID
    const index_ = props.index || index

    const classes = useStyles()

    const [blockContent, setBlockContent] = useState()

    function fetchBlockDetail() {
        var myHeaders = new Headers();
        myHeaders.append('pragma', 'no-cache');
        myHeaders.append('cache-control', 'no-cache');
        fetch(`${process.env.REACT_APP_FILE_SERVER_URL}/files/course/${CourseID_}/block/${index_}/`, {
            method: 'GET',
            credentials: "include",
            headers: myHeaders
            })
        .then(res => res.text())
        .then(data => {
            setBlockContent(data)

        })
        .catch(error => console.error('Error:', error))
    }
    fetchBlockDetail()

    return (
        <div>
            <div className={classes.text}>
                <div dangerouslySetInnerHTML={{__html: blockContent}} className="ck-content"/>
            </div>
        </div>
    )
}