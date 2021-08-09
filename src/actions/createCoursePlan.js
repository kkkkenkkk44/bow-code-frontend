export const CHANGE_NAME = 'CHANGE_NAME'
export const CHANGE_VISIBILITY = 'CHANGE_VISIBILITY'

export const changeName = (name) => ({
    type: CHANGE_NAME,
    payload: {
        name: name
    }
})

export const changeVisibility = (visibility) => ({
    type: CHANGE_VISIBILITY,
    payload: {
        visibility: visibility
    }
})