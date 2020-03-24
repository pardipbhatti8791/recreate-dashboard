import { globalModal } from './constants';

/**
 *
 * @param {*} isOpen
 */
export const openModal = isOpen => {
  return {
    type: globalModal.OPEN,
    payload: isOpen
  };
};

/**
 *
 * @param {*} isClose
 */
export const closeModal = isClose => {
  return {
    type: globalModal.OPEN,
    payload: isClose
  };
};

/**
 *
 * @param {*} isTrue
 */
export const actionModalQueuedScheduled = isTrue => {
  return {
    type: globalModal.QUEUED_SCHEDULED,
    payload: isTrue
  };
};

/**
 *
 * @param {*} isTrue
 */
export const actionModalEditScheduledPost = isTrue => {
  return {
    type: globalModal.EDIT_POST,
    payload: isTrue
  };
};

/**
 *
 * @param {*} isTrue
 */
export const actionModalCalendar = isTrue => {
  return {
    type: globalModal.MODAL_CALENDAR,
    payload: isTrue
  };
};

/**
 *
 * @param {*} isTrue
 */
export const actionModalNewOrEdit = isTrue => {
  console.log(isTrue);
  return {
    type: globalModal.MODAL_CALENDAR_NEW_OR_EDIT,
    payload: isTrue
  };
};
