import { DATE_PICKER } from './constants';

/**
 *
 * @param {*} isOpened
 */
export const openDatePicker = isOpened => {
  return {
    type: DATE_PICKER.OPEN_ClOSE,
    payload: isOpened
  };
};

/**
 *
 * @param {*} date_time
 */
export const setDateTime = date_time => {
  return {
    type: DATE_PICKER.SET_DATE_TIME,
    payload: date_time
  };
};
