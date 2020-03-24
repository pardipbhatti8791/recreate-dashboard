import { createReducer } from '../../utils/reducerUtil';
import { SCHEDULE } from './constant';
import { slotDays } from '../../utils/commonData';
import moment from 'moment-timezone';

const initState = {
  spinner: true,
  schedules: null,
  allOff: null,
  scheduled_draft_posts: {
    draft: [],
    scheduled: [],
    queued: [],
    published: [],
    all_posts: []
  },
  new_post: {
    description: null,
    social_accounts: [],
    media: [],
    status: null,
    scheduled_at: null
  },
  result: {
    total: 5,
    updates: {}
  },
  calendar_data: [],
  post_description: ''
};

/**
 * @setSpinner
 * @param state
 * @param payload
 * @returns {{spinner: boolean}}
 */
export const setSpinner = (state, payload) => ({
  ...state,
  spinner: payload
});

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_schedules_data = (state, payload) => {
  var current_state;
  let state_key =
    Object.keys(payload.schedule).length > 0 &&
    Object.keys(payload.schedule).map(key => {
      if (payload.schedule[key].status === 'OFF') {
        current_state = payload.schedule[key].status;
      } else {
        current_state = payload.schedule[key].status;
      }
      return current_state;
    });
  return {
    ...state,
    schedules: payload,
    allOff: state_key.includes('ON') ? false : true
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_scheduled_drafts_posts = (state, payload) => {
  let draftPosts = [];
  let scheduledPosts = [];
  let queuedPosts = [];
  let publishedPosts = [];
  let allPosts = [];

  if (payload.length > 0) {
    allPosts.push(payload);
    payload.map(post => {
      if (post.status === 'draft') {
        draftPosts.push(post);
      }
      if (post.status === 'scheduled') {
        scheduledPosts.push(post);
      }
      if (post.status === 'queued') {
        queuedPosts.push(post);
      }
      if (post.publish_status === 'published') {
        publishedPosts.push(post);
      }

      return true;
    });
  }
  return {
    ...state,
    scheduled_draft_posts: {
      ...state.scheduled_draft_posts,
      draft: draftPosts,
      scheduled: scheduledPosts,
      queued: queuedPosts,
      published: publishedPosts,
      all_posts: allPosts
    }
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const scheduled_posts_data_manipulation = (state, payload) => {
  if (payload.length > 0) {
    let update = {};
    let now = moment();
    payload.forEach(post => {
      if (moment(post.scheduled_at).diff(now) > 0) {
        const dayDateTime = moment(post.scheduled_at).tz('GMT');

        if (!update.hasOwnProperty(slotDays[dayDateTime.format('e')])) {
          update[slotDays[dayDateTime.format('e')]] = {};
        }

        if (
          !update[slotDays[dayDateTime.format('e')]].hasOwnProperty(
            dayDateTime.format('YYYY-MM-DD')
          )
        ) {
          update[slotDays[dayDateTime.format('e')]][
            dayDateTime.format('YYYY-MM-DD')
          ] = {};
        }
        if (
          !update[slotDays[dayDateTime.format('e')]][
            dayDateTime.format('YYYY-MM-DD')
          ].hasOwnProperty(
            moment(post.scheduled_at)
              .tz('GMT')
              .format('HH:mm')
          )
        ) {
          update[slotDays[dayDateTime.format('e')]][
            dayDateTime.format('YYYY-MM-DD')
          ][
            moment(post.scheduled_at)
              .tz('GMT')
              .format('HH:mm')
          ] = {
            id: post.id,
            status: post.status,
            publish_status: post.publish_status,
            postDetails: {
              description: post.description
            },
            social_account_type: post.social_account_type,
            social_account_id: post.social_account_id,
            provider: post.provider,
            location: post.location,
            media: post.media,
            day: slotDays[dayDateTime.format('E')],
            due_at: dayDateTime.format(),
            dueTime: dayDateTime.format('HH:mm'),
            scheduled_at: post.scheduled_at,
            created_at: post.created_at
          };
        }
      }
    });
    return {
      ...state,
      result: { ...state.result, total: payload.length, updates: update }
    };
  }
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_new_post = (state, payload) => {
  return {
    ...state,
    new_post: payload
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const update_new_post_media = (state, payload) => {
  return {
    ...state,
    new_post: { ...state.new_post, media: [...state.new_post.media, payload] }
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_new_post_description = (state, payload) => {
  return {
    ...state,
    post_description: payload
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_calendar_data = (state, payload) => {
  let format = {
    Id: '',
    Subject: '',
    StartTime: '',
    EndTime: '',
    media: []
  };
  let data = [];

  if (payload.length > 0) {
    let now = moment();
    payload.map(post => {
      if (moment(post.scheduled_at).diff(now) > 0) {
        const sp = Object.create(format);
        sp.Id = post.id;
        sp.Subject = post.description;
        sp.StartTime = moment(post.scheduled_at)
          .tz('GMT')
          .format();
        sp.EndTime = moment(post.scheduled_at)
          .tz('GMT')
          .format();
        sp.media = post.media;
        data.push(sp);
      }
      return true;
    });
  } else {
    data.push(format);
  }

  return { ...state, calendar_data: data };
};

/**
 * * @creating reducer
 */
export default createReducer(initState, {
  [SCHEDULE.POST_SPINNER]: setSpinner,
  [SCHEDULE.SET_SCHEDULE]: set_schedules_data,
  [SCHEDULE.GET_SCHEDULED_DRAFT_POSTS]: set_scheduled_drafts_posts,
  [SCHEDULE.MANIPULATE_SCHEDULED_DATA]: scheduled_posts_data_manipulation,
  [SCHEDULE.SET_NEW_POST]: set_new_post,
  [SCHEDULE.UPDATE_NEW_POST_MEDIA]: update_new_post_media,
  [SCHEDULE.GET_CALENDAR_DATA]: set_calendar_data,
  [SCHEDULE.SET_NEW_POST_DESCRIPTION]: set_new_post_description
});
