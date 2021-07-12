import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { useParams } from 'react-router-dom'


export default function BlockDetailPage () {

    const { CourseID } = useParams()
    const { index } = useParams()

    const [blockContent, setBlockContent] = useState()


    fetch(`http://api.ramen-live.com:5050/file-server/files/course/${CourseID}/block/${index}/`, {
        method: 'GET',
        credentials: "include"
        })
    .then(res => res.text())
    .then(data => {
        setBlockContent(data)

    })
    .catch(error => console.error('Error:', error))



    
    return (
        <div>
            <NavBar context="Bow-Code" />
            <div dangerouslySetInnerHTML={{__html: blockContent}} />
        </div>
    )
}