import React, { Fragment, useState } from 'react';
import { Divider, Select, Skeleton } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox } from 'antd';
// import swal from 'sweetalert';
import swal from '@sweetalert/with-react';
import * as moment from 'moment';

import { toSentenceCase } from '../../../../utils/toSentenceCase';
import {
  updatePostTime,
  setSettingPostSpinner,
  updatePostTimezone
} from '../../../../redux/schedule_posts/actions';
import {
  common_weekdays,
  common_hours,
  common_minutes,
  common_am_pm,
  common_timeZone
} from '../../../../utils/commonData';

const { Option } = Select;
const weekendKeys = ['saturday', 'sunday'];
const weekdayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

function SettingsPosts() {
  /**
   * * React hooks { useState }
   */
  const [day, set_day] = useState('monday');
  const [timeArray, set_timeArray] = useState(['12:00']);
  const [time, setTime] = useState({
    hrs: '12',
    minutes: '00',
    a: 'PM'
  });

  /**
   * * Redux hooks { userSelector, useDispatch }
   */
  const schedules = useSelector(state => state.schedule_posts.schedules);
  const spinner = useSelector(state => state.schedule_posts.spinner);
  const selectedSocialAccount = useSelector(
    state => state.social_accounts.selectedAccount
  );

  const dispatch = useDispatch();

  /**
   * * get week days
   */
  const weekDays = () => {
    let week = [];
    if (schedules !== null) {
      for (var key in schedules.schedule) {
        week.push({ key: key, status: schedules.schedule[key].status });
      }
    }
    return week;
  };

  /**
   * * week posting time
   */
  const weekDayPostTimes = () => {
    let weekPostTime = [];
    if (schedules !== null) {
      for (var key in schedules.schedule) {
        weekPostTime.push(
          <td key={key}>
            {schedules.schedule[key].timing.length > 0 ? (
              schedules.schedule[key].timing.map((time, i) => {
                return (
                  <span key={i}>
                    {moment(time, 'HH:mm a').format('hh:mm A')} <br />
                  </span>
                );
              })
            ) : (
                <span key={key}>No Data</span>
              )}
          </td>
        );
      }
      return weekPostTime;
    }
  };

  /**
   *
   * @param {*} value
   */
  const onTimezoneChange = value => {
    const selected_social_account_id =
      selectedSocialAccount !== null && selectedSocialAccount.id;

    let data = {
      social_account_type: 'page',
      social_account_id: selected_social_account_id,
      timezone: value,
      status: 'active',
      keep_schedule_timing_same: false
    };

    swal({
      title: 'Are you sure?',
      text:
        'It will override your last time zone for all posts within selected account',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      content: (
        <div>
          <Checkbox
            onChange={e => {
              data.keep_schedule_timing_same = e.target.checked;
            }}
          >
            Text will come here
          </Checkbox>
        </div>
      )
    }).then(willDelete => {
      if (willDelete) {
        let formData = new FormData();
        formData = data;
        dispatch(
          updatePostTimezone(formData, selected_social_account_id, 'page')
        );
      } else {
        dispatch(setSettingPostSpinner(true));
        dispatch(setSettingPostSpinner(false));
      }
    });
  };

  /**
   *
   * @param {*} value
   */
  const onChange = value => {
    set_day(value);
    set_timeArray([]);
    if (schedules !== null) {
      /**
       * * // setting single previous value
       */
      for (var key in schedules.schedule) {
        if (key === value) {
          set_timeArray(schedules.schedule[key].timing);
        }
      }
      /**
       * * //setting everyday previous value
       */
      if (value === 'every day') {
        let allPreviewSchedules = [];

        for (var e_key in schedules.schedule) {
          var blankObject = {};
          blankObject[e_key] = schedules.schedule[e_key].timing;
          allPreviewSchedules.push(blankObject);
        }

        set_timeArray(allPreviewSchedules);
      }

      /**
       * * //setting weekend previous value
       */
      if (value === 'weekend') {
        let allPreviousWeekendSchedules = [];
        for (var w_key in schedules.schedule) {
          if (weekendKeys.includes(w_key)) {
            var weekendObject = {};
            weekendObject[w_key] = schedules.schedule[w_key].timing;
            allPreviousWeekendSchedules.push(weekendObject);
          }
        }
        set_timeArray(allPreviousWeekendSchedules);
      }

      /**
       * * //setting weekday previous value
       */

      if (value === 'weekdays') {
        let allPreviousWeekDaysSchedules = [];
        for (var wd_key in schedules.schedule) {
          if (weekdayKeys.includes(wd_key)) {
            var weekdayObject = {};
            weekdayObject[wd_key] = schedules.schedule[wd_key].timing;
            allPreviousWeekDaysSchedules.push(weekdayObject);
          }
        }
        set_timeArray(allPreviousWeekDaysSchedules);
      }
    }
  };

  /**
   * * updating time for post
   */
  const updatePostTimeFunc = () => {
    const update_schedule_data = { ...schedules };

    let postTime = moment(
      `${time.hrs}:${time.minutes}:${time.a}`,
      'HH:mm a'
    ).format('HH:mm');

    /**
     * * // adding time to weekdays
     */
    if (day === 'weekdays') {
      for (var week_day_key in update_schedule_data.schedule) {
        if (weekdayKeys.includes(week_day_key)) {
          if (!timeArray.includes(postTime)) {
            for (var previous_week_day_key in timeArray) {
              if (
                timeArray[previous_week_day_key][week_day_key] !== undefined
              ) {
                timeArray[previous_week_day_key][week_day_key].push(postTime);
              }
            }
          }
        }
      }
    }

    /**
     * * // adding time to weekend
     */
    if (day === 'weekend') {
      for (var week_key in update_schedule_data.schedule) {
        if (weekendKeys.includes(week_key)) {
          if (!timeArray.includes(postTime)) {
            for (var previous_weekend_key in timeArray) {
              if (timeArray[previous_weekend_key][week_key] !== undefined) {
                timeArray[previous_weekend_key][week_key].push(postTime);
              }
            }
          }
        }
      }
    }

    /**
     * * // adding time to every day
     */
    if (day === 'every day') {
      for (var every_key in update_schedule_data.schedule) {
        if (!timeArray.includes(postTime)) {
          for (var previous_key in timeArray) {
            if (timeArray[previous_key][every_key] !== undefined) {
              timeArray[previous_key][every_key].push(postTime);
            }
          }
          dispatch(updatePostTime(update_schedule_data));
        }
      }
    }

    /**
     * * // adding time to selected day
     */
    if (!timeArray.includes(postTime)) {
      set_timeArray([...timeArray, postTime]);
      if (update_schedule_data !== null) {
        for (var key in update_schedule_data.schedule) {
          if (key === day) {
            if (!timeArray.includes(postTime)) {
              update_schedule_data.schedule[day] = {
                ...update_schedule_data.schedule[key],
                timing: [...timeArray, postTime]
              };
            }
          }
        }
        dispatch(updatePostTime(update_schedule_data));
      }
    }
  };

  /**
   *
   * @param {*} selectedDay
   * @param {*} currentState
   */
  const turnOffTurnOnDay = (selectedDay, currentState) => {
    const update_schedule_data = { ...schedules };

    if (update_schedule_data !== null) {
      for (var key in update_schedule_data.schedule) {
        if (key === selectedDay) {
          update_schedule_data.schedule[selectedDay] = {
            ...update_schedule_data.schedule[key],
            status: String(currentState) === 'OFF' ? 'ON' : 'OFF'
          };
        }
      }

      dispatch(updatePostTime(update_schedule_data));
    }
  };

  /**
   * * Clearing all posting time
   */
  const clearAllPostingTimes = () => {
    const update_schedule_data = { ...schedules };
    const clearKey = 'clear';
    /**
     * * // adding time to every day
     */
    if (clearKey === 'clear') {
      for (var clear_key in update_schedule_data.schedule) {
        update_schedule_data.schedule[clear_key] = {
          ...update_schedule_data.schedule[clear_key],
          timing: [],
          status: 'ON'
        };
      }
      dispatch(updatePostTime(update_schedule_data));
    }
  };

  const selectDays = () => {
    return (
      <Select

        showSearch
        style={{ width: 200 }}
        placeholder='Select a person'
        onChange={onChange}
        defaultValue={''}
        loading={spinner}
      >
        <Option value=''>Select Day</Option>
        {common_weekdays.map(day => {
          return (
            <Select.Option key={day.key} value={day.key.toLocaleLowerCase()}>
              {day.key}
            </Select.Option>
          );
        })}
      </Select>
    );
  };

  return (
    <Fragment>
      <SettingsWrapper>
        {spinner ? (
          <Fragment>
            <Skeleton active={spinner} size='large' />
            <Skeleton active={spinner} size='large' />
          </Fragment>
        ) : (
            <Fragment>
              <h4 className="setting-title">Your posting schedule for {selectedSocialAccount.name}</h4>
              <Divider />
              <div className='row'>
                <div className='col-lg-6'>
                  <div className='width-200'>
                    <label className="font-weight500">Timezone</label>
                    <Select
                      className='form-control1'
                      showSearch
                      style={{ width: 200 }}
                      placeholder='Select a timezone'
                      onChange={onTimezoneChange}
                      defaultValue={schedules !== null && schedules.timezone}
                      loading={spinner}
                    >
                      <Option value=''>Select Time Zone</Option>
                      {common_timeZone.map(timezone => {
                        return (
                          <Select.Option key={timezone} value={timezone}>
                            {timezone}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='stop-post'>
                    <p className='small'>
                      Stop all posts from being sent on this social Account?{' '}
                      <a href='l'>Learn More</a>
                    </p>
                  </div>
                </div>
              </div>
              <Divider />
              <div className='row'>
                <div className='col-xl-10 col-md-12'>
                  <label className="font-weight500">Add a new posting time</label>
                  <div className='posting-time d-flex align-items-center pb-2'>
                    {selectDays()}
                    <div className="choose-time">
                      <label className='mr-3 mt-2'>choose times</label>
                      <Select
                        defaultValue='12'
                        style={{ width: 60 }}
                        onChange={value => {
                          setTime({ ...time, hrs: value });
                        }}
                      >
                        {common_hours.map(hr => {
                          return (
                            <Select.Option key={hr} value={hr}>
                              {hr}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    &nbsp;
                    <Select
                        defaultValue='00'
                        style={{ width: 60 }}
                        onChange={value => {
                          setTime({ ...time, minutes: value });
                        }}
                      >
                        {common_minutes.map(min => {
                          return (
                            <Select.Option key={min} value={min}>
                              {min}
                            </Select.Option>
                          );
                        })}
                      </Select>
                  &nbsp;
                  <Select
                        defaultValue='PM'
                        style={{ width: 60 }}
                        onChange={value => {
                          setTime({ ...time, a: value });
                        }}
                      >
                        {common_am_pm.map(a => {
                          return (
                            <Select.Option key={a} value={a}>
                              {a.toUpperCase()}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </div>
                    <button
                      className='btn btn-primary'
                      type='button'
                      onClick={updatePostTimeFunc}
                    >
                      Add Posting Time
                  </button>

                  </div>
                </div>
              </div>
              <Divider />
              <div className='row'>
                <div className='col-md-6'>
                  <h5 className="setting-title">Posting Times</h5>
                </div>
                <div className='col-md-6'>
                  <button
                    className='float-md-right btn btn-outline-secondary'
                    type='button'
                    onClick={clearAllPostingTimes}
                  >
                    clear all posting Times{' '}
                  </button>
                </div>

                <div className='col-md-12 mt-4'>
                  <div className='table-responsive'>
                    <table className='table table-bordered text-center'>
                      <thead>
                        <tr>
                          {weekDays().length > 0 &&
                            weekDays().map(p_time => {
                              return (
                                <th>
                                  {toSentenceCase(p_time.key)} <br />{' '}
                                  <span
                                    className='text-primary turnOffOn'
                                    onClick={() =>
                                      turnOffTurnOnDay(p_time.key, p_time.status)
                                    }
                                  >
                                    Turn {toSentenceCase(p_time.status)}
                                  </span>
                                </th>
                              );
                            })}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>{weekDayPostTimes()}</tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
      </SettingsWrapper>

    </Fragment>
  );
}
export default SettingsPosts;

const SettingsWrapper = styled.div`
.ant-select-selector{
  border-radius:4px;
}
.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: #2c4bff;
    
}
.font-weight500{font-weight:500;}
 .setting-title{
   font-size: 18px;
    color: rgba(0,0,0,.6) !important;;
    font-weight: 600;
    margin-bottom: .5em;
    line-height: 1.4;
 }
  .width-200 {
    max-width: 200px;
  }
  .btn-primary {
    color: #fff;
    background-color: rgb(44, 75, 255);
    border-color: rgb(44, 75, 255);
    font-size: 14px;padding:0 15px;height:32px;
    &:hover, &:focus{
box-shadow:none;
    }
  }
  .stop-post {
    text-align: right;
    .small{
      font-size:13px;
    }
  }
  .table td {
   font-weight:300;
  }
  .turnOffOn:hover {
    cursor: pointer;
  }
  .table thead th {
    vertical-align: bottom;
    border-bottom: 1px solid #e8e8e8;
    background: #fafafa;
        color: rgba(0,0,0,.85);
        .text-primary {
    color: #096dd9 !important;
    font-weight: 400;
}
}
.table-bordered td, .table-bordered th {
    border: 1px solid #e8e8e8;padding:16px;
}
.table-bordered td span{
  display:block;white-space:nowrap;padding:5px 0;
}
.table-bordered tbody tr:hover{
  background:#F8F8F8;
}
.btn-outline-secondary {
    color: rgba(0,0,0,.4);
    background-color: transparent;
    background-image: none;
    border-color: #d9d9d9;
    font-size: 14px;
    padding: 0 15px;
    height: 32px;
    &:hover, &:focus{
      color: #2c4bff;
    border-color: #2c4bff;
    background:transparent;
    }
   
}
.posting-time{
  justify-content:space-between;
}
@media(max-width:1024px){
 .posting-time{
   display:block !important
 }
 .choose-time {
    padding: 15px 0;
}
}
@media(max-width:991px){
  .stop-post {
    text-align: left;margin-top:15px;
}
}
`;
