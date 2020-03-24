import { gpAxios } from '../../utils/gpAxios';
import { apiPaths } from '../../utils/apiPaths';
import { PROJECT } from './constant';
import { formatObjToURL } from '../../utils/common_functions';
/**
 *
 * @param data
 * @returns {{payload: *, type: string}}
 */
export const setProjectData = (data, page=0) => ({
  type: PROJECT.GET_PROJECTS,
  payload: {data, page},
});

/**
 *
 * @param isSpin
 * @returns {{payload: *, type: string}}
 */
export const setProjectSpinner = isSpin => ({
  type: PROJECT.GET_PROJECTS_SPINNER,
  payload: isSpin
});

/**
 *
 * @param isSpin
 * @returns {{payload: *, type: string}}
 */
export const setProjectLoadMoreSpinner = isSpin => ({
  type: PROJECT.GET_PROJECTS_LOAD_MORE_SPINNER,
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
export const getProjects = (params) => dispatch => {
  let url = apiPaths.projects.list_projects;
  if(params.page){
      url = `${url}?${formatObjToURL(params)}`;
      dispatch(setProjectLoadMoreSpinner(true));
  }
  gpAxios
    .get(url)
    .then(response => {
      if (response.data.code === 101) {
        return;
      }
      dispatch(setProjectSpinner(false));
      dispatch(setProjectLoadMoreSpinner(false));
      dispatch(setProjectData(response.data.data, params.page));
    })
    .catch(error => {
      dispatch(setProjectLoadMoreSpinner(false));
      dispatch(setProjectSpinner(false));
    });
};


/**
 *
 * @param data
 * @returns {{payload: *, type: string}}
 */
export const setCreateProjectData = (payload) => ({
  type: PROJECT.CREATE_PROJECT,
  payload,
});

/**
 *
 * @param data
 * @returns {{payload: *, type: string}}
 */
export const setCreateProjectError = (payload) => ({
  type: PROJECT.CREATE_PROJECT_ERROR,
  payload
});

/**
 *
 * @param isSpin
 * @returns {{payload: *, type: string}}
 */
export const setCreateProjectSpinner = isSpin => ({
  type: PROJECT.CREATE_PROJECT_SPINNER,
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
export const createProject = (body) => dispatch => {
  dispatch(setCreateProjectSpinner(true));
  gpAxios
    .post(apiPaths.projects.create_projects, body)
    .then(response => {
      if (response.data.code === 101) {
        return;
      }
      if (response.data.error){
        return dispatch(setCreateProjectError(response.data.message));
      }
      dispatch(setCreateProjectSpinner(false));
      dispatch(setCreateProjectData(response.data.data));
    })
    .catch(error => {
      dispatch(setCreateProjectSpinner(false));
    });
};
