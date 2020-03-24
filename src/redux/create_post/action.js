import { POST } from './constant';
import { apiPaths } from '../../utils/apiPaths';
import { gpAxios } from '../../utils/gpAxios';
import { message } from 'antd';

import { messages } from '../../utils/messages';
import { getScheduledPosts, setNewPost } from '../schedule_posts/actions';
import { openDatePicker } from '../date_time_picker/actions';
import {
  closeModal,
  actionModalQueuedScheduled,
  actionModalEditScheduledPost
} from '../modal/actions';

/**
 *
 * @param {*} isSpin
 */
export const postSpinner = isSpin => {
  return {
    type: POST.SPINNER,
    payload: isSpin
  };
};

/**
 *
 * @param {*} data
 * @param {*} start_date
 * @param {*} end_date
 */
export const createPostRequest = (data, start_date, end_date) => dispatch => {
  dispatch(postSpinner(true));

  gpAxios
    .post(apiPaths.create_post.create_post, data)
    .then(response => {
      dispatch(postSpinner(false));
      if (response.data.code === '101') {
        error();
        return;
      }
      success(data.status);
      dispatch(
        getScheduledPosts(
          `start_date=${start_date}&end_date=${end_date}&social_account=${response.data.data.post[0].social_account_id}`
        )
      );

      dispatch(emptyNewPost(data));
      dispatch(openDatePicker(false));
      dispatch(closeModal(false));
      dispatch(actionModalQueuedScheduled(false));
      dispatch(actionModalEditScheduledPost(false));
    })
    .catch(e => {
      dispatch(emptyNewPost(data));
      console.log('error', e);
      error();
      dispatch(postSpinner(false));
    });
};

/**
 *
 * @param {*} data
 * @param {*} start_date
 * @param {*} end_date
 */
export const updatePostRequest = (data, start_date, end_date) => dispatch => {
  dispatch(postSpinner(true));
  gpAxios
    .post(`${apiPaths.create_post.update_post}/${data.post_id}`, data)
    .then(response => {
      dispatch(postSpinner(false));
      if (response.data.code === '101') {
        error();
        return;
      }

      console.log(data);
      if (data.hasOwnProperty('social_account_id')) {
        dispatch(
          getScheduledPosts(
            `start_date=${start_date}&end_date=${end_date}&social_account=${data.social_account_id}`
          )
        );
      }

      dispatch(emptyNewPost(data));
      dispatch(openDatePicker(false));
      dispatch(closeModal(false));
      dispatch(actionModalQueuedScheduled(false));
      dispatch(actionModalEditScheduledPost(false));
      success(data.status);
    })
    .catch(e => {
      dispatch(emptyNewPost(data));
      console.log('error', e);
      error();
      dispatch(postSpinner(false));
    });
};

/**
 *
 * @param {*} data
 * @param {*} id
 * @param {*} social_account_id
 * @param {*} start_date
 * @param {*} end_date
 */
export const triggerShareNow = (
  data,
  id,
  social_account_id,
  start_date,
  end_date
) => dispatch => {
  dispatch(postSpinner(true));
  gpAxios
    .post(`${apiPaths.create_post.update_post}/${id}`, data)
    .then(response => {
      dispatch(postSpinner(false));
      if (response.data.code === '101') {
        error();
        return;
      }
      dispatch(
        getScheduledPosts(
          `start_date=${start_date}&end_date=${end_date}&social_account=${social_account_id}`
        )
      );
    })
    .catch(e => {
      error();
      dispatch(postSpinner(false));
    });
};

/**
 *
 * @param {*} id
 * @param {*} social_account_id
 * @param {*} start_date
 * @param {*} end_date
 */
export const deletePost = (
  id,
  social_account_id,
  start_date,
  end_date
) => dispatch => {
  dispatch(postSpinner(true));
  gpAxios
    .delete(`${apiPaths.create_post.update_post}/${id}`)
    .then(response => {
      dispatch(postSpinner(false));
      if (response.data.code === '101') {
        error();
        return;
      }
      dispatch(
        getScheduledPosts(
          `start_date=${start_date}&end_date=${end_date}&social_account=${social_account_id}`
        )
      );
    })
    .catch(e => {
      error();
      dispatch(postSpinner(false));
    });
};

/**
 *
 * @param {*} swap_data
 * @param {*} social_account_id
 * @param {*} start_date
 * @param {*} end_date
 */
export const swapPost = (
  swap_data,
  social_account_id,
  start_date,
  end_date
) => dispatch => {
  dispatch(postSpinner(true));
  gpAxios
    .post(`${apiPaths.create_post.swap_post}`, swap_data)
    .then(response => {
      dispatch(postSpinner(false));
      if (response.data.code === '101') {
        error();
        return;
      }
      dispatch(
        getScheduledPosts(
          `start_date=${start_date}&end_date=${end_date}&social_account=${social_account_id}`
        )
      );
    })
    .catch(e => {
      error();
      dispatch(postSpinner(false));
    });
};

const emptyNewPost = data => dispatch => {
  const emptyData = { ...data };
  emptyData.description = '';
  emptyData.social_accounts = [];
  emptyData.media = [];
  emptyData.status = null;
  emptyData.scheduled_at = null;

  dispatch(setNewPost(emptyData));
};

/**
 * Display Success
 * @param {*} type
 */
const success = type => {
  message.success(messages[type]);
};

/**
 * Display Error
 * @param {*} type
 */
const error = () => {
  message.error('Error Occured Try Again Later !');
};
