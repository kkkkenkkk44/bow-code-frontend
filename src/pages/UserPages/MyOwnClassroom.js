import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { fetchClassroomsAsync } from '../../actions/userPage'
import ClassroomCard from '../../components/ClassroomCard'
import { Typography } from '@material-ui/core'
import { Divider } from '@material-ui/core'

export default function MyOwnClassroom(){
    const myOwnClassroomList = useSelector(state => state.userPageReducer.ownClassrooms)
    const user = useSelector(state => state.loginReducer.user);
    const dispatch = useDispatch()
    useEffect(() => {
        if (typeof user.id !== 'undefined') {
            dispatch(fetchClassroomsAsync(user.ownClassroomList, "own"))
        }
    }, [user])
    const classroomCards = myOwnClassroomList.map(obj => <ClassroomCard classroom={obj.classroom} key={obj.classroom.id} compress/>)
    return <div style={{
        marginTop: "30px"
    }}>
        <Typography variant="h5" style={{
            marginLeft: "10%"
        }}>我管理的班級</Typography>
        <Divider style={{
            marginLeft: "10%",
            marginBottom: '20px'
        }}/>
        {classroomCards}
    </div>
}