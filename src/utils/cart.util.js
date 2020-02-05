import { MAX_QTY, MAX_BRANDS_PER_CART, MAX_ITEMS_PER_BRAND } from "../constants/common";
import * as _ from 'lodash';

const findById = (state, pid) => _.find(state, (p) => p.pid === pid);

const uniqueBrands = (state) => _.map(_.uniqBy(state, 'prod.brand'), (p) => p.prod.brand);

const cartSubTotal = (cart) => _.sumBy(cart, function (c) { return c.prod.sp * c.qty; });

const cartSavings = (cart) => Math.abs(_.sumBy(cart, function (c) { return c.prod.mrp * c.qty; }) - _.sumBy(cart, function (c) { return c.prod.sp * c.qty; }));

const giftSubTotal = (cart) => _.sumBy(cart, function (c) { return c.ln_sp * c.ln_qty; });

const giftSavings = (cart) => Math.abs(_.sumBy(cart, function (c) { return c.ln_mrp * c.ln_qty; }) - _.sumBy(cart, function (c) { return c.ln_sp * c.ln_qty; }));

const itemsByBrand = (cart, brand) => _.filter(cart, (p) => p.prod.brand.toLowerCase() === brand.toLowerCase());

// util function to limit qty per item in cart
const checkQty = (cart, item, index) => {
    const p = findById(cart, item.products[index].pid);
    if (!p) { return true; }
    else if (p && p.qty < MAX_QTY) { return true; }
    return false;
}
// util function to check brands existence & its limit to add into the cart
const checkBrand = (cart, brand) => {
    const uniq = uniqueBrands(cart);
    if (cart.length <= 0) { return true; }
    else if (uniq.includes(brand) && itemsByBrand(cart, brand).length < MAX_ITEMS_PER_BRAND) { return true; }
    else if (!uniq.includes(brand) && uniq.length < MAX_BRANDS_PER_CART) { return true; }
    return false;
}

export { findById, checkBrand, checkQty, cartSubTotal, itemsByBrand, giftSubTotal, cartSavings, giftSavings };