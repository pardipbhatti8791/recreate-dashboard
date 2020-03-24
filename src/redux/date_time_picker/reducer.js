import { DATE_PICKER } from './constants';
import { createReducer } from '../../utils/reducerUtil';

/**
 * * @initialState
 */
const initialState = {
  date_time_picker: false,
  date_time: null
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const openCloseDateTimePicker = (state, payload) => {
  return {
    ...state,
    date_time_picker: payload
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const set_date_time_reducer = (state, payload) => {
  return {
    ...state,
    date_time: payload
  };
};

export default createReducer(initialState, {
  [DATE_PICKER.OPEN_ClOSE]: openCloseDateTimePicker,
  [DATE_PICKER.SET_DATE_TIME]: set_date_time_reducer
});
