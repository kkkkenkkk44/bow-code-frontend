import { CLASSROOM_SWITCH_TO, FETCH_BULLETIN, FETCH_BULLETIN_START, REACT_TO_BULLETIN, REACT_TO_REPLY } from '../actions/classroomManagerPage'

const initialState = {
    currentTab: "overview",
    bulletins: [],
    fetchingBulletin: false
}

const classroomManagerPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLASSROOM_SWITCH_TO:
            return {
                ...state,
                currentTab: action.payload.tab
            }
        case FETCH_BULLETIN_START: {
            return {
                ...state,
                fetchingBulletin: true
            }
        }
        case FETCH_BULLETIN:
            return {
                ...state,
                bulletins: action.payload.bulletinList,
                fetchingBulletin: false
            }
        case REACT_TO_BULLETIN:
            return {
                ...state,
                bulletins: state.bulletins.map(bulletin=>{
                    if (bulletin.id != action.payload.bulletinId) {
                        return bulletin
                    } else {
                        var reactions = bulletin.reactions
                        var idx = reactions.indexOf(action.payload.userId)
                        if (idx >= 0) {
                            reactions.splice(idx, 1)
                        } else {
                            reactions.push(action.payload.userId)
                        }
                        bulletin.reactions = reactions
                        return bulletin
                    }
                })
            }
        case REACT_TO_REPLY:
            return {
                ...state,
                bulletins: state.bulletins.map(bulletin => {
                    if (bulletin.id != action.payload.bulletinId) {
                        return bulletin
                    } else {
                        var reactions = bulletin.replies[action.payload.replyId].reactions
                        var idx = reactions.indexOf(action.payload.userId)
                        if (idx >= 0) {
                            reactions.splice(idx, 1)
                        } else {
                            reactions.push(action.payload.userId)
                        }
                        bulletin.replies[action.payload.replyId].reactions = reactions
                        return bulletin
                    }
                })
            }
        default:
            return state;
    }
}

export default classroomManagerPageReducer