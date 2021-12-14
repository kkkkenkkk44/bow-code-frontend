import { Typography, List, ListItem, ListItemText, Link, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import  React, { useState } from 'react'


export default function MainPage() {
    var isNewbie = useSelector(state => state.loginReducer.newLogin)
    var isLogin = useSelector(state => state.loginReducer.isLogin)
    var user = useSelector(state => state.loginReducer.user)
    var homepage
    if (isNewbie) {
        homepage = "welcome new user!"
    } else if (isLogin) {
        homepage = "welcome back " + user.userInfo.name + "!"
    } else {
        homepage = "welcome guest!"
    }
    return (
        <div>
            <NavBar context="CoDAI 教室" />
            {homepage}
        </div>
    )
}

