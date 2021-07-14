import { Typography, List, ListItem, ListItemText, Link, makeStyles } from '@material-ui/core'
import NavBar from '../components/NavBar'
import CreateProblemForm from '../components/CreateProblemForm'


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));






export default function CreateProblemPage() {

    const classes = useStyles();

    return (
        <div>
            <NavBar context="Bow-Code" />
            <div className={classes.paper}>
                <Typography component="h1" variant="h6">
                    建立題目
                </Typography>
                <CreateProblemForm />
            </div>
        </div>
    )
}