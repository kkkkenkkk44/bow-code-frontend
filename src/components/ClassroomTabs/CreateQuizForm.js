import React from 'react'
import { Card, makeStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'

export default function CreateQuizForm(props) {
    const useStyles = makeStyles((theme) => ({
        layer: {
            backgroundColor: "#000000",
            opacity: 0.5,
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            zIndex: 99
        },
        expandedCard: {
            position: 'fixed',
            top: 0,
            left: 0,
            height: '80vh',
            width: '80vh',
            marginLeft: "calc(50vw - 40vh)",
            marginTop: '10vh',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column'
        },
        postButton: {
            marginTop: 'auto',
            marginRight: '20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        }
    }))
    const classes = useStyles()
    return <Card className={classes.expandedCard}>
            <div className={classes.expandedTitle}>
            </div>

            <div className={classes.postButton}>
                <Button variant="contained" color="primary" size="large">
                    發布
                </Button>
            </div>
        </Card>
}

