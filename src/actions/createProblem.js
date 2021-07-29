export const CHANGE_DESC = 'CHANGE_DESC'
export const ADD_TESTDATA = 'ADD_TESTDATA'
export const CHANGE_TESTDATA = 'CHANGE_TESTDATA'
export const RESET_FORM = 'RESET_FORM'
export const REMOVE_TESTDATA = 'REMOVE_TESTDATA'

export const handleChangeDescription = (data) => ({
    type: CHANGE_DESC,
    payload: {
        data: data
    }
})

export const addTestData = () => ({
    type: ADD_TESTDATA
})

export const changeTestDataIdx = (idx, data, pos) => {console.log(data);return{
    type: CHANGE_TESTDATA,
    payload: {
        idx: idx,
        data: data,
        pos: pos
    }
}}

export const removeTestData = (index) => ({
    type: REMOVE_TESTDATA,
    payload: {
        idx: index
    }
})

export const resetForm = () => ({
    type: RESET_FORM
})