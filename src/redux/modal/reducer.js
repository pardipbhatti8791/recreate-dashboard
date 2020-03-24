import { createReducer } from '../../utils/reducerUtil';
import { globalModal } from './constants';

/**
 * * @initialState
 */
const initialState = {
  modalState: false,
  modalQueuedScheduled: false,
  modalEditPost: false,
  isModalCalendar: false,
  isModalEditOrNew: false
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const openGlobalModal = (state, payload) => {
  return {
    ...state,
    modalState: payload
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const closeGlobalModal = (state, payload) => {
  return {
    ...state,
    modalState: payload
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const setQueuedScheduledModal = (state, payload) => {
  return {
    ...state,
    modalQueuedScheduled: payload
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const editScheduledPostModal = (state, payload) => {
  return {
    ...state,
    modalEditPost: payload
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const setIsModalCalendar = (state, payload) => {
  return {
    ...state,
    isModalCalendar: payload
  };
};

/**
 *
 * @param {*} state
 * @param {*} payload
 */
export const setIsModalNewOrEdit = (state, payload) => {
  return {
    ...state,
    isModalEditOrNew: payload
  };
};

export default createReducer(initialState, {
  [globalModal.OPEN]: openGlobalModal,
  [globalModal.CLOSE]: openGlobalModal,
  [globalModal.QUEUED_SCHEDULED]: setQueuedScheduledModal,
  [globalModal.EDIT_POST]: editScheduledPostModal,
  [globalModal.MODAL_CALENDAR]: setIsModalCalendar,
  [globalModal.MODAL_CALENDAR_NEW_OR_EDIT]: setIsModalNewOrEdit
});
