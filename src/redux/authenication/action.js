import { gpAxios } from '../../utils/gpAxios';
import { apiPaths } from '../../utils/apiPaths';
import { AUTHENTICATION } from './constant';

/**
 *
 * @param {*} isSpin
 */
export const authSpinner = isSpin => {
  return {
    type: AUTHENTICATION.SPINNER,
    payload: isSpin
  };
};

/**
 *
 * @param {*} isAuth
 */
export const setAuthentication = isAuth => {
  return {
    type: AUTHENTICATION.SIGN_IN_REQUEST,
    payload: isAuth
  };
};

/**
 *
 * @param {*} key
 */
export const setIdToken = key => {
  return {
    type: AUTHENTICATION.SET_ID_TOKEN,
    payload: key
  };
};

/**
 *
 * @param {*} data
 */
export const signInRequest = (data, history, email) => dispatch => {
  dispatch(authSpinner(true));
  gpAxios
    .post(apiPaths.user_management.login, data)
    .then(response => {
      localStorage.setItem('id_token', response.data.data.key);
      localStorage.setItem('email', email);
      dispatch(setAuthentication(true));
      dispatch(setIdToken(response.data.data.key));
      dispatch(authSpinner(false));
    })
    .catch(e => {
      console.log(e.response);
      dispatch(authSpinner(false));
    });
};
