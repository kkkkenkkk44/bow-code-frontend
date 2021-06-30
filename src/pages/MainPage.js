import { Typography, List, ListItem, ListItemText, Link, makeStyles } from '@material-ui/core'
import { shallowEqual, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import NavBar from '../components/NavBar'

const useStyles = makeStyles({
    list:{
        overflow: "hidden",
        height: "92vh"
    },
    list2:{
        overflow: "auto",
        height: "100%"
    }
})

export default function MainPage() {
    return (
        <div>
            <NavBar context="Bow-Code" />
        </div>
    )
}

