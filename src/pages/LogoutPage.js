import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { logout } from '../actions/login'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

export default function LogoutPage() {
    const dispatch = useDispatch()
    const isLogin = useSelector(state => state.loginReducer.isLogin)

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
            method: "POST", credentials: "include"
        }).then(dispatch(logout()))
    }, [])

    return (
        isLogin ? <Redirect to='/home' /> :
            <div>
                <NavBar context="CoDai 教室" />
            </div>
    );
}