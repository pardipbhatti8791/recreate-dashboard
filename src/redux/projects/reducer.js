import { createReducer } from '../../utils/reducerUtil';
import { PROJECT } from './constant';

const initState = {
  projectData: null,
  projectSpinner: true,
  projectsError: null,
  projectLoadMoreSpinner: false,

  createProjectData: null,
  createProjectSpinner: false,
  creteProjectError: null
};

/**
 * @setSpinner
 * @param state
 * @param payload
 * @returns {{spinner: boolean}}
 */
export const setSpinner = (state, payload) => ({
  ...state,
  projectSpinner: payload
});

/**
 * @setSpinner
 * @param state
 * @param payload
 * @returns {{spinner: boolean}}
 */
export const setProjectLoadMoreSpinner = (state, payload) => ({
  ...state,
  projectLoadMoreSpinner: payload,
  projectSpinner: false
});

/**
 * @setTemplates
 * @param {*} state
 * @param {*} payload
 */
export const setProjects = (state, payload) => {
  if(payload.page){
    payload.data.results = [...payload.data.results, ...state.projectData.results];
  }
  return {
    ...state,
    projectData: payload.data
  };
};

/**
 * @setTemplates
 * @param {*} state
 * @param {*} payload
 */
export const setProjectsError = (state, payload) => {
  return {
    ...state,
    projectsError: payload
  };
};


/*************************************************************
 * Create Project
 * **************
 */

/**
 * @setSpinner
 * @param state
 * @param payload
 * @returns {{spinner: boolean}}
 */
export const setCreateProjectSpinner = (state, payload) => ({
  ...state,
  createProjectSpinner: payload
});

/**
 * @setTemplates
 * @param {*} state
 * @param {*} payload
 */
export const setCreateProject = (state, payload) => {
  return {
    ...state,
    createProjectData: payload
  };
};

/**
 * @setTemplates
 * @param {*} state
 * @param {*} payload
 */
export const setCreateProjectError = (state, payload) => {
  return {
    ...state,
    creteProjectError: payload
  };
};
export default createReducer(initState, {
  // list
  [PROJECT.GET_PROJECTS]: setProjects,
  [PROJECT.GET_PROJECTS_SPINNER]: setSpinner,
  [PROJECT.GET_PROJECTS_ERROR]: setProjectsError,
  [PROJECT.GET_PROJECTS_LOAD_MORE_SPINNER]: setProjectLoadMoreSpinner,
  // create
  [PROJECT.CREATE_PROJECT]: setCreateProject,
  [PROJECT.CREATE_PROJECT_SPINNER]: setCreateProjectSpinner,
  [PROJECT.CREATE_PROJECT_ERROR]: setProjectsError,
});
