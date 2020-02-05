import { SET_LOCATION, CLEAR_LOCATION } from "../actions/locationAction";

const locationReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_LOCATION:
            return action.location;
        case CLEAR_LOCATION:
            return {};
        default:
            return state;
    }
}

export default locationReducer;