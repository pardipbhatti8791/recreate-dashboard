import { gpAxios } from '../../utils/gpAxios';
import { apiPaths } from '../../utils/apiPaths';
import { SOCIAL_ACCOUNTS } from './constant';

/**
 *
 * @param data
 * @returns {{payload: *, type: string}}
 */
export const setSocialAccountsData = data => ({
  type: SOCIAL_ACCOUNTS.GET_SOCIAL,
  payload: data
});

/**
 *
 * @param isSpin
 * @returns {{payload: *, type: string}}
 */
export const setSocialAccountsSpinner = isSpin => ({
  type: SOCIAL_ACCOUNTS.GET_SOCILAL_SPINNER,
  payload: isSpin
});

/**
 *
 * @returns {function(...[*]=)}
 */
export const getSocialsAccounts = () => dispatch => {
  gpAxios.defaults.headers.common.token = localStorage.getItem('id_token');
  gpAxios
    .get(apiPaths.get_social_accounts)
    .then(response => {
      dispatch(setSocialAccountsData(response.data.data.social_accounts));
      dispatch(setSocialAccountsSpinner(false));
    })
    .catch(e => {
      dispatch(setSocialAccountsSpinner(false));
    });
};

/**
 *
 * @param isSpin
 * @returns {{payload: *, type: string}}
 */
export const setConnectAccountSpinner = isSpin => ({
  type: SOCIAL_ACCOUNTS.CONNECT_ACCOUNT_SPINNER,
  payload: isSpin
});

/**
 *
 * @returns {function(...[*]=)}
 */
export const connectAccount = (uri, data, history = null) => dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  gpAxios
    .post(uri, data, config)
    .then(response => {
      dispatch(setConnectAccountSpinner(false));
      localStorage.removeItem('social_type');
      if (history !== null) {
        history.push('/dashboard/accounts/connect');
      }
    })
    .catch(e => {
      console.log(e.response);
      if (history !== null) {
        history.push('/dashboard/accounts/connect');
      }
      localStorage.removeItem('social_type');
      dispatch(setConnectAccountSpinner(false));
    });
};

/**
 *
 * @param {*} id
 */
export const setSelectedAccount = data => ({
  type: SOCIAL_ACCOUNTS.SET_SELECTED_ACCOUNT,
  payload: data
});
