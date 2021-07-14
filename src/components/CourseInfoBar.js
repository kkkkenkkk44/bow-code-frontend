import React, { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useParams } from 'react-router-dom';
import loginReducer from '../redux/loginReducer.js';
import { useSelector } from 'react-redux';
import {useHistory} from "react-router-dom";


const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
    },

    title: {
        marginLeft: theme.spacing(1),
        flexGrow: 1,
        margin: '20px',
        
    },
    toolbar: {
        height: '100%'
    },
    appbar: {
        height: "100%",
        background: "rgba(104, 144, 79, 0.3)",
        color: '#000000',
        paddingLeft: '100px',
        paddingRight: '100px',

    },
    abstract: {
        marginLeft: theme.spacing(1),
        margin: '20px',
        
        
    },
    creator: {
        marginLeft: theme.spacing(1),
        margin: '20px',

    },
    button: {
        margin: theme.spacing(1),
        width: '8%',
        position: 'absolute',
        right: '0',
        marginTop: '50px',
    },
    favoriteButton: {
        margin: theme.spacing(1),
        width: '8%',
        position: 'absolute',
        right: '0',

    },
}));

export default function NavBar(props) {
    const classes = useStyles()

    const { CourseID } = useParams()

    const [open, setOpen] = useState(false);

    const [isCreator, setIsCreator] = useState(false)

    const user = useSelector(state => state.loginReducer.user)

    const history = useHistory();

    const  route2PreviousPage = () => {
        history.goBack()
    }

    function checkUserIsCreator () {
        if (props.creator === user.id) {
            //console.log(user.id)
            setIsCreator(true)
        }
        else {
            //console.log(user.id)
            setIsCreator(false)
        }
    }
    
    useEffect(() => {
        checkUserIsCreator()
    }, [user])
    

    const handleFavoriteCourse = () => {
        //send request to favorite the course.
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${CourseID}/favorite`, {
            method: 'POST',
            credentials: "include"
            })
        .then(
            console.log('Success', '200 OK')
        )
        .catch(error => console.error('Error:', error))
    }

    const handleDeleteCourseButton = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteCourseAndRoute2PrevPage = () => {
        //send a request to delete the course.
        fetch(`${process.env.REACT_APP_BACKEND_URL}/course/${CourseID}`, {
            method: 'DELETE',
            credentials: "include"
            })
        .then(
            console.log('Success: ', '200 OK')
        )
        .then(
            route2PreviousPage
        )
        .catch(error => console.error('Error:', error))
    
    }

    return (
        <div>
            <AppBar position="static" className={classes.appbar} elevation={3}>
                    <Typography variant="h4" className={classes.title}>
                        {props.context}
                    </Typography>
                    <Typography variant="h6" className={classes.abstract}>
                        {props.abstract}
                    </Typography>
                    <Typography className={classes.creator}>
                        {`創建者：${props.creator}`}
                    </Typography>
                    <Button 
                        variant="contained"
                        color="secondary"
                        className={classes.favoriteButton}
                        startIcon={<FavoriteIcon />}
                        onClick={handleFavoriteCourse}
                        >  
                        收藏課程
                    </Button> 
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        style={isCreator ? {display:''} : {display: 'none'}}
                        onClick={handleDeleteCourseButton}
                    >
                        刪除課程
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"是否要刪除此課程?"}</DialogTitle>
                        <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={handleDeleteCourseAndRoute2PrevPage} color="secondary">
                            刪除
                        </Button>
                        </DialogActions>
                    </Dialog>
            </AppBar>
        </div>
    )
}