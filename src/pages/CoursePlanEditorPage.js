import React from 'react'
import NavBar from "../components/NavBar"
import { Grid, Button, makeStyles } from "@material-ui/core"
import { Redirect } from "react-router"
import { useState } from "react"
import { useSelector } from "react-redux"

const useStyles = makeStyles((theme) => ({
    finishButton: {
        background: "rgba(104, 144, 79, 0.9)",
        margin: "20px 0 20px 0"
    }
}))

export default function CoursePlanEditorPage(props){

    return (
        <div>
            <NavBar context="Bow-Code" />
            
        </div>
    )

}