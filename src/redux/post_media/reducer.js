import { createReducer } from '../../utils/reducerUtil';
import { MEDIA } from './constant';

const initState = {
  spinner: true,
  media: null,
  uploaded_media: [],
  fileList: []
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_media_data = (state, payload) => {
  return {
    ...state,
    media: payload
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_uploaded_media = (state, payload) => {
  return {
    ...state,
    uploaded_media: payload
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_file_list_media = (state, payload) => {
  return {
    ...state,
    fileList: payload
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_multiple_file_list_media = (state, payload) => {
  return {
    ...state,
    fileList:
      Object.keys(payload).length > 0 ? [...state.fileList, payload] : []
  };
};

export default createReducer(initState, {
  [MEDIA.SET_MEDIA]: set_media_data,
  [MEDIA.SET_UPLOADED_MEDIA]: set_uploaded_media,
  [MEDIA.SET_FILE_LIST]: set_file_list_media,
  [MEDIA.SET_MULTIPLE_FILE_LIST]: set_multiple_file_list_media
});
