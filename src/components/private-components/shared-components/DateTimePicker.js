import React, { useState } from 'react';
import { DatePicker, Select } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';

/**
 * * @importing actions
 */
import { openDatePicker } from '../../../redux/date_time_picker/actions';
import { setNewPost } from '../../../redux/schedule_posts/actions';

const { Option } = Select;

const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const mins = [
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55'
];

export default function DateTimePicker({ submitPost }) {
  /**
   * * @React hooks { useState }
   */
  const [date, setDate] = useState(
    moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD')
  );
  const [hour, setHour] = useState('12');
  const [min, setMin] = useState('00');
  const [convt, setConvt] = useState('PM');

  /**
   * * @Redux hooks { useDispatch, useSelector }
   */
  const dispatch = useDispatch();
  const date_time = useSelector(state => state.date_time_picker);
  const date_time_submit = useSelector(state => state.modal.isModalCalendar);
  const update_new_post = useSelector(state => state.schedule_posts.new_post);

  /**
   * Close Pop Up
   */
  const closePicker = () => {
    dispatch(openDatePicker(false));
  };

  /**
   * Disable Previous Dates
   * @param {*} current
   */
  const disabledDate = current => {
    return current && current < moment().endOf('day');
  };

  /**
   * On Submit
   */
  const submit = () => {
    var final = moment.tz(
      date + ' ' + hour + ':' + min + ' ' + convt,
      'YYYY-MM-DD h:mm A',
      'GMT'
    );

    submitPost(final.format());
  };

  return (
    <div>
      {date_time.date_time_picker && (
        <DatePicker
          disabledDate={disabledDate}
          onChange={(date, datestring) => {
            setDate(datestring);
          }}
          open={date_time.date_time_picker}
          renderExtraFooter={() => {
            return (
              <div className='date-picker'>
                <div className='timeWrapper'>
                  <Text>Time: </Text>
                  <Select
                    defaultValue='12'
                    style={{ width: 60 }}
                    onChange={value => {
                      setHour(value);
                    }}
                  >
                    {hours.map(hour => (
                      <Option key={hour} value={hour}>
                        {hour}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    defaultValue='00'
                    style={{ width: 60 }}
                    onChange={value => setMin(value)}
                  >
                    {mins.map(min => (
                      <Option key={min} value={min}>
                        {min}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    defaultValue='pm'
                    style={{ width: 60 }}
                    onChange={value => {
                      setConvt(value);
                    }}
                  >
                    <Option key='pm' value='PM'>
                      pm
                    </Option>
                    <Option key='am' value='AM'>
                      am
                    </Option>
                  </Select>
                </div>

                <div className='footerButtons'>
                  <button
                    className='btn btn-outline-secondary'
                    onClick={closePicker}
                  >
                    Cancel
                  </button>
                  <button
                    className='btn btn-outline-secondary'
                    onClick={() => {
                      if (!date_time_submit) {
                        submit();
                      } else {
                        const updatedPost = { ...update_new_post };
                        updatedPost.scheduled_at = moment(date)
                          .tz('GMT')
                          .format();
                        dispatch(setNewPost(updatedPost));
                        closePicker();
                      }
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            );
          }}
          showToday={true}
        />
      )}
    </div>
  );
}
