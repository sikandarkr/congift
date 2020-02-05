import * as _ from 'lodash';
import { findById } from '../../utils/cart.util';

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CHANGE_QTY = 'CHANGE_QTY';
const LOAD_CART = 'LOAD_CART';
const CLEAR_CART = 'CLEAR_CART';

const addToCart = (pid, product) => ({
    type: ADD_TO_CART,
    product: { pid, prod: { ...product }, qty: 1 }
});

const checkNAdd = (pid, product, state) => {
    return dispatch => {
        const item = findById(state, pid);
        if (!item) {
            dispatch(addToCart(pid, product));
        } else {
            dispatch(changeQty(pid, item.qty + 1));
        }
    }
}
const changeQty = (pid, qty) => ({
    type: CHANGE_QTY,
    product: { pid, qty }
})

const removeFromCart = (pid) => ({
    type: REMOVE_FROM_CART,
    pid
})

const loadCart = (cart) => ({
    type: LOAD_CART,
    cart
});

const clearCart = () => ({
    type: CLEAR_CART
});

const TEASE_GIFT = 'TEASE_GIFT';
const teaseGift = (gift) => ({
    type: TEASE_GIFT,
    gift
})


export {
    addToCart, ADD_TO_CART,
    removeFromCart, REMOVE_FROM_CART,
    changeQty, CHANGE_QTY,
    loadCart, LOAD_CART,
    clearCart, CLEAR_CART, checkNAdd, TEASE_GIFT, teaseGift
};