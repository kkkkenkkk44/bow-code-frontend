import { Typography, List, ListItem, ListItemText, Link, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "calc(100vh - 60px)",
        display: 'flex',
        justifyContent: 'center',
        alignItems: "flex-start",
        background: "#ddd8d1"
    },
    img: {
        width: '80vw'
    }
}));

export default function MainPage() {
    const classes = useStyles()
    var isNewbie = useSelector(state => state.loginReducer.newLogin)
    var isLogin = useSelector(state => state.loginReducer.isLogin)
    var user = useSelector(state => state.loginReducer.user)
    const image = () => {
        return (
            <div className={classes.root}>
                <img src="https://i.imgur.com/tSiCL9g.png" className={classes.img}></img>
            </div>
        )
    }
    var homepage
    if (isNewbie) {
        homepage = "welcome new user!"
    } else if (isLogin) {
        homepage = "welcome back " + user.userInfo.name + "!"
    } else {
        homepage = image()
    }
    return (
        <div>
            <NavBar context="CoDAI 教室" />
            {homepage}
        </div>
    )
}

