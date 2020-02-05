import { SET_LOADING, SEARCH_VISIBLE, SET_ANALYTICS } from "../actions/commonActions";

const commonReducer = (state = false, action) => {
    switch (action.type) {
        case SET_LOADING:
            return action.status;
        default:
            return state;
    }
}

export const searchReducer = (state = true, action) => {
    switch (action.type) {
        case SEARCH_VISIBLE:
            return action.status;
        default:
            return state;
    }
}

export const analyticsReducer = (state = false, action) => {
    switch (action.type) {
        case SET_ANALYTICS:
            return action.analytics;
        default:
            return state;
    }
}

export default commonReducer;