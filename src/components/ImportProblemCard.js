import React from "react";
import { Paper } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';

export default function ImportPorblemCard(props) {
    const problem = props.problem
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            height: theme.spacing(7),
            alignItems: "center"
        },
        name: {
            flex: 6,
            margin: "10px"
        },
        statusText: {
        },
        tags: {
            display: "flex",
            marginRight: 0,
            marginLeft: 'auto',
        },
        tagChip: {
            marginRight: "10px"
        },
        difficulty: {
            marginLeft: "10px"
        }
    }))

    const classes = useStyles();
    const tagChips = problem.tags.map(tag => <Chip className={classes.tagChip} key={tag} label={tag} variant="outlined" />)
    var difficulty
    switch (props.problem.difficulty) {
        case 0:
            difficulty = <div className={classes.difficulty}>
                <StarIcon></StarIcon>
                <StarOutlineIcon></StarOutlineIcon>
                <StarOutlineIcon></StarOutlineIcon>
            </div>
            break
        case 1:
            difficulty = <div className={classes.difficulty}>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
                <StarOutlineIcon></StarOutlineIcon>
            </div>
            break
        case 2:
            difficulty = <div className={classes.difficulty}>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
            </div>
            break

    }
    return <Paper elevation={1} square >
        <CardActionArea className={classes.root} onClick={() => props.setImportProblemID(props.problem.id)}>
            {difficulty}
            <div className={classes.name}>
                <Typography className={classes.statusText} variant="h6" component="h5">
                    {problem.name}
                </Typography>
            </div>
            <div className={classes.tags}>
                {tagChips}
            </div>
        </CardActionArea>
    </Paper>
}