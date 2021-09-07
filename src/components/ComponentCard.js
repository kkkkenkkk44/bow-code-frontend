import React from "react"
import { Card, CardContent, Typography } from '@material-ui/core';

export default function ComponentCard(props) {
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h4">
                        {props.name}
                    </Typography>
                </CardContent>
                <CardContent>
                    {props.children}
                </CardContent>
            </Card>
        </div>
    )
}
