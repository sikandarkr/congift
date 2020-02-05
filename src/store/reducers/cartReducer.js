import { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_QTY, LOAD_CART, CLEAR_CART, TEASE_GIFT } from "../actions/cartActions";
import * as _ from 'lodash';

const cartReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return reMapOrder(orderItems([...state, { ...action.product }]));
        case REMOVE_FROM_CART:
            return reMapOrder(filterById(action.pid, state));
        case CHANGE_QTY:
            const items = state;
            const item = _.find(items, (p) => p.pid === action.product.pid);
            if (item) { item.qty = action.product.qty }
            const newItems = filterById(item.pid, state);
            return orderItems([...newItems, item]);
        case LOAD_CART:
            return reMapOrder(orderItems(action.cart));
        case CLEAR_CART:
            return [];
        default:
            return reMapOrder(orderItems(state));
    };
}
export const teaseReducer = (state = {}, action) => {
    switch (action.type) {
        case TEASE_GIFT:
            return action.gift;
        default:
            return state;
    }
}
const filterById = (pid, state) => {
    const filtered = _.filter(state, (p) => p.pid !== pid);
    return filtered;
}
const orderItems = (state) => {
    return _.sortBy(state, ['order']);
}
const reMapOrder = (state) => {
    const reordered = _.map(state, (item, index) => {
        return {
            ...item,
            order: index
        }
    }
    );
    return reordered;
}
export default cartReducer;