import { createReducer } from '../../utils/reducerUtil';
import { TEMPLATES } from './constant';

const initState = {
  data: null,
  templatesSpinner: true
};


/**
 * @setTemplates
 * @param {*} state
 * @param {*} payload
 */
export const setTemplates = (state, payload) => {
  return {
    ...state,
    data: payload
  };
};


/**
 * @setTemplatesSpinner
 * @param {*} state
 * @param {*} payload
 */
export const setTemplatesSpinner = (state, payload) => ({
  ...state,
  templatesSpinner: payload
});

export default createReducer(initState, {
  [TEMPLATES.GET_TEMPLATES_SPINNER]: setTemplatesSpinner,
  [TEMPLATES.GET_TEMPLATES]: setTemplates,
});
