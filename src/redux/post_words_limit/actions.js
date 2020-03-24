import { word } from './constants';

/**
 *
 * @param {*} isTrue
 */
export const setAccountsLimits = data => {
  return {
    type: word.SET_ACCOUNTS,
    payload: data
  };
};

/**
 *
 * @param {*} data
 */
export const setFacebookLimit = data => {
  return {
    type: word.SET_FACEBOOK_WORDS,
    payload: data
  };
};
/**
 *
 * @param {*} data
 */
export const setLinkedinLimit = data => {
  return {
    type: word.SET_LINKEDIN_WORDS,
    payload: data
  };
};
/**
 *
 * @param {*} data
 */
export const setTwitterLimit = data => {
  return {
    type: word.SET_TWITTER_WORDS,
    payload: data
  };
};
/**
 *
 * @param {*} data
 */
export const setInstagramLimit = data => {
  return {
    type: word.SET_INSTAGRAM_WORDS,
    payload: data
  };
};
