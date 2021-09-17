import React from "react";
import Card from '@material-ui/core/Card';
import { useHistory } from "react-router";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";

export default function ClassroomCard(props) {
    const useStylesCompress = makeStyles(theme => ({
        root: {
            height: '40px',
            marginLeft: '15%',
            marginRight: '15%',
            display: 'flex',
            alignItems: 'center'
        },
        name: {
            marginLeft: '20px'
        }
    }))
    const useStyles = makeStyles(theme => ({
        root: {
            flex: 1,
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: "40%",
            height: '300px',
            display: 'flex',
            margin: '30px',
            alignItems: 'center'
        },
        name: {
            marginLeft: '20px'
        }
    }))
    const classroom = props.classroom
    const compress = props.compress
    const classesCompress = useStylesCompress()
    const classes = useStyles()
    const history = useHistory();
    return compress ? <Card className={classesCompress.root} square>
        <CardActionArea style={{ height: '100%' }} onClick={() => history.push(`/classroom/${classroom.id}`)}>
            <Typography variant="subtitle1" className={classesCompress.name}>
                {classroom.name}
            </Typography>
        </CardActionArea>
    </Card> : <Card className={classes.root}>
        <CardActionArea style={{ height: '100%' }} onClick={() => history.push(`/classroom/${classroom.id}`)}>
            <Typography variant="subtitle1" className={classes.name}>
                {classroom.name}
            </Typography>
        </CardActionArea>
    </Card>
}