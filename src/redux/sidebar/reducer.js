import { createReducer } from '../../utils/reducerUtil';
import { sidebar } from './constants';

/**
 * * @initialState
 */
const initialState = {
  current_active: 0,
  social_account_type: 'facebook'
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_active_node = (state, payload) => {
  return {
    ...state,
    current_active: payload
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_account_type = (state, payload) => {
  return {
    ...state,
    social_account_type: payload
  };
};

export default createReducer(initialState, {
  [sidebar.SET_ACTIVE]: set_active_node,
  [sidebar.S_ACCOUNT_TYPE]: set_account_type
});
