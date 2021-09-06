const initialCoursePlanEditorState = {

    coursePlanList: [],
    chosenCourseList: [],
    componentList: [
        {
            name: "1",
            type: 0,
            setList: [
                {
                    id: '612c9f38255e0aa1fa29b220',
                    name: "",
                    totalScore: 0,
                }
            ],
        }
    ],
    componentDetailList: [
        {
            name: "course1",
            type: 0,
            setList: [
                {
                    id: '612c9f38255e0aa1fa29b220',
                    name: "course1",
                    abstract: "course1",
                    blockList: [],
                    creator: "oscar",
                    tags: ["tag1", "tag2", "tag3"],
                    difficulty: 0,
                    category: "self-learn",
                    isPublic: true,
                    createTime: "2021-07-15T11:19:17.65Z",
                    view: 0,
                }
            ]
        },
        {
            name: "homework1",
            type: 1,
            setList: [
                {
                    id: '60fc25e0dc40d09a9a0b0a40',
                    name: "problem1",
                    creator: "oscar",
                    description: "problem1",
                    defaultcontent: "",
                    testcase: {},
                    totalScore: 0,
                    tags: ["tag1", "tag2", "tag3"],
                    difficulty: 0,
                    category: "default",
                    visibility: 0,
                    createtime: "2021-07-15T11:19:17.65Z",
                },
                {
                    id: '6103623ffc77e001dde59406',
                    name: "problem2",
                    creator: "oscar",
                    description: "problem2",
                    defaultcontent: "",
                    testcase: {},
                    totalScore: 0,
                    tags: ["tag1", "tag2", "tag3"],
                    difficulty: 0,
                    category: "default",
                    visibility: 0,
                    createtime: "2021-07-15T11:19:17.65Z",
                }
            ]
        },
        {
            name: "exam1",
            type: 2,
            setList: [
                {
                    id: '60fc25e0dc40d09a9a0b0a40',
                    name: "problem1",
                    creator: "oscar",
                    description: "problem1",
                    defaultcontent: "",
                    testcase: {},
                    totalScore: 0,
                    tags: ["tag1", "tag2", "tag3"],
                    difficulty: 0,
                    category: "default",
                    visibility: 0,
                    createtime: "2021-07-15T11:19:17.65Z",
                },
                {
                    id: '6103623ffc77e001dde59406',
                    name: "problem2",
                    creator: "oscar",
                    description: "problem2",
                    defaultcontent: "",
                    testcase: {},
                    totalScore: 0,
                    tags: ["tag1", "tag2", "tag3"],
                    difficulty: 0,
                    category: "default",
                    visibility: 0,
                    createtime: "2021-07-15T11:19:17.65Z",
                }
            ]
        }
    ],
    creator: "",
    name: "",
    isFetching: false,
    visibility: 0
}

const coursePlanEditorReducer = (state = initialCoursePlanEditorState, action) => {

    var newChosenCourseList
    switch (action.type) {
        
        case "FETCHING_COURSEPLAN":
            return {
                ...state,
                isFetching: true
            }
        case "STORE_COURSEPLANLIST":
            return {
                ...state,
                coursePlanList: action.payload
            }
        case "CHOOSE_COURSE":
            newChosenCourseList = Array.from(state.chosenCourseList)
            newChosenCourseList.push(action.payload.course)
            return {
                ...state,
                chosenCourseList: newChosenCourseList
            }
        case "UNCHOOSE_COURSE":
            newChosenCourseList = Array.from(state.chosenCourseList)
            var index = newChosenCourseList.findIndex(course => course.id === action.payload.course.id)
            newChosenCourseList.splice(index, 1)
            return {
                ...state,
                chosenCourseList: newChosenCourseList
            }
        case "SAVE_COURSEPLAN_INFO":
            return {
                ...state,
                name: action.payload.name,
                creator:action.payload.creator,
                componentList: action.payload.componentList,
                visibility: action.payload.visibility,
                isFetching: false
            }
        default:
            return state;
    }
}

export default coursePlanEditorReducer