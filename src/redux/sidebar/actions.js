import { sidebar } from './constants';

/**
 *
 * @param {*} isOpen
 */
export const setActive = setActiveNode => {
  return {
    type: sidebar.SET_ACTIVE,
    payload: setActiveNode
  };
};

/**
 *
 * @param {*} actType
 */
export const setSocialAccountType = actType => {
  console.log('here', actType);
  return {
    type: sidebar.S_ACCOUNT_TYPE,
    payload: actType
  };
};
