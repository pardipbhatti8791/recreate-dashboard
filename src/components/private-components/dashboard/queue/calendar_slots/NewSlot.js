import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment-timezone';
import { Skeleton } from 'antd';

import {
  slotDays,
  months,
  slotDaysWeek
} from '../../../../../utils/commonData';

import { CARD } from '../../../../../utils/ItemTypes';

import {
  openModal,
  actionModalQueuedScheduled,
  actionModalEditScheduledPost
} from '../../../../../redux/modal/actions';
import {
  setNewPost,
  setNewPostDescription
} from '../../../../../redux/schedule_posts/actions';
import {
  triggerShareNow,
  deletePost,
  updatePostRequest
} from '../../../../../redux/create_post/action';

import DragSlot from './DragSlot';
import DropTargetCard from './DropTargets';
import {
  setMultipleFileList,
  getMedia
} from '../../../../../redux/post_media/actions';

export default function NewSlots() {
  /**
   * * Redux hooks { useSelector, useDispatch }
   */
  const schedule_data = useSelector(state => state.schedule_posts.schedules);
  const spinner = useSelector(state => state.schedule_posts.spinner);
  const defaultTimezone = useSelector(state => state.schedule_posts.schedules);
  const manipulatedData = useSelector(state => state.schedule_posts.result);
  const new_post = useSelector(state => state.schedule_posts.new_post);
  const allOff = useSelector(state => state.schedule_posts.allOff);
  const social_account_type = useSelector(
    state => state.sidebar.social_account_type
  );
  const selected_account = useSelector(
    state => state.social_accounts.selectedAccount
  );
  const dispatch = useDispatch();

  /**
   * * Configuring slots
   */
  const monthDaysSlots = () => {
    var i_date = moment()
      .tz(defaultTimezone !== null ? defaultTimezone.timezone : 'GMT')
      .format();
    let t_Date = moment()
      .tz(defaultTimezone !== null ? defaultTimezone.timezone : 'GMT')
      .add(30, 'days')
      .format();
    let slotsTree = {};

    if (schedule_data !== null) {
      /**
       * * loop for calendar days
       */
      let week_keys = {};

      let tArray = moment()
        .tz(defaultTimezone ? defaultTimezone.timezone : 'Asia/Kolkata')
        .format('HH:mm');
      var a = moment(tArray.split(':'), 'HH:mm');

      Object.keys(schedule_data.schedule).forEach(day_key => {
        schedule_data.schedule[day_key].timing.forEach(tKey => {
          if (!week_keys.hasOwnProperty(day_key)) {
            week_keys[day_key] = {};
          }
          if (!week_keys[day_key].hasOwnProperty(tKey)) {
            if (moment(tKey.split(':'), 'HH:mm').diff(a, 'hours') > 0) {
            } else {
              week_keys[day_key][tKey] = null;
              week_keys[day_key]['status'] =
                schedule_data.schedule[day_key].status;
            }
          }
        });
      });

      /**
       * * @month loop
       */
      for (var m = moment(i_date); m.isBefore(t_Date); m.add(1, 'days')) {
        let newDate = m;
        let mergedObjWithSameKey = {};

        if (allOff) {
          if (
            manipulatedData.updates[slotDays[newDate.format('e')]] !== undefined
          ) {
            if (Object.keys(manipulatedData.updates).length > 0) {
              mergedObjWithSameKey = {
                ...manipulatedData.updates[slotDays[newDate.format('e')]][
                  newDate.format('YYYY-MM-DD')
                ]
              };
            }
          }
        } else {
          /**
           * * @Setting default nodes
           */
          mergedObjWithSameKey = {
            ...week_keys[slotDaysWeek[newDate.format('e')]]
          };

          if (
            manipulatedData.updates[slotDays[newDate.format('e')]] !== undefined
          ) {
            if (Object.keys(manipulatedData.updates).length > 0) {
              mergedObjWithSameKey = {
                ...week_keys[slotDaysWeek[newDate.format('e')]],
                ...manipulatedData.updates[slotDays[newDate.format('e')]][
                  newDate.format('YYYY-MM-DD')
                ]
              };
            }
          }
        }

        slotsTree[
          newDate
            .tz(defaultTimezone ? defaultTimezone.timezone : 'GMT')
            .startOf('day')
            .format()
        ] = mergedObjWithSameKey;
      }
    }

    /**
     * * @returning final slotsObject for view
     */
    return slotsTree;
  };

  /**
   * * editPost
   */
  const editPost = (post_id, description, scheduled_at, media) => {
    dispatch(actionModalEditScheduledPost(true));
    dispatch(openModal(true));
    dispatch(getMedia());
    const updatedPost = { ...new_post };
    updatedPost.social_accounts = [
      ...updatedPost.social_accounts,
      selected_account
    ];
    updatedPost.description = description;
    updatedPost.status = 'scheduled';
    updatedPost.media = media.length > 0 ? media : [];
    updatedPost.scheduled_at = scheduled_at;
    updatedPost.post_id = post_id;

    dispatch(setNewPostDescription(description));

    media.length > 0 &&
      media.forEach((value, index) => {
        let newMedia = {
          uid: index,
          url: value,
          name: value,
          local: true
        };
        dispatch(setMultipleFileList(newMedia));
      });
    dispatch(setNewPost(updatedPost));
  };

  /**
   * * shareNow
   */
  const shareNow = (post_id, description) => {
    const shareNowData = {
      description: description,
      status: 'now'
    };
    dispatch(
      triggerShareNow(
        shareNowData,
        post_id,
        selected_account.id,
        moment().format('YYYY-MM-DD'),
        moment()
          .add(30, 'days')
          .format('YYYY-MM-DD')
      )
    );
  };

  /**
   * * delete post
   */
  const delete_post = post_id => {
    dispatch(
      deletePost(
        post_id,
        selected_account.id,
        moment().format('YYYY-MM-DD'),
        moment()
          .add(30, 'days')
          .format('YYYY-MM-DD')
      )
    );
  };

  /**
   * * scheduleQueed
   */
  const scheduleQueued = (value, full_date) => {
    dispatch(actionModalQueuedScheduled(true));
    dispatch(openModal(true));
    dispatch(getMedia());
    const updatedPost = { ...new_post };
    updatedPost.social_accounts = [
      ...updatedPost.social_accounts,
      selected_account
    ];
    updatedPost.status = 'queued-scheduled';
    const d = moment(full_date).format('YYYY-MM-DD');
    updatedPost.scheduled_at = moment(`${d}T${value}:00Z`).tz('GMT');
    dispatch(setNewPost(updatedPost));
  };

  /**
   * * @onDrop handling
   */
  const handleDrop = (index, item) => {
    const { description, media, id } = item;
    const updatedPost = { ...new_post };
    let finalTime = moment(index.split('@')[0]).format('YYYY-MM-DD');
    updatedPost.description = description;
    updatedPost.status = 'scheduled';
    updatedPost.scheduled_at = moment(`${finalTime}T${index.split('@')[1]}:00Z`)
      .tz('GMT')
      .format();
    updatedPost.media = media;
    updatedPost.post_id = id;
    updatedPost.social_account_id = selected_account.id;
    dispatch(
      updatePostRequest(
        updatedPost,
        moment().format('YYYY-MM-DD'),
        moment()
          .add(30, 'days')
          .format('YYYY-MM-DD')
      )
    );
  };

  return (
    <MainWrapper>
      <div className='text-right btn-wrapper'>
        <div className='btn-group' role='group' aria-label='Basic example'>
          <Link
            to='/dashboard/queue'
            className='btn btn-outline-secondary active'
          >
            Day
          </Link>
          <Link
            to='/dashboard/queue/calendar'
            className='btn btn-outline-secondary'
          >
            Week
          </Link>
          <Link
            to='/dashboard/queue/calendar'
            className='btn btn-outline-secondary'
          >
            Month
          </Link>
        </div>
      </div>

      {spinner ? (
        <Fragment>
          <Skeleton active={spinner} />
          <Skeleton active={spinner} />
        </Fragment>
      ) : (
        <div className='weekdays-wrapper'>
          {Object.keys(monthDaysSlots()).map(slots_data => {
            return (
              <Fragment key={slots_data}>
                {allOff && Object.keys(slots_data).length > 0 && (
                  <div key={slots_data} className='single-box'>
                    <ul className='time-list text-center'>
                      {Object.keys(monthDaysSlots()[slots_data]).length > 0 &&
                        Object.keys(monthDaysSlots()[slots_data]).map(nodes => {
                          if (monthDaysSlots()[slots_data][nodes] !== null) {
                            if (
                              selected_account.id ===
                              monthDaysSlots()[slots_data][nodes]
                                .social_account_id
                            ) {
                              return (
                                <DragSlot
                                  id={monthDaysSlots()[slots_data][nodes].id}
                                  scheduled_at={
                                    monthDaysSlots()[slots_data][nodes]
                                      .scheduled_at
                                  }
                                  description={
                                    monthDaysSlots()[slots_data][nodes]
                                      .postDetails.description
                                  }
                                  media={
                                    monthDaysSlots()[slots_data][nodes].media
                                  }
                                  timezone={
                                    defaultTimezone !== null
                                      ? defaultTimezone.timezone
                                      : 'GMT'
                                  }
                                  slots_data={slots_data}
                                  delete_post={delete_post}
                                  shareNow={shareNow}
                                  editPost={editPost}
                                  accept={[CARD]}
                                  dispatch={dispatch}
                                  social_account_id={selected_account.id}
                                  start_date={moment().format('YYYY-MM-DD')}
                                  end_date={moment()
                                    .add(30, 'days')
                                    .format('YYYY-MM-DD')}
                                />
                              );
                            }
                          }
                          return true;
                        })}
                    </ul>
                  </div>
                )}
                {monthDaysSlots()[slots_data].status === 'ON' && (
                  <div key={slots_data} className='single-box'>
                    <label>
                      {slotDays[moment(slots_data).format('e')]}
                      <small>
                        {months[moment(slots_data).format('MM') - 1]}{' '}
                        {moment(slots_data).format('DD')}
                      </small>
                    </label>
                    <ul className='time-list text-center'>
                      {Object.keys(monthDaysSlots()[slots_data]).length > 0 &&
                        Object.keys(monthDaysSlots()[slots_data]).map(nodes => {
                          if (monthDaysSlots()[slots_data][nodes] === null) {
                            return (
                              <DropTargetCard
                                accept={[CARD]}
                                onDrop={item =>
                                  handleDrop(slots_data + '@' + nodes, item)
                                }
                                day={slots_data}
                                time={nodes}
                                scheduleQueued={scheduleQueued}
                                fullDate={slots_data}
                                social_account_type={social_account_type}
                              />
                            );
                          } else {
                            if (
                              selected_account.id ===
                              monthDaysSlots()[slots_data][nodes]
                                .social_account_id
                            ) {
                              return (
                                <DragSlot
                                  id={monthDaysSlots()[slots_data][nodes].id}
                                  scheduled_at={
                                    monthDaysSlots()[slots_data][nodes]
                                      .scheduled_at
                                  }
                                  description={
                                    monthDaysSlots()[slots_data][nodes]
                                      .postDetails.description
                                  }
                                  media={
                                    monthDaysSlots()[slots_data][nodes].media
                                  }
                                  timezone={
                                    defaultTimezone !== null
                                      ? defaultTimezone.timezone
                                      : 'GMT'
                                  }
                                  slots_data={slots_data}
                                  delete_post={delete_post}
                                  shareNow={shareNow}
                                  editPost={editPost}
                                  accept={[CARD]}
                                  dispatch={dispatch}
                                  social_account_id={selected_account.id}
                                  start_date={moment().format('YYYY-MM-DD')}
                                  end_date={moment()
                                    .add(30, 'days')
                                    .format('YYYY-MM-DD')}
                                />
                              );
                            }
                          }
                          return true;
                        })}
                    </ul>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      )}
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  font-family: 'Roboto';
  .btn-wrapper {
    padding: 10px 0;
  }
  .btn-group {
    .btn {
      font-size: 14px;
      border: 1px solid #d9d9d9;
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
      color: rgba(0, 0, 0, 0.65);
      font-weight: 400;
      padding: 0 15px;
      height: 32px;
      line-height: 30px;
      white-space: nowrap;
      border-radius: 4px;
      &:hover,
      &:focus {
        box-shadow: none;
        background: transparent;
        color: #2c4bff;
        border-color: #2c4bff;
      }
    }
    .btn.active {
      background: transparent;
      color: #2c4bff;
      border-color: #2c4bff;
      &:focus {
        box-shadow: none;
      }
    }
  }

  .weekdays-wrapper {
    .single-box {
      label {
        font-size: 14px;
        display: block;
        font-weight: 400;
        margin-bottom: 10px;
        small {
          color: rgba(0, 0, 0, 0.4);
          padding-left: 2px;
          font-size: 14px;
        }
      }
    }
  }

  .time-list {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      margin: 0 0 15px;
      padding: 5px;
      background: #f5f5f5;
      cursor: pointer;
      height: 42px;
      font-size: 14px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #f5f5f5;
      color: #c8c8c8;
      font-weight: 300;

      .schedule-post {
        display: none;
      }
      &:hover {
        background: transparent;
        .schedule-post {
          display: block;
          font-size: 20px;
        }
        .time-box {
          display: none;
        }
      }
    }
    li.buffer-box {
      display: block;
      padding: 0;
      height: auto;
      background: transparent;
      text-align: left;
      cursor: grab;
      border: 1px dashed rgba(0, 0, 0, 0.1) !important;
      .buffer-textbox {
        padding: 10px;
        font-size: 15px;
      }
      .bottom-row {
        padding: 10px;
        .left-col {
          font-size: 12.5px;
          color: rgba(0, 0, 0, 0.4);
          font-weight: 400;
          display: flex;
          .anticon {
            color: rgb(44, 75, 255);
            padding: 5px 5px 5px 0;
          }
        }
        .btn {
          font-size: 14px;
          border: 0;
          margin: 0 5px;
          padding: 5px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.4);
          background: transparent;
          &:focus {
            box-shadow: none;
          }
        }
        .share-btn {
          color: #2c4bff;
        }
        .d-flex {
          justify-content: flex-end;
        }
      }
    }
    li.dragedBColor {
      border-color: #2c4bff !important;
    }
  }
  @media (max-width: 991px) {
    .time-list {
      li.buffer-box {
        .bottom-row {
          .d-flex {
            justify-content: flex-start;
            margin-top: 5px;
          }
        }
      }
    }
  }
`;
