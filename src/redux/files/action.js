import { gpAxios } from '../../utils/gpAxios';
import { apiPaths } from '../../utils/apiPaths';
import { FILES } from './constant';
import { formatObjToURL } from '../../utils/common_functions';

/**
 *
 * @param data
 * @returns {{payload: *, type: string}}
 */
export const setFilesData = (data, page = 0) => ({
  type: FILES.GET_FILES,
  payload: {data, page}
});

/**
 *
 * @param isSpin
 * @returns {{payload: *, type: string}}
 */
export const setFilesSpinner = isSpin => ({
  type: FILES.GET_FILES_SPINNER,
  payload: isSpin
});

/**
 *
 * @param isSpin
 * @returns {{payload: *, type: string}}
 */
export const setFileLoadMoreSpinner = isSpin => ({
  type: FILES.GET_FILES_LOAD_MORE_SPINNER,
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
export const getFiles = params => dispatch => {
  let url = apiPaths.files.list_files;
  if(params.page){
      url = `${url}?${formatObjToURL(params)}`;
      dispatch(setFileLoadMoreSpinner(true));
  }
  gpAxios
    .get(url)
    .then(response => {
      if (response.data.code === 101) {
        return;
      }
      dispatch(setFilesSpinner(false));
      dispatch(setFileLoadMoreSpinner(false));
      dispatch(setFilesData(response.data.data, params.page));
    })
    .catch(error => {
      dispatch(setFilesSpinner(false));
      dispatch(setFileLoadMoreSpinner(false));
    });
};
