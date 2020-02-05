import { UPDATE_CURRENT_TAB } from "../actions/bottomBarActions";

const initialState = {
  tabName: 'Gift'
};

/**
 * A reducer is just a JavaScript function.
 * Reducers produce the state of the application.
 *
 * @param state
 * @param action  Action is sending the signal to the store to change the state. 'Dispatching an action' is the process
 * of sending out a signal.
 *
 * @returns {{tabName: string}}
 */
const bottomBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_TAB:
      state = {
        tabName: action.tabName
      };

      return state;

    default:
      return state;
  }
};

export default bottomBarReducer;
