import { createReducer } from '../../utils/reducerUtil';
import { POST } from './constant';

const initState = {
  spinner: false,
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

export default createReducer(initState, {
  [POST.SPINNER]: setSpinner
});
