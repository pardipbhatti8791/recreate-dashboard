import { createReducer } from '../../utils/reducerUtil';
import { AUTHENTICATION } from './constant';

const initState = {
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  spinner: false,
  id_token: localStorage.getItem('id_token')
    ? localStorage.getItem('id_token')
    : null
};

/**
 * @setSpinner
 * @param state
 * @param payload
 * @returns {{spinner: boolean}}
 */
export const setSpinner = (state, payload) => ({
  ...state,
  spinner: payload
});

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const setAuth = (state, payload) => {
  return {
    ...state,
    isAuthenticated: payload
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_token_id = (state, payload) => {
  return {
    ...state,
    id_token: payload
  };
};

export default createReducer(initState, {
  [AUTHENTICATION.SPINNER]: setSpinner,
  [AUTHENTICATION.SIGN_IN_REQUEST]: setAuth,
  [AUTHENTICATION.SET_ID_TOKEN]: set_token_id
});
