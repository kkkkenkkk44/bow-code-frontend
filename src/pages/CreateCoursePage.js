import { Typography, List, ListItem, ListItemText, Link, makeStyles } from '@material-ui/core'
import { shallowEqual, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import NavBar from '../components/NavBar'
import CreateCourseForm from '../components/CreateCourseForm'


export default function MainPage() {
    return (
        <div>
            <NavBar context="Bow-Code" />
            
        </div>
    )
}
