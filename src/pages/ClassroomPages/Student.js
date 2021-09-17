import React from 'react'
import { useDispatch } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector } from 'react-redux';
import { IconButton, Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { acceptApplication } from '../../actions/classroomPage'


const StyledBadge = withStyles((theme) => ({
    badge: {
        verticalAlign: 'center',
        left: '50px',
        top: '13px',
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

function ApplicantTile(props) {
    const applicant = props.applicant
    const applicantID = props.id
    const dispatch = useDispatch()
    const classroomID = useSelector(state => state.classroomPageReducer.classroomID)
    return <div>
        <ListItem style={{
            flex: 1,
            backgroundColor: '#f0f0f0',
            marginBottom: '5px'
        }}>
            <IconButton size="small" onClick={() => dispatch(acceptApplication(applicantID, classroomID))}><CheckIcon></CheckIcon></IconButton>
            <IconButton size="small" style={{ color: "#aaaaaa" }}><ClearIcon></ClearIcon></IconButton>
            <Avatar alt={applicant.userInfo.name} src={applicant.userInfo.avatar} style={{ marginLeft: '10px', marginRight: '15px', width: '35px', height: '35px', border: '1px solid lightgray' }} />
            <ListItemText primary={applicant.userInfo.name} />
        </ListItem>
    </div>
}

export default function Student() {
    const useStyles = makeStyles(theme => ({
        root: {
            height: '70vh',
            marginLeft: '10%',
            marginRight: '10%'
        }
    }))
    const studentInfos = useSelector(state => state.classroomPageReducer.studentInfos)
    const applicant = useSelector(state => state.classroomPageReducer.applicantInfos)
    const homeworkList = useSelector(state => state.classroomPageReducer.homeworkList)
    const quizList = useSelector(state => state.classroomPageReducer.quizList)
    var columns = [
        {
            field: 'name',
            headerName: '名稱',
            width: 150,
        }
    ];
    homeworkList.map(hw => {
        columns.push({
            field: hw.component.name,
            headerName: hw.component.name,
            width: 150,
        })
    })
    quizList.map(quiz => {
        columns.push({
            field: quiz.component.name,
            headerName: quiz.component.name,
            width: 150,
        })
    })
    
    const rows = Object.keys(studentInfos).map(id => {
        var row = { id: id, name: studentInfos[id].userInfo.name }
        homeworkList.map((hw, i) => {
            var totalScore = 0
            studentInfos[id].scores.homeworkComponentScoreList[i].setScoreList.map(problem => totalScore += problem.score == -1 ? 0 : problem.score)
            row[hw.component.name] = totalScore
        })
        return row
    })
    const applicantTiles = Object.keys(applicant).map(id => <ApplicantTile id={id} applicant={applicant[id]} key={id}></ApplicantTile>)
    const [tab, setTab] = React.useState(0)
    const classes = useStyles()
    return <div>

        <Tabs
            value={tab}
            onChange={(e, value) => setTab(value)}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="學生名單與成績" />
            <Tab label={<StyledBadge badgeContent={Object.keys(applicant).length} color="secondary">待審核</StyledBadge>} />
        </Tabs>
        <div className={classes.root}>
            {
                tab == 0 &&
                <DataGrid
                    columns={columns}
                    rows={rows}
                />
            }
            {
                tab == 1 && <List>
                    {applicantTiles}
                </List>
            }
        </div>
    </div>
}