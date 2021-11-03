import { Redirect } from "react-router"
import { useParams } from "react-router"

export default function RedirectToProblemPage() {
    const { ProblemID } = useParams()
    return <Redirect to={`/problem/${ProblemID}`}/>
}