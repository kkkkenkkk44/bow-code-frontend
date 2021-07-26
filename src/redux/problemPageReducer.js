const initialProblemPageState = {
    isFetching: false,
    name: "課程名稱",
    description: "課程敘述",
    defaultContent: "code",
    tags: ["math", "C++"],
    difficulty: 2,
    category: "default",
    isPublic: true,
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
        default:
            return state;
    }
}

export default problemPageReducer