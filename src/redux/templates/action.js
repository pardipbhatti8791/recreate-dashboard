import { gpAxios } from '../../utils/gpAxios';
import { apiPaths } from '../../utils/apiPaths';
import { TEMPLATES } from './constant';
import { formatObjToURL } from '../../utils/common_functions'
/**
 *
 * @param data
 * @returns {{payload: *, type: string}}
 */
export const setTemplatesData = data => ({
  type: TEMPLATES.GET_TEMPLATES,
  payload: data
});

/**
 *
 * @param isSpin
 * @returns {{payload: *, type: string}}
 */
export const setTemplatesSpinner = isSpin => ({
  type: TEMPLATES.GET_TEMPLATES_SPINNER,
  payload: isSpin
});

/**
 *
 * @returns {function(...[*]=)}
 */
/**
 *Get Media
 * @param {*} data
 */
export const getTemplates = params => dispatch => {
  let url = apiPaths.templates.list_templates;
  if(params){
      url = `${url}?${formatObjToURL(params)}`;
  }
  gpAxios
    .get(url)
    .then(response => {
      if (response.data.code === 101) {
        return;
      }
      dispatch(setTemplatesSpinner(false));
      dispatch(setTemplatesData(response.data.data));
    })
    .catch(error => {
      dispatch(setTemplatesSpinner(false));
    });
};
