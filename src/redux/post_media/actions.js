import { MEDIA } from './constant';
import { SCHEDULE } from '../schedule_posts/constant';
import { gpAxios } from '../../utils/gpAxios';
import { apiPaths } from '../../utils/apiPaths';

/**
 *
 * @param {*} data
 */
export const setMedia = data => {
  return {
    type: MEDIA.SET_MEDIA,
    payload: data
  };
};

/**
 *
 * @param {*} data
 */
export const setUploadMedia = data => {
  return {
    type: MEDIA.SET_UPLOADED_MEDIA,
    payload: data
  };
};

/**
 *
 * @param {*} data
 */
export const setFileList = data => {
  return {
    type: MEDIA.SET_FILE_LIST,
    payload: data
  };
};

/**
 *
 * @param {*} data
 */
export const setMultipleFileList = data => {
  return {
    type: MEDIA.SET_MULTIPLE_FILE_LIST,
    payload: data
  };
};

/**
 *Get Media
 * @param {*} data
 */
export const getMedia = data => dispatch => {
  gpAxios
    .get(`${apiPaths.media.get_media}`)
    .then(response => {
      if (response.data.code === 101) {
        return;
      }
      dispatch(setMedia(response.data.data));
    })
    .catch(error => {
      console.log(error.response);
    });
};

/**
 *
 * @param {*} data
 */
export const updateNewPostMedia = data => {
  return {
    type: SCHEDULE.UPDATE_NEW_POST_MEDIA,
    payload: data
  };
};

/**
 * Upload Media
 * @param {*} data
 */
export const uploadMedia = (data, fileList) => dispatch => {
  gpAxios
    .post(apiPaths.media.upload_media, data)
    .then(response => {
      const resp = response.data.data[0];
      dispatch(updateNewPostMedia(resp.media));
      let newMedia = {
        uid: resp.id,
        url: resp.media,
        name: resp.name,
        local: true
      };
      dispatch(setMultipleFileList(newMedia));
    })
    .catch(error => {
      console.log(error);
    });
};
