import React from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


class CourseCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var abstract = this.props.course.abstract
        if (abstract.length > 80) {
            abstract = abstract.substring(0, 80) + "..."
        }
        return (
            <Card>
                <CardContent>
                    <h4>{this.props.course.name}</h4>
                    <p>{abstract}</p>
                </CardContent>
            </Card>
        )
    }
}

export default CourseCard