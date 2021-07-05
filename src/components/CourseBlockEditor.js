import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Grid, Popper, Paper, MenuList, MenuItem, ClickAwayListener, makeStyles, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react'
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    button_container: {
        display: "flex",
        justifyContent: "center"
    }
  }));

export default function CourseBlockEditor(props){

    const classes = useStyles();
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
            <Grid container justify="center" alignItems="center" onFocus={()=>setFocus(true)}>
                {focus?
                    <Grid item xs={1} className={classes.button_container}>
                        <IconButton
                            onClick={()=>dispatch({ type: "DELETE_BLOCK", payload: { index: props.index }})}
                        >
                            <DeleteIcon />
                        </IconButton>                    
                    </Grid>
                    :
                    <></>
                }
                <Grid item xs={10}>
                    <CKEditor
                        editor={ClassicEditor}
                        data={props.block.content}
                        onChange={(event, editor)=>{
                            dispatch({ type: "MODIFY_CONTENT", payload: { index: props.index, content: editor.getData() }})
                        }}
                    />
                </Grid>
                {focus?
                    <Grid item xs={1} className={classes.button_container}>
                        <IconButton 
                            id={`addBlockButton_${props.index}`}
                            onClick={(e)=>{
                                setCreateBlockOptionConfig({
                                    open: !createBlockOptionConfig.open,
                                    anchor: document.getElementById(`addBlockButton_${props.index}`),
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
                                            dispatch({ type: "ADD_NEW_BLOCK", payload: { index: props.index } })
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