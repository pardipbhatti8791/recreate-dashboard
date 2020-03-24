import { createReducer } from '../../utils/reducerUtil';
import { FILES } from './constant';

const initState = {
  filesData: null,
  filesSpinner: true,
  filesError: null,
  fileLoadMoreSpinner: false
};

/**
 * @setSpinner
 * @param state
 * @param payload
 * @returns {{spinner: boolean}}
 */
export const setSpinner = (state, payload) => ({
  ...state,
  filesSpinner: payload
});

/**
 * @setSpinner
 * @param state
 * @param payload
 * @returns {{spinner: boolean}}
 */
export const setLoadMoreSpinner = (state, payload) => ({
  ...state,
  fileLoadMoreSpinner: payload
});

/**
 * @setTemplates
 * @param {*} state
 * @param {*} payload
 */
export const setFiles = (state, payload) => {
  if(payload.page){
    payload.data.results = [...payload.data.results, ...state.filesData.results];
  }
  return {
    ...state,
    filesData: payload.data
  };
};

/**
 * @setTemplates
 * @param {*} state
 * @param {*} payload
 */
export const setFilesError = (state, payload) => {
  return {
    ...state,
    filesError: payload
  };
};

export default createReducer(initState, {
  [FILES.GET_FILES]: setFiles,
  [FILES.GET_FILES_SPINNER]: setSpinner,
  [FILES.GET_FILES_ERROR]: setFilesError,
  [FILES.GET_FILES_LOAD_MORE_SPINNER]: setLoadMoreSpinner,
});
