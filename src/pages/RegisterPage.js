import React, { useState } from 'react'
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
import { Redirect } from 'react-router';

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

export default function RegisterPage() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const isLogin = useSelector(state => state.loginReducer.isLogin)

    const [focus, setFocus] = useState('')
    const [nickname, setNickname] = useState('')
    const [school, setSchool] = useState('')
    const [studentID, setStudentID] = useState('')
    const [schoolClass, setSchoolClass] = useState('')
    const [seatNumber, setSeatNumber] = useState('')

    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = () => {
        //call api
        setSubmitted(true)
    }

    return (
        isLogin ? <Redirect to='/home' /> :
            <div>
                <NavBar context="CoDAI 教室" />
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            填寫基本資料
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="nickname"
                                label="暱稱"
                                required
                                name="nickname"
                                autoComplete="nickname"
                                autoFocus
                                error={nickname === "" && focus !== "nickname"}
                                helperText={nickname === "" && focus !== "nickname" ? "必填*" : ""}
                                value={nickname}
                                onChange={(e) => { setNickname(e.target.value) }}
                                onFocus={() => { setFocus('nickname') }}
                                onBlur={() => { setFocus('') }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="school"
                                label="學校"
                                name="school"
                                autoComplete="school"
                                value={school}
                                onChange={(e) => { setSchool(e.target.value) }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="studentID"
                                label="學號"
                                id="studentID"
                                autoComplete="studentID"
                                value={studentID}
                                onChange={(e) => { setStudentID(e.target.value) }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="class"
                                label="班級"
                                id="class"
                                autoComplete="class"
                                value={schoolClass}
                                onChange={(e) => { setSchoolClass(e.target.value) }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="seatnumber"
                                label="座號"
                                id="seatnumber"
                                autoComplete="seatnumber"
                                value={seatNumber}
                                onChange={(e) => { setSeatNumber(e.target.value) }}
                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => { handleSubmit() }}
                            >
                                確認
                            </Button>
                        </form>
                    </div>
                </Container>
                {
                    submitted ?
                        <Redirect to="/home" />
                        :
                        <></>
                }
            </div>
    );
}