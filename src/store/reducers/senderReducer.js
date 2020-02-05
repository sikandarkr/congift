import { ADD_SENDER, CLEAR_SENDER } from "../actions/senderActions";

const senderReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_SENDER:
            return action.sender;
        case CLEAR_SENDER:
            return {};
        default:
            return state;
    }
}
export default senderReducer;