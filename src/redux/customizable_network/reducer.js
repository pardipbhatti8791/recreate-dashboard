import { createReducer } from '../../utils/reducerUtil';
import { customized } from './constants';

/**
 * * @initialState
 */
const initialState = {
  isCustomized: false,
  customizedPost: []
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const setCustomizedPost = (state, payload) => {
  return {
    ...state,
    isCustomized: true,
    customizedPost: payload
  };
};

export default createReducer(initialState, {
  [customized.IS_CUSTOMIZED]: setCustomizedPost
});
