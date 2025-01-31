import { Zoom } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Card, makeStyles } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { useState } from "react";
import { Divider } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { IconButton } from "@material-ui/core";
import { reactToBulletin, reactToReply, replyToBulletin } from "../actions/classroomPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { asyncGetUserInfo } from "../utils/user";
import ContentLoader from 'react-content-loader'

function ReplyCard(props) {
    const reply = props.reply
    const bulletinId = props.bulletinId
    const user = useSelector(state => state.loginReducer.user)
    const useStyle = makeStyles((theme) => ({
        root: {
            display: 'flex'
        },
        author: {
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px'
        },
        content: {
            margin: '20px',
            marginTop: '10px'
        },
        card: {
            padding: '5px',
            minHeight: '100px',
            flex: 1
        },
        thumbup: {
            float: 'right',
            height: '40px',
            width: '40px',
            display: 'flex',
            marginRight: '10px',
            alignItems: 'center',
            color: '#888888'
        }
    }))
    const classes = useStyle()
    const dispatch = useDispatch()
    const [creator, setCreator] = useState({})
    const [isFetchingCreator, setIsFetchingCreator] = useState(true)
    useEffect(()=>{
        asyncGetUserInfo(reply.creator).then(res => res.json()).then(data => {
            setCreator(data)
            setIsFetchingCreator(false)
        })
    }, [])
    return isFetchingCreator? <div className={classes.root}><ContentLoader/></div> : <div className={classes.root} >
        <Card className={classes.card} square elevation={1}>
            <div className={classes.author}>
                <Avatar alt={creator.userInfo.name} src={creator.userInfo.avatar} style={{ marginLeft: '10px', width: '35px', height: '35px', border: '1px solid lightgray' }} />
                <Typography variant="subtitle2" style={{ marginLeft: '10px', marginRight: '10px' }}>{creator.userInfo.name}</Typography>
            </div>
            <Typography variant="subtitle1" className={classes.content}>
                {reply.content}
                <div className={classes.thumbup}>
                    <IconButton onClick={() => dispatch(reactToReply(bulletinId, props.index, user.id))}>
                        {
                            typeof user.userInfo !== 'undefined' && (reply.reactions.includes(user.id) ? <ThumbUpIcon></ThumbUpIcon> : <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>)
                        }
                    </IconButton>
                    <Typography variant="subtitle2">
                        {reply.reactions.length}
                    </Typography>
                </div>
            </Typography>
        </Card>
    </div>
}

export default function Bulletin(props) {
    const bulletin = props.bulletin
    const user = useSelector(state => state.loginReducer.user)
    const useStyle = makeStyles((theme) => ({
        root: {
            minHeight: '250px',
            minWidth: '280px',
            display: 'flex',
            flexDirection: 'column'
        },
        title: {
            padding: '15px'
        },
        author: {
            marginLeft: 'auto',
            marginTop: 'auto',
            order: 2,
            margin: '15px',
            verticalAlign: 'bottom'
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
        expandedReplies: {
            overflowY: 'auto',
            marginLeft: '40px',
            marginRight: '40px',
            marginTop: '20px',
        },
        expandedReplyCard: {
            margin: '10px'
        },
        expandedUserReply: {
            display: 'flex',
            alignItems: 'center',
            margin: '20px',
            marginLeft: '30px',
            marginRight: '40px',
        },
        replyInput: {
            borderRadius: '20px',
            marginLeft: '5px'
        },
        thumbup: {
            float: 'right',
            height: '40px',
            width: '40px',
            display: 'flex',
            marginRight: '20px',
            alignItems: 'center',
            color: '#888888'
        }
    }))
    const [expanded, setExpanded] = useState(false)
    const classes = useStyle()
    const dispatch = useDispatch()
    const [newReply, setNewReply] = useState("")
    const [creator, setCreator] = useState({})
    const [isFetchingCreator, setIsFetchingCreator] = useState(true)
    const classroomID = useSelector(state => state.classroomPageReducer.classroomID)
    const replies = bulletin.replies.map((reply, i) => <div key={reply.createTime} className={classes.expandedReplyCard}>
        <ReplyCard reply={reply} bulletinId={bulletin.id} index={i} />
    </div>)
    useEffect(()=>{
        asyncGetUserInfo(bulletin.creator).then(res => res.json()).then(data => {
            setCreator(data)
            setIsFetchingCreator(false)
        })
    }, [])
    return isFetchingCreator? <div><Card square elevation={5} className={classes.root}><ContentLoader/></Card></div> : <div>
        <Card square elevation={5}>
            <CardActionArea className={classes.root} onClick={() => setExpanded(true)}>
                <Typography variant='h5' className={classes.title}>
                    {bulletin.title}
                </Typography>
                <Typography variant='subtitle1' className={classes.author}>
                    {creator.userInfo.name}
                </Typography>
            </CardActionArea>
        </Card>
        {expanded && <div className={classes.layer} onClick={() => setExpanded(false)}></div>}
        <Zoom in={expanded}>
            <Card className={classes.expandedCard}>
                <div>
                    <Typography variant='h5' className={classes.expandedTitle}>
                        {bulletin.title}
                    </Typography>
                    <Typography variant='subtitle1' className={classes.expandedContent}>
                        {bulletin.content}
                    </Typography>
                    <div className={classes.expandedAuthor}>
                        <div className={classes.thumbup}>
                            <IconButton onClick={() => dispatch(reactToBulletin(bulletin.id, user.id))}>
                                {
                                    typeof user.userInfo !== 'undefined' && (bulletin.reactions.includes(user.id) ? <ThumbUpIcon></ThumbUpIcon> : <ThumbUpOutlinedIcon></ThumbUpOutlinedIcon>)
                                }
                            </IconButton>
                            <Typography variant="subtitle2">
                                {bulletin.reactions.length}
                            </Typography>
                        </div>
                        <Avatar alt={creator.userInfo.name} src={creator.userInfo.avatar} style={{ marginLeft: '10px', width: '35px', height: '35px', border: '1px solid lightgray' }} />
                        <Typography variant="subtitle2" style={{ marginLeft: '10px', marginRight: '10px' }}>{creator.userInfo.name}</Typography>
                    </div>

                    <Divider className={classes.expandedDivider}></Divider>

                </div>
                <div className={classes.expandedReplies}>
                    {replies}
                </div>
                <div className={classes.expandedUserReply}>
                    <Avatar alt={typeof user.userInfo !== 'undefined' ? user.userInfo.name : null} src={typeof user.userInfo !== 'undefined' ? user.userInfo.avatar : null} style={{ marginLeft: '10px', width: '35px', height: '35px', border: '1px solid lightgray' }} />
                    <TextField fullWidth InputProps={{ className: classes.replyInput }} placeholder="回覆" variant="outlined" size="small"
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                dispatch(replyToBulletin(newReply, bulletin.id, classroomID))
                                setNewReply("")
                                ev.preventDefault();
                            }
                        }}
                        value={newReply}
                        onChange={(e)=>setNewReply(e.target.value)}
                    />
                </div>
            </Card>
        </Zoom>
    </div>
}