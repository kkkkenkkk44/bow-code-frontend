import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { fetchClassroomsAsync } from '../../actions/userPage'
import ClassroomCard from '../../components/ClassroomCard'
import { Typography } from '@material-ui/core'
import { Divider } from '@material-ui/core'

export default function MyJoinedClassroom() {
    const myJoinedClassroomList = useSelector(state => state.userPageReducer.joinedClassrooms)
    const user = useSelector(state => state.loginReducer.user);
    const dispatch = useDispatch()
    useEffect(() => {
        if (typeof user.id !== 'undefined') {
            dispatch(fetchClassroomsAsync(user.joinedClassroomList, "joined"))
        }
    }, [user])
    const classroomCards = myJoinedClassroomList.map(obj => <ClassroomCard classroom={obj.classroom} key={obj.classroom.id} />)
    return <div style={{
        marginTop: '30px'
    }}>
        <Typography variant="h5" style={{
            marginLeft: "10%"
        }}>我加入的班級</Typography>
        <Divider style={{
            marginLeft: "10%",
            marginBottom: '20px'
        }} />
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginLeft: '10%',
            marginRight: '10%',
        }}>
            {classroomCards}
        </div>
    </div>
}