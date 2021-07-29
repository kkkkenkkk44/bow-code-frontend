import React from "react";
import { Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { changeTestDataIdx } from "../../actions/createProblem";
import { removeTestData } from "../../actions/createProblem";
import { addTestData } from "../../actions/createProblem";
import { Button } from '@material-ui/core';
import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

function TestDataPair(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            alignItems: 'baseline',
            height: '40px'
        },
        input: {
            marginLeft: '5%',
            marginRight: '10px',
            flex: 5
        },
        output: {
            marginLeft: '10px',
            flex: 5
        },
        arrow: {
            flex: 1,
            color: '#898989'
        },
        remove: {
            fontSize: '14px',
            flex: 1
        }
    }))
    const classes = useStyles()
    const dispatch = useDispatch()
    return <div>
        <div className={classes.root}>
            <TextField className={classes.input} id="input" value={props.data.input} onChange={(e) => dispatch(changeTestDataIdx(props.index, e.target.value, "input"))} />
            <Typography className={classes.arrow} variant="subtitle1"> {">"} </Typography>
            <TextField className={classes.output} id="output" value={props.data.output} onChange={(e) => dispatch(changeTestDataIdx(props.index, e.target.value, "output"))} />
            <Typography className={classes.remove} variant="subtitle1">
                <IconButton className={classes.remove} onClick={() => dispatch(removeTestData(props.index))}>
                    <ClearIcon fontSize="inherit"></ClearIcon>
                </IconButton>
            </Typography>
        </div>
    </div>
}

export default function GenerateTestData() {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex'
        },
        header: {
            display: 'flex'
        },
        headerTitleLeft: {
            flex: 5,
            marginLeft: '5%',
            marginRight: '10px',
            textAlign: 'center'
        },
        headerTitleRight: {
            flex: 5,
            marginLeft: '10px',
            textAlign: 'center'
        },
        blankPadding: {
            flex: 1
        },
        datas: {
            textAlign: 'center',
            width: '300px',
            flex: 1
        },
        addButton: {
            width: '90%',
            borderBottom: '0.1px #bbbbbb solid',
            borderRadius: 0,
            marginLeft: '5%',
            marginRight: '5%',
            height: '40px'
        },
        desc: {
            flex: 1
        }
    }))
    const classes = useStyles()
    const desc = useSelector(state => state.createProblemReducer.description)
    const testdatas = useSelector(state => state.createProblemReducer.testdatas)
    const dispatch = useDispatch()
    console.log(testdatas)

    var testdataRows = testdatas.map((test, i) => <TestDataPair data={test} index={i} key={i} />)
    return <div className={classes.root}>
        <div className={classes.desc} dangerouslySetInnerHTML={{ __html: desc }} />
        <div className={classes.datas}>
            <div className={classes.header}>
                <Typography className={classes.headerTitleLeft} variant='h6'>輸入</Typography>
                <div className={classes.blankPadding}></div>
                <Typography className={classes.headerTitleRight} variant='h6'>輸出</Typography>
                <div className={classes.blankPadding}></div>
            </div>
            {testdataRows}
            <Button className={classes.addButton} onClick={() => dispatch(addTestData())}>
                <AddIcon />
            </Button>
        </div>
    </div>
}