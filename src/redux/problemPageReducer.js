const initialProblemPageState = {
    isFetching: false,
    name: "單元名稱",
    description: "單元敘述",
    defaultContent: "code",
    tags: ["math", "C++"],
    difficulty: 2,
    category: "default",
    isPublic: true,
    isFetchingSubmission: false,
    submissionIDs: [],
    submissions: []
}

const problemPageReducer = (state = initialProblemPageState, action) => {
    switch (action.type) {
        case "FETCH_PROBLEM_START":
            return {
                ...state,
                isFetching: true
            }
        case "FETCH_PROBLEM_END":
            const { name, description, defaultContent, tags, difficulty, category, isPublic } = action.payload
            return {
                ...state,
                isFetching: false,
                name,
                description,
                defaultContent,
                tags,
                difficulty,
                category,
                isPublic
            }
        case "FETCH_SUBMISSION_START":
            return {
                ...state,
                isFetchingSubmission: true
            }
        case "FETCH_SUBMISSION_END":
            const { submissions } = action.payload
            console.log(submissions)
            return {
                ...state,
                isFetchingSubmission: false,
                submissions
            }
        default:
            return state;
    }
}

export default problemPageReducer