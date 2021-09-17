import { Card, CardContent, makeStyles } from "@material-ui/core"
import { useSelector } from "react-redux"

const useStyle = makeStyles((theme) => ({
    componentCard: {
        marginBottom: theme.spacing(2)
    }
}))

export default function ModifyComponentOrderList(props) {

    const classes = useStyle()
    const { componentList } = useSelector(state => state.coursePlanEditorReducer)
    return (
        <div>
            {componentList.map(component => {
                switch (component.type) {
                    case 0:
                        return (
                            <div className={classes.componentCard} key={component.name}>
                                <Card>
                                    <CardContent>
                                        {component.name}
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    default:
                        return (
                            <div className={classes.componentCard} key={component.name}>
                                <Card>
                                    <CardContent>
                                        {component.name}
                                    </CardContent>
                                </Card>
                            </div>
                        )

                }
            })}
        </div>
    )
}