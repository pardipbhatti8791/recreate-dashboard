import { createReducer } from '../../utils/reducerUtil';
import { CATEGORY } from './constant';

const initState = {
  categories: null,
  categoriesSpinner: true,
  categoriesError: null
};

/**
 * @setSpinner
 * @param state
 * @param payload
 * @returns {{spinner: boolean}}
 */
export const setSpinner = (state, payload) => ({
  ...state,
  categoriesSpinner: payload
});

/**
 * @setTemplates
 * @param {*} state
 * @param {*} payload
 */
export const setCategories = (state, payload) => {
  return {
    ...state,
    categories: payload.categories
  };
};

/**
 * @setTemplates
 * @param {*} state
 * @param {*} payload
 */
export const setCategoriesError = (state, payload) => {
  return {
    ...state,
    data: payload
  };
};

export default createReducer(initState, {
  [CATEGORY.GET_CATEGORIES]: setCategories,
  [CATEGORY.GET_CATEGORIES_SPINNER]: setSpinner,
  [CATEGORY.GET_CATEGORIES_ERROR]: setCategoriesError
});
