import { CHANGE_DESC, ADD_TESTDATA, CHANGE_TESTDATA, RESET_FORM, REMOVE_TESTDATA } from "../actions/createProblem";

const initState = {
    description: "<h2>題目敘述</h2><p>在這裡寫下對整個題目大致的描述，比如：</p><ul><li>題目的目標</li><li>學生要做的事</li><li>參考的程式碼</li></ul><h2>程式的輸入格式</h2><p>說明資料會如何輸入</p><h2>程式的輸出格式</h2><p>規範輸出的格式</p>",
    testdatas: [{ input: "", output: "" }]
}

const createProblemReducer = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_DESC:
            return {
                ...state,
                description: action.payload.data
            }
        case ADD_TESTDATA:
            return {
                ...state,
                testdatas: state.testdatas.concat([{ input: "", output: "" }])
            }
        case CHANGE_TESTDATA:
            var newData = state.testdatas[action.payload.idx]
            newData[action.payload.pos] = action.payload.data
            return {
                ...state,
                testdatas: state.testdatas.map((data, i) => i == action.payload.idx ? newData : data)
            }
        case REMOVE_TESTDATA:
            return {
                ...state,
                testdatas: state.testdatas.filter((_, i) => i != action.payload.idx)
            }

        case RESET_FORM:
            return initState
        default:
            return {
                ...state
            }
    }
}

export default createProblemReducer