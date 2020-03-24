import { createReducer } from '../../utils/reducerUtil';
import { SOCIAL_ACCOUNTS } from './constant';

const initState = {
  socialAccounts: [],
  socialAccountSpinner: true,
  connectAccountSpin: true,
  selectedAccount: []
};

/**
 * @setSpinner
 * @param state
 * @param payload
 * @returns {{spinner: boolean}}
 */
export const setSpinner = (state, payload) => ({
  ...state,
  socialAccountSpinner: payload
});

/**
 * @setSocialAccounts
 * @param {*} state
 * @param {*} payload
 */
export const setSocialAccounts = (state, payload) => {
  let socialAccountsData = [];
  for (var key in payload) {
    if (payload[key].length > 0) {
      for (var g = 0; g <= payload[key].length; g++) {
        if (payload[key][g] !== undefined) {
          if (payload[key][g].pages.length > 0) {
            for (var p = 0; p <= payload[key][g].pages.length; p++) {
              if (payload[key][g].pages[p] !== undefined) {
                socialAccountsData.push({
                  id: payload[key][g].pages[p].page_id,
                  page_id: payload[key][g].pages[p].page_id,
                  social_account_id: payload[key][g].pages[p].page_id,
                  name: payload[key][g].pages[p].name,
                  picture_url: payload[key][g].pages[p].picture_url,
                  provider: payload[key][g].provider,
                  social_account_type:
                    payload[key][g].provider === 'facebook'
                      ? 'page'
                      : payload[key][g].provider
                });
              }
            }
          } else {
            if (payload[key][g].provider !== 'facebook') {
              const username =
                payload[key][g].first_name === ''
                  ? payload[key][g].screen_name
                  : payload[key][g].first_name;
              socialAccountsData.push({
                id: payload[key][g].social_account_id,
                page_id: payload[key][g].social_account_id,
                social_account_id: payload[key][g].social_account_id,
                name: username,
                picture_url: null,
                provider: payload[key][g].provider,
                social_account_type:
                  payload[key][g].provider === 'facebook'
                    ? 'page'
                    : payload[key][g].provider
              });
            }
          }
        }
      }
    }
  }

  return {
    ...state,
    socialAccounts: socialAccountsData
  };
};

/**
 * @setConnectAccount
 * @param {*} state
 * @param {*} paylaod
 */
export const setSelectedAccount = (state, paylaod) => ({
  ...state,
  selectedAccount: paylaod
});

/**
 * @setConnectAccountSpinner
 * @param {*} state
 * @param {*} payload
 */
export const setConnectAccountSpinner = (state, payload) => ({
  ...state,
  connectAccountSpin: payload
});

export default createReducer(initState, {
  [SOCIAL_ACCOUNTS.GET_SOCILAL_SPINNER]: setSpinner,
  [SOCIAL_ACCOUNTS.GET_SOCIAL]: setSocialAccounts,
  [SOCIAL_ACCOUNTS.CONNECT_ACCOUNT_SPINNER]: setConnectAccountSpinner,
  [SOCIAL_ACCOUNTS.SET_SELECTED_ACCOUNT]: setSelectedAccount
});
