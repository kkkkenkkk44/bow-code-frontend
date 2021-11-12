export const SHOW_COURSE_CONTENT = 'SHOW_COURSE_CONTENT'

export const showCourseIndex = (index) => ({
    type: SHOW_COURSE_CONTENT,
    payload: {
        index: index
    }
})
