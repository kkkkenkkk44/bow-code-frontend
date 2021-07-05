import { Grid, Button, makeStyles, Typography, Popper, Paper, MenuItem, ClickAwayListener, MenuList, Link } from "@material-ui/core"
import { Link as RouterLink } from 'react-router-dom';
import { useState } from "react";
import CourseBlockEditor from "./CourseBlockEditor";
import { useSelector } from "react-redux";

export default function CourseEditor(){

    const [createBlockOptionConfig, setCreateBlockOptionConfig] = useState({
        open: false,
        anchor: null,
        placement: 'right-start'
    })

    const blocks = useSelector(state => state.courseEditorReducer.blocks)

    return(
        <Grid container justify="center">
            <Grid item xs={10}>
                {
                    blocks.map((block, index) => {
                        return <CourseBlockEditor
                            key={index}
                            index={index}
                            block={block}
                        />
                    })
                }
            </Grid>
        </Grid>
    )
}