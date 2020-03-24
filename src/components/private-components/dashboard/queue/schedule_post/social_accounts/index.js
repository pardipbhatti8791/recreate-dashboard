import React from 'react';
import { Tooltip, Checkbox, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

/**
 * * @importing actions
 */
import { setNewPost } from '../../../../../../redux/schedule_posts/actions';
import { setAccountsLimits } from '../../../../../../redux/post_words_limit/actions';

export default function ModalSocialAccounts() {
  /**
   * @using redux hooks { useSelector, useDispatch }
   */
  const reduxStateData = useSelector(state => {
    return {
      social_accounts: state.social_accounts.socialAccounts,
      social_accounts_spinner: state.social_accounts.socialAccountSpinner,
      selected_account: state.social_accounts.selectedAccount
    };
  });
  const newPostState = useSelector(state => state.schedule_posts.new_post);
  const dispatch = useDispatch();

  /**
   *
   * @param {*} e
   */
  const getCheckedAccounts = e => {
    const updateNewPost = { ...newPostState };
    updateNewPost.social_accounts = e;
    dispatch(setAccountsLimits(e));
    dispatch(setNewPost(updateNewPost));
  };

  return (
    <Checkbox.Group
      id='checkGroup'
      onChange={e => {
        getCheckedAccounts(e);
      }}
      defaultValue={[reduxStateData.selected_account]}
    >
      {reduxStateData.social_accounts.map((account, index) => {
        return (
          <span key={index}>
            <Tooltip title={account.name}>
              <Checkbox
                value={account}
                disabled={account.id === reduxStateData.selected_account.id}
              >
                {account.picture_url !== null ? (
                  <Avatar size={35} shape='circle' src={account.picture_url} />
                ) : (
                  <Avatar size={35} shape='circle'>
                    {account.name}
                  </Avatar>
                )}
                {account.provider === 'facebook' && (
                  <img
                    src='/images/facebook.png'
                    className='social-icon'
                    alt='fb'
                  />
                )}
                {account.provider === 'twitter' && (
                  <img
                    src='/images/twitter.png'
                    className='social-icon'
                    alt='fb'
                  />
                )}
                {account.provider === 'linkedin' && (
                  <img
                    src='/images/linkedin.png'
                    className='social-icon'
                    alt='linkedin'
                  />
                )}
                {account.provider === 'instagram' && (
                  <img
                    src='/images/instagram.svg'
                    className='social-icon'
                    alt='fb'
                  />
                )}
              </Checkbox>
            </Tooltip>
          </span>
        );
      })}
    </Checkbox.Group>
  );
}
