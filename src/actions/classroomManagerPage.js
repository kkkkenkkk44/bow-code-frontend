export const CLASSROOM_SWITCH_TO = 'CLASSROOM_SWITCH_TO';

export const switchTo = (tab) => ({
    type: CLASSROOM_SWITCH_TO,
    payload: {
        tab: tab
    }
})