import React from 'react'
import NavBar from '../components/NavBar'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { GoogleLogin } from 'react-google-login';
import { loginAsync } from '../actions/login'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router';
import { applyClassroom } from "../actions/applyClassroomPage";

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function responseGoogle(dispatch) {
    return (res) => {
        var payload = {
            method: "google",
            authPayload: res.tokenId
        }
        dispatch(loginAsync(payload))
    }
}

export default function LoginPage() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const isLogin = useSelector(state => state.loginReducer.isLogin)
    const location = useLocation()

    const applyClassroomAndRedirect = () => {
        applyClassroom(location.state.classroomID)
        return <Redirect to={`/classroom/${location.state.classroomID}`} />
    }

    return (
        isLogin ?
            location.state && (location.state.from === 'applyClassroom') ?
                applyClassroomAndRedirect()
                :
                <Redirect to='/home' />
            :
            <div>
                <NavBar context="CoDai" />
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </form>
                        <Typography component="h5" variant="h5">
                            or
                        </Typography>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_LOGIN}
                            buttonText="Login"
                            render={renderProps => (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={renderProps.onClick}
                                    className={classes.submit}
                                > Continue with Google </Button>
                            )}
                            onSuccess={responseGoogle(dispatch)}
                            onFailure={(res) => console.log(res)}
                            cookiePolicy={'single_host_origin'}
                        />

                        {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/123" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid> */}

                    </div>
                </Container>
            </div>
    );
}