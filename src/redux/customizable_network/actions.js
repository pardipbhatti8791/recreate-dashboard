import { customized } from './constants';

/**
 *
 * @param {*} isTrue
 */
export const openModal = isTrue => {
  return {
    type: customized.IS_CUSTOMIZED,
    payload: isTrue
  };
};
