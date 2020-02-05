import { combineReducers } from 'redux';
import cartReducer, { teaseReducer } from './cartReducer';
import userReducer from './userReducer';
import commonReducer, { searchReducer, analyticsReducer } from './commonReducer';
import locationReducer from './locationReducer';
import senderReducer from './senderReducer';
import bottomBarReducer from "./bottomBarReducer";

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    loading: commonReducer,
    location: locationReducer,
    sender: senderReducer,
    search: searchReducer,
    tease: teaseReducer,
    bottomBar: bottomBarReducer,
    analytics: analyticsReducer
});

export default rootReducer;
