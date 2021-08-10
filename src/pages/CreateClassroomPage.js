import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardActionArea from '@material-ui/core/CardActionArea';
import NavBar from '../components/NavBar'
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
      },
      heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
      },
      heroButtons: {
        marginTop: theme.spacing(4),
      },
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cc: {
        display: 'flex',
        align: 'right',

      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
        margin: '20px',
        align: 'right',
        //alignItems: 'center',
      },
      
  }));


export default function CreateClassroomPage () {

    const classes = useStyles();
    const history = useHistory();

    return (
        <div>
            <NavBar context="Bow-Code" />
            <Container className={classes.cardGrid} maxWidth="md" >
            {/* End hero unit */}
            <Grid container spacing={4} className={classes.cc}>
                <Grid item xs={12} sm={6} md={4} >
                    <Card className={classes.card}>
                        <CardActionArea onClick={() => history.push('/createSingleClassroom')}>
                            <CardMedia
                                className={classes.cardMedia}
                                image="https://www.abccolumbia.com/content/uploads/2020/03/ea96b4263adb9ab60143f94ab8eba5a5f9bc954d_fl9-360p.jpg"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography align={'center'}>
                                    建立單一教室
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                        <CardActionArea onClick={() => history.push('/createMultipleClassroom')}>
                            <CardMedia
                                className={classes.cardMedia}
                                image="https://www.abccolumbia.com/content/uploads/2020/03/ea96b4263adb9ab60143f94ab8eba5a5f9bc954d_fl9-360p.jpg"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography align={'center'}>
                                    以一個教案建立多個教室
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
            </Container>
        </div>

    )
}

