import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];
const appStore = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(...middleware)
)
);

export default appStore;