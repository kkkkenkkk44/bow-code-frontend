export const CHANGE_NAME = 'CHANGE_NAME'
export const CHANGE_REVIEW = 'CHANGE_REVIEW'
export const CHANGE_APPLY = 'CHANGE_APPLY'
export const CHANGE_VISIBILITY = 'CHANGE_VISIBILITY'

export const changeName = (name) => ({
    type: CHANGE_NAME,
    payload: {
        name: name
    }
})

export const changeReview = (review) => ({
    type: CHANGE_REVIEW,
    payload: {
        review: review
    }
})

export const changeApply = (apply) => ({
    type: CHANGE_APPLY,
    payload: {
        apply: apply
    }
})

export const changeVisibility = (visibility) => ({
    type: CHANGE_VISIBILITY,
    payload: {
        visibility: visibility
    }
})