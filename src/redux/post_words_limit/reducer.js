import { createReducer } from '../../utils/reducerUtil';
import { word } from './constants';

/**
 * * @initialState
 */
const initialState = {
  set_accounts: [],
  facebook: 2000,
  twitter: 280,
  linkedin: 1300,
  instagram: 1000
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_selected_accounts_type = (state, payload) => {
  return {
    ...state,
    set_accounts: payload
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_facebook_limit = (state, payload) => {
  return {
    ...state,
    facebook: payload
  };
};
/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_linkedin_limit = (state, payload) => {
  return {
    ...state,
    linkedin: payload
  };
};
/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_twitter_limit = (state, payload) => {
  return {
    ...state,
    twitter: payload
  };
};
/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_instagram_limit = (state, payload) => {
  return {
    ...state,
    instagram: payload
  };
};

/**
 * * @exporting reducer
 */
export default createReducer(initialState, {
  [word.SET_ACCOUNTS]: set_selected_accounts_type,
  [word.SET_FACEBOOK_WORDS]: set_facebook_limit,
  [word.SET_LINKEDIN_WORDS]: set_linkedin_limit,
  [word.SET_TWITTER_WORDS]: set_twitter_limit,
  [word.SET_INSTAGRAM_WORDS]: set_instagram_limit
});
