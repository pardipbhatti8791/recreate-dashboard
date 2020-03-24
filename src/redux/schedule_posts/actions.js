import { SCHEDULE } from './constant';
import { gpAxios } from '../../utils/gpAxios';
import { apiPaths } from '../../utils/apiPaths';
import { setMultipleFileList } from '../post_media/actions';

/**
 *
 * @param {*} data
 */
export const setSchedules = data => {
  return {
    type: SCHEDULE.SET_SCHEDULE,
    payload: data
  };
};

/**
 *
 * @param {*} data
 */
export const setNewPostDescription = data => {
  return {
    type: SCHEDULE.SET_NEW_POST_DESCRIPTION,
    payload: data
  };
};

/**
 *
 * @param {*} isSpin
 */
export const setSettingPostSpinner = isSpin => {
  return {
    type: SCHEDULE.POST_SPINNER,
    payload: isSpin
  };
};

/**
 *
 * @param {*} data
 */
export const getPostSchedules = (data, social_account_id) => dispatch => {
  dispatch(setSettingPostSpinner(true));
  gpAxios
    .get(`${apiPaths.schedule_post.get_post_time}${data}`)
    .then(response => {
      dispatch(setSettingPostSpinner(false));
      if (response.data.code === '101') {
        return;
      }
      dispatch(setSchedules(response.data.data));
      dispatch(
        getScheduledPosts(
          `start_date=2020-03-16&end_date=2020-04-15&social_account=${social_account_id}`
        )
      );
    })
    .catch(error => {
      console.log(error.response);
      dispatch(setSettingPostSpinner(false));
    });
};

/**
 *
 * @param {*} data
 */
export const setScheduledPosts = data => {
  return {
    type: SCHEDULE.GET_SCHEDULED_DRAFT_POSTS,
    payload: data
  };
};

/**
 *
 * @param {*} data
 */
export const setCalendarData = data => {
  return {
    type: SCHEDULE.GET_CALENDAR_DATA,
    payload: data
  };
};

/**
 *
 * @param {*} data
 */
export const setScheduledPostsForManipulation = data => {
  return {
    type: SCHEDULE.MANIPULATE_SCHEDULED_DATA,
    payload: data
  };
};

/**
 *
 * @param {*} data
 */
export const getScheduledPosts = data => dispatch => {
  dispatch(setSettingPostSpinner(true));
  gpAxios
    .get(`${apiPaths.schedule_post.get_scheduled_posts}${data}`)
    .then(response => {
      dispatch(setSettingPostSpinner(false));
      dispatch(setScheduledPosts(response.data.data.posts));
      dispatch(setScheduledPostsForManipulation(response.data.data.posts));
      dispatch(setCalendarData(response.data.data.posts));
      dispatch(setMultipleFileList({}));
    })
    .catch(error => {
      console.log(error.response);
      dispatch(setSettingPostSpinner(false));
    });
};

/**
 *
 * @param {*} data
 */
export const updatePostTimezone = (
  data,
  social_account_id,
  type
) => dispatch => {
  dispatch(setSettingPostSpinner(true));

  gpAxios
    .post(`${apiPaths.schedule_post.update_schedule_timezone}`, data)
    .then(response => {
      dispatch(setSettingPostSpinner(false));
      dispatch(
        getPostSchedules(
          `social_account_id=${social_account_id}&social_account_type=${type}`
        )
      );
    })
    .catch(error => {
      console.log(error.response);
      dispatch(setSettingPostSpinner(false));
    });
};

/**
 *
 * @param {*} data
 */
export const updatePostTime = data => dispatch => {
  dispatch(setSettingPostSpinner(true));

  gpAxios
    .post(`${apiPaths.schedule_post.update_post_time}`, data)
    .then(response => {
      dispatch(setSettingPostSpinner(false));

      dispatch(setSchedules(response.data.data));
    })
    .catch(error => {
      console.log(error.response);
      dispatch(setSettingPostSpinner(false));
    });
};

/**
 *
 * @param {*} data
 */
export const setNewPost = data => {
  return {
    type: SCHEDULE.SET_NEW_POST,
    payload: data
  };
};
