import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';


export default function BlockDetailPage () {

    const useStyles = makeStyles((theme) => ({
        text: {
            width: '60%',
            margin: '20px',
            marginLeft: '280px',
            marginTop: '50px',
            borderColor: 'primary.main',
        },

    }));

    const { CourseID } = useParams()
    const { index } = useParams()

    const classes = useStyles()

    const [blockContent, setBlockContent] = useState()

    function fetchBlockDetail() {
        var myHeaders = new Headers();
        myHeaders.append('pragma', 'no-cache');
        myHeaders.append('cache-control', 'no-cache');
        fetch(`${process.env.REACT_APP_FILE_SERVER_URL}/files/course/${CourseID}/block/${index}/`, {
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

    useEffect(() => {
        fetchBlockDetail()
    }, [])

    return (
        <div>
            <NavBar context="Bow-Code" />
            <div className={classes.text}>
                <div dangerouslySetInnerHTML={{__html: blockContent}} />
            </div>
        </div>
    )
}