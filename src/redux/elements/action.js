import { gpAxios } from '../../utils/gpAxios';
import { apiPaths } from '../../utils/apiPaths';
import { CATEGORY } from './constant';

/**
 *
 * @param data
 * @returns {{payload: *, type: string}}
 */
export const setCategoryData = data => ({
  type: CATEGORY.GET_CATEGORIES,
  payload: data
});

/**
 *
 * @param isSpin
 * @returns {{payload: *, type: string}}
 */
export const setCategorySpinner = isSpin => ({
  type: CATEGORY.GET_CATEGORIES_SPINNER,
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
export const getCategories = params => dispatch => {
  gpAxios
    .get(`${apiPaths.elements.list_categories}`)
    .then(response => {
      if (response.data.code === 101) {
        return;
      }
      dispatch(setCategorySpinner(false));
      dispatch(setCategoryData(response.data.data));
    })
    .catch(error => {
      dispatch(setCategorySpinner(false));
    });
};
