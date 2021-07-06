import { Grid, IconButton, makeStyles, Typography, Popper, Paper, MenuItem, ClickAwayListener, MenuList } from "@material-ui/core"
import { useState } from "react";
import CourseBlockEditor from "./CourseBlockEditor";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    courseBlockEditor: {
        margin: "20px 0 20px 0"
    },
    title: {
        width: "99%"
    }
}))

const TitleBLock = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const [focus, setFocus] = useState(false)
    const [createBlockOptionConfig, setCreateBlockOptionConfig] = useState({
        open: false,
        anchor: null,
        placement: 'right-start'
    })

    const handleClose = () => {
        setCreateBlockOptionConfig({
            open: false,
            anchor: null,
            placement: 'right-start'
        })
    }
    return(
        <ClickAwayListener 
            onClickAway={()=>{
                setFocus(false)
                handleClose()
            }
        }>
            <Grid container justify="center" alignItems="center" onClick={()=>setFocus(true)}>
                {focus?
                    <Grid item xs={1} className={classes.button_container}/>
                    :
                    <></>
                }
                <Grid item xs={10}>
                    <Typography variant="h5">Title</Typography>
                    {/* <input className={classes.title} defaultValue={"Course Title"}></input> */}
                </Grid>
                {focus?
                    <Grid item xs={1} className={classes.button_container}>
                        <IconButton 
                            id={`addBlockButton_title`}
                            onClick={(e)=>{
                                setCreateBlockOptionConfig({
                                    open: !createBlockOptionConfig.open,
                                    anchor: document.getElementById(`addBlockButton_title`),
                                    placement: 'right-start'
                                })
                            }
                        }>
                            <AddIcon />
                        </IconButton>
                        <Popper 
                            open={createBlockOptionConfig.open}
                            anchorEl={createBlockOptionConfig.anchor}
                            placement={createBlockOptionConfig.placement}
                            transition
                        >
                            <Paper>
                                <ClickAwayListener 
                                    onClickAway={()=>{
                                        handleClose()
                                    }
                                }>
                                    <MenuList>
                                        <MenuItem onClick={(e)=>{
                                            dispatch({ type: "ADD_NEW_BLOCK", payload: { index: -1 } })
                                            handleClose()
                                            setFocus(false)
                                        }}>
                                            新增文字
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Popper>
                    </Grid>
                    :
                    <></>
                }
                
            </Grid>
        </ClickAwayListener>
    )
}

export default function CourseEditor(){

    const classes = useStyles()

    const blocks = useSelector(state => state.courseEditorReducer.blocks)

    return(
        <Grid container justify="center">
            <Grid item xs={10}>
                <div className={classes.courseBlockEditor}>    
                    <TitleBLock/>
                </div>
                {
                    blocks.map((block, index) => {
                        return(
                            <div className={classes.courseBlockEditor}>
                                <CourseBlockEditor
                                    key={index}
                                    index={index}
                                    block={block}
                                />
                            </div> 
                    )})
                }
            </Grid>
        </Grid>
    )
}