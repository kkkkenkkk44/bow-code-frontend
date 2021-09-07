import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import { CardActionArea } from '@material-ui/core';
import Bulletin from '../../components/Bulletin'
import { Zoom } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { newBulletinOnchange, postBulletin } from '../../actions/classroomPage';
import CreateIcon from '@material-ui/icons/Create';

export default function BulletinBoard() {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            margin: theme.spacing(5)
        },
        createRoot: {
            minHeight: '250px',
            minWidth: '280px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#efefef'
        },
        createTitle: {
            padding: '15px'
        },
        bulletinPostit: {
            flex: 1,
            margin: theme.spacing(2),
            flexGrow: 0,
            flexShrink: 0,
        },
        sectionTitle: {
            margin: theme.spacing(5),
            padding: theme.spacing(2)
        },
        divider: {
            margin: theme.spacing(0.5)
        },
        layer: {
            backgroundColor: "#000000",
            opacity: 0.5,
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            zIndex: 99
        },
        expandedCard: {
            position: 'fixed',
            top: 0,
            left: 0,
            height: '80vh',
            width: '80vh',
            marginLeft: "calc(50vw - 40vh)",
            marginTop: '10vh',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column'
        },
        expandedTitle: {
            margin: '25px'
        },
        expandedContent: {
            marginLeft: '40px',
            marginBottom: '20px'
        },
        expandedAuthor: {
            marginRight: '20px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        expandedDivider: {
            marginLeft: '15px',
            marginRight: '15px'
        },
        thumbup: {
            float: 'right',
            height: '40px',
            width: '40px',
            display: 'flex',
            marginRight: '20px',
            alignItems: 'center',
            color: '#888888'
        },
        titleFont: {
            fontSize: '20pt'
        },
        contentFont: {
            fontSize: '14pt'
        },
        postButton: {
            marginTop: 'auto',
            marginRight: '20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        }
    }));
    const classes = useStyles();
    const dispatch = useDispatch()
    const user = useSelector(state => state.loginReducer.user);
    const [expanded, setExpanded] = useState(false)
    const [newBulletinTitle, setNewBulletinTitle] = useState("")
    const [newBulletinContent, setNewBulletinContent] = useState("")
    const classroomID = useSelector(state => state.classroomPageReducer.classroomID)
    var bulletins = useSelector(state => state.classroomPageReducer.bulletins)
    var bulletinList = bulletins.map((bulletin) =>
        <div key={bulletin.timeStamp} className={classes.bulletinPostit}>
            <Bulletin bulletin={bulletin} />
        </div>
    )

    return (
        <div className={classes.root}>
            <div className={classes.bulletinPostit}>
                <Card square elevation={5} onClick={() => setExpanded(true)}>
                    <CardActionArea className={classes.createRoot}>
                        <Typography variant='h5' className={classes.createTitle}>
                            <div style={{display: 'flex', alignItems: 'center'}}>

                                {"新增貼文"}<CreateIcon></CreateIcon>
                            </div>
                        </Typography>


                    </CardActionArea>
                </Card>
                {expanded && <div className={classes.layer} onClick={() => setExpanded(false)}></div>}
                <Zoom in={expanded}>
                    <Card className={classes.expandedCard}>
                        <div className={classes.expandedTitle}>
                            <TextField
                                placeholder="標題"
                                fullWidth
                                value={newBulletinTitle}
                                onChange={(e) => setNewBulletinTitle(e.target.value)}
                                InputProps={{
                                    classes: {
                                        input: classes.titleFont,
                                    },
                                }}
                            />
                        </div>
                        <div className={classes.expandedTitle}>
                            <TextField
                                placeholder="內文"
                                multiline
                                fullWidth
                                rows={4}
                                value={newBulletinContent}
                                onChange={(e) => setNewBulletinContent(e.target.value)}
                                InputProps={{
                                    classes: {
                                        input: classes.contentFont,
                                    },
                                }}
                            />
                        </div>
                        <div>
                            {
                                typeof user.userInfo !== 'undefined' && <div className={classes.expandedAuthor}>
                                    <Avatar alt={user.userInfo.name} src={user.userInfo.avatar} style={{ marginLeft: '10px', width: '35px', height: '35px', border: '1px solid lightgray' }} />
                                    <Typography variant="subtitle2" style={{ marginLeft: '10px', marginRight: '10px' }}>{user.userInfo.name}</Typography>
                                </div>
                            }


                        </div>
                        <div className={classes.postButton}>
                            <Button variant="contained" color="primary" size="large" onClick={()=>{dispatch(postBulletin(newBulletinTitle, newBulletinContent, classroomID)); setExpanded(false)}}>
                                發布
                            </Button>
                        </div>
                    </Card>
                </Zoom>
            </div>
            {
                bulletinList
            }
        </div>
    )
}
