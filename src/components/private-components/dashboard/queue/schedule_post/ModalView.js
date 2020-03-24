import React, { Fragment } from 'react';
import { Modal, Button, Dropdown, Menu } from 'antd';
import { CameraFilled, DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import moment from 'moment-timezone';
import { useSelector, useDispatch } from 'react-redux';

import 'emoji-mart/css/emoji-mart.css';

/**
 * * @importing actions
 */
import {
  setNewPost,
  setNewPostDescription
} from '../../../../../redux/schedule_posts/actions';

import {
  getMedia,
  setMultipleFileList
} from '../../../../../redux/post_media/actions';
import FileUpload from '../../../shared-components/FileUpload';
import EmojiPicker from '../../../shared-components/EmojiPicker';
import DateTimePicker from '../../../shared-components/DateTimePicker';
import {
  createPostRequest,
  updatePostRequest
} from '../../../../../redux/create_post/action';
import {
  openModal,
  closeModal,
  actionModalQueuedScheduled,
  actionModalEditScheduledPost,
  actionModalCalendar
} from '../../../../../redux/modal/actions';
import ModalSocialAccounts from './social_accounts';
import ModalTabs from './tabs';
import {
  openDatePicker,
  setDateTime
} from '../../../../../redux/date_time_picker/actions';
import {
  setAccountsLimits,
  setFacebookLimit,
  setLinkedinLimit,
  setTwitterLimit,
  setInstagramLimit
} from '../../../../../redux/post_words_limit/actions';
import SocialAccountsTypesAndLimits from './social_account_limit';

function PostModal() {
  /**
   * @using redux hooks {useDispatch, useSelector}
   */
  const dispatch = useDispatch();

  const reduxStateData = useSelector(state => {
    return {
      social_accounts: state.social_accounts.socialAccounts,
      social_accounts_spinner: state.social_accounts.socialAccountSpinner,
      media: state.media.media,
      selected_account: state.social_accounts.selectedAccount,
      uploaded_media: state.media.uploaded_media
    };
  });
  const newPostState = useSelector(state => state.schedule_posts.new_post);
  const post_description = useSelector(
    state => state.schedule_posts.post_description
  );
  const modal_state = useSelector(state => state.modal);
  const customized_network = useSelector(
    state => state.customized_network.isCustomized
  );
  const fblimit = useSelector(state => state.social_type.facebook);
  const linklimit = useSelector(state => state.social_type.linkedin);
  const twitterlimit = useSelector(state => state.social_type.twitter);
  const instalimit = useSelector(state => state.social_type.instagram);

  /**
   * * @clone newPostState
   */
  const updateNewPost = { ...newPostState };

  /**
   * * @Show Modal
   */
  const showModal = () => {
    dispatch(openModal(true));
    dispatch(getMedia());

    updateNewPost.social_accounts = [
      ...updateNewPost.social_accounts,
      reduxStateData.selected_account
    ];
    console.log('hello there', reduxStateData.selected_account);
    dispatch(setAccountsLimits([reduxStateData.selected_account]));
    dispatch(setNewPost(updateNewPost));
  };

  /**
   * * @Set Description with char limit
   */
  const handleDescription = value => {
    if (!customized_network) {
      dispatch(setFacebookLimit(2000 - value.length));
      dispatch(setLinkedinLimit(1300 - value.length));
      dispatch(setTwitterLimit(280 - value.length));
      dispatch(setInstagramLimit(1000 - value.length));

      if (fblimit < 2 || linklimit < 2 || twitterlimit < 2 || instalimit < 2) {
        return false;
      } else {
        dispatch(setNewPostDescription(value));
      }
    }
  };

  /**
   * * Open Date Picker when schedule
   * @param {*} e
   */
  const handleDropdown = e => {
    if (e.key === 'scheduled') {
      dispatch(openDatePicker(true));
      updateNewPost.status = e.key;
    } else {
      updateNewPost.status = e.key;
      updateNewPost.description = post_description;
      dispatch(setNewPost(updateNewPost));
      dispatch(
        createPostRequest(
          updateNewPost,
          moment().format('YYYY-MM-DD'),
          moment()
            .add(31, 'days')
            .format('YYYY-MM-DD')
        )
      );
    }
  };

  /**
   * * @submit post for schedule
   */
  const submitPost = formattedDateTime => {
    let formaTime = moment(formattedDateTime)
      .tz('GMT')
      .format();
    updateNewPost.scheduled_at = formaTime;
    updateNewPost.status = 'scheduled';
    updateNewPost.description = post_description;

    /**
     * * @dispatchers
     */
    dispatch(setDateTime(formaTime));
    dispatch(setNewPost(updateNewPost));
    dispatch(
      createPostRequest(
        updateNewPost,
        moment().format('YYYY-MM-DD'),
        moment()
          .add(31, 'days')
          .format('YYYY-MM-DD')
      )
    );
  };

  /**
   * * @submit post for schedule
   */
  const submitPostCalendar = () => {
    updateNewPost.status = 'scheduled';
    updateNewPost.description = post_description;

    /**
     * * @dispatchers
     */
    dispatch(setNewPost(updateNewPost));
    dispatch(
      createPostRequest(
        updateNewPost,
        moment().format('YYYY-MM-DD'),
        moment()
          .add(30, 'days')
          .format('YYYY-MM-DD')
      )
    );
  };

  /**
   * Close Pop UP
   * @param {*} e
   */
  const handleCancel = e => {
    updateNewPost.social_accounts = [];
    updateNewPost.description = '';
    updateNewPost.media = [];
    updateNewPost.status = null;
    updateNewPost.scheduled_at = null;

    /**
     * * @dispatchers
     */
    dispatch(setNewPostDescription(''));
    dispatch(setMultipleFileList({}));
    dispatch(setNewPost(updateNewPost));
    dispatch(closeModal(false));
    dispatch(actionModalQueuedScheduled(false));
    dispatch(actionModalEditScheduledPost(false));
    dispatch(actionModalCalendar(false));
  };

  /**
   * * @submitQueuedScheduledPost
   */
  const submitQueuedScheduledPost = () => {
    updateNewPost.description = post_description;

    /**
     * * @dispatchers
     */
    dispatch(setNewPost(updateNewPost));
    dispatch(
      createPostRequest(
        updateNewPost,
        moment().format('YYYY-MM-DD'),
        moment()
          .add(31, 'days')
          .format('YYYY-MM-DD')
      )
    );
    dispatch(closeModal(false));
  };

  /**
   * * submitEditedPost
   */
  const submitEditedPost = () => {
    updateNewPost.description = post_description;
    updateNewPost.social_account_id = reduxStateData.selected_account.id;
    /**
     * * @dispatchers
     */
    dispatch(setNewPost(updateNewPost));
    dispatch(
      updatePostRequest(
        updateNewPost,
        moment().format('YYYY-MM-DD'),
        moment()
          .add(31, 'days')
          .format('YYYY-MM-DD')
      )
    );
    dispatch(closeModal(false));
  };

  /**
   * Dropdown Menus
   */
  const menu = (
    <Menu onClick={handleDropdown}>
      <Menu.Item key='draft'>Add to Draft</Menu.Item>
      <Menu.Item key='queued'>Add to Queue</Menu.Item>
      <Menu.Item key='scheduled'>Schedule Post</Menu.Item>
      <Menu.Item key='now'>Share Now</Menu.Item>
    </Menu>
  );
  let uniq = {};
  return (
    <BodyMainWrapper>
      <div className='body-main-wrapper'>
        <Button className='camera-btn' block size='large' onClick={showModal}>
          <span>Upload something in your mind</span>
          <CameraFilled />
        </Button>
        <Modal
          title='New Post'
          visible={modal_state.modalState}
          width={'95%'}
          style={{ top: 20 }}
          footer={null}
          onCancel={handleCancel}
        >
          <PopupWrapper>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-lg-6'>
                  <div className='popupleft-col'>
                    <div className='social-accounts d-flex mb-3'>
                      <ModalSocialAccounts />
                    </div>
                    <div className='fb-2000 text-right'>
                      <SocialAccountsTypesAndLimits />
                    </div>
                    <div className='textarea-wrapper'>
                      <div className='emoji-container'>
                        <EmojiPicker
                          dispatch={dispatch}
                          post_description={post_description}
                          setNewPostDescription={setNewPostDescription}
                        />
                      </div>
                      <textarea
                        className='form-control'
                        placeholder='What would you like to share?'
                        maxLength='2000'
                        onChange={e => handleDescription(e.target.value)}
                        value={post_description}
                      />
                      <div className='custom-file'>
                        <FileUpload />
                      </div>
                    </div>
                    {updateNewPost.social_accounts.filter(
                      f => !uniq[f.provider] && (uniq[f.provider] = true)
                    ).length > 1 && <a href='##'>Customize Network</a>}
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='tab-col'>
                    <ModalTabs description={post_description} />
                  </div>
                </div>
              </div>
            </div>
            <div className='choose-optionbox text-right'>
              {!modal_state.modalQueuedScheduled &&
                !modal_state.modalEditPost &&
                !modal_state.isModalCalendar && (
                  <Dropdown disabled={post_description === ''} overlay={menu}>
                    <button
                      className={
                        'btn' +
                        (newPostState.description !== ''
                          ? ' btn-primary'
                          : ' btn-secondary')
                      }
                      onClick={e => e.preventDefault()}
                    >
                      Choose Option <DownOutlined />
                    </button>
                  </Dropdown>
                )}

              {modal_state.modalQueuedScheduled && (
                <button
                  type='button'
                  className={'btn btn-primary'}
                  onClick={submitQueuedScheduledPost}
                >
                  Ok
                </button>
              )}

              {modal_state.modalEditPost && (
                <button
                  type='button'
                  className={'btn btn-primary'}
                  onClick={submitEditedPost}
                >
                  Update
                </button>
              )}

              {modal_state.isModalCalendar && (
                <Fragment>
                  <span style={{ padding: '0px 16px', fontSize: '16px' }}>
                    Post Schedule:{' '}
                    {moment(newPostState.scheduled_at).format(
                      'MMMM Do YYYY, h:mm a'
                    )}
                    <b
                      onClick={() => dispatch(openDatePicker(true))}
                      style={{ paddingLeft: '5px', cursor: 'pointer' }}
                    >
                      Edit
                    </b>
                  </span>
                  {modal_state.isModalEditOrNew ? (
                    <button
                      type='button'
                      className={'btn btn-primary'}
                      onClick={submitEditedPost}
                    >
                      Ok
                    </button>
                  ) : (
                    <button
                      type='button'
                      className={'btn btn-primary'}
                      onClick={submitPostCalendar}
                    >
                      Ok
                    </button>
                  )}
                </Fragment>
              )}

              <DateTimePicker submitPost={submitPost} />
            </div>
          </PopupWrapper>
        </Modal>
      </div>
    </BodyMainWrapper>
  );
}

export default PostModal;
const BodyMainWrapper = styled.div`
.body-main-wrapper{
.camera-btn{
  display:flex;
  margin-bottom:30px;
  justify-content:space-between;
  box-shadow:0 1px 4px #e3e3e3;
  border:0;
  font-size: 14px;
    padding: 12.5px 10px;
    height: fit-content;
  &:hover{
    color:#2c4bff;
  }
`;
const PopupWrapper = styled.div`
 .choose-optionbox {
    border-top: 1px solid #e8e8e8;
    padding:10px 16px;
    .btn{
      font-size:14px;
     background: rgba(0,0,0,.4);
     border:0;
    }
  }
  .main-tabs > .ant-tabs-bar {
    border: 0;
    margin-bottom: 10px;
  }
  .main-tabs > .ant-tabs-bar .ant-tabs-nav {
    display: block;
  }
  .main-tabs > .ant-tabs-bar .ant-tabs-nav .ant-tabs-tab {
    width: 50%;
    margin: 0;
    font-weight: 300;
    padding: 20px;
    text-align: center;
    &:hover{
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .main-tabs > .ant-tabs-bar .ant-tabs-nav .ant-tabs-tab-active.ant-tabs-tab {
   
    color: #fff;
    background: #2c4bff;
    &:hover{
      color: #fff;
    }
  }
  .main-tabs .ant-tabs-top-content {
    position: relative;
  }
  .search-col {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    width: 54%;
    padding-right: 32px;
  }
  .search-col .hamburgericon {
    position: absolute;
    right: 10px;
    top: 8px;color: rgba(0,0,0,.65);
  }
  .searchtext {
    position: relative;
  }
  .searchtext input {
    padding-right: 35px;
    height: 35px;
    font-size: 13px;
    color: rgb(89, 89, 89);
    border-color: rgb(233, 233, 233);
    &:hover, &:focus{
      border-color:#2c4bff;
    }
  }
  .searchtext .search-btn {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    padding: 0 10px;    color: rgba(0,0,0,.65);
  }
  .ant-tabs-ink-bar {
    height: 0;
  }
  .sub-tabs > .ant-tabs-bar .ant-tabs-nav .ant-tabs-tab {
    margin: 0 15px 1px;
    font-weight: 400;
    padding: 8px 16px;
    text-align: center;
    border: 1px solid #e8e8e8;
    border-radius: 4px 4px 0 0;
    background:#fafafa;
    &:hover{
      color: #2c4bff;
    }
  }
  .sub-tabs > .ant-tabs-bar .ant-tabs-nav .ant-tabs-tab-active.ant-tabs-tab {
    font-weight:500;
    color: #2c4bff;
    background: #fff;
    border-color: #e8e8e8;
    border-bottom: 1px solid #fff;
  }
  .sub-tabs .ant-tabs-top-content .ant-tabs-tabpane {
    padding: 0 30px;
  }
  .ant-collapse-borderless > .ant-collapse-item {
    border-bottom: 0;
    background: #f5f5f5;
    margin-bottom: 10px;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {color: rgba(0,0,0,.4);font-weight:300;}
  .ant-collapse-borderless > .ant-collapse-item > .ant-collapse-content {
    background-color: #fff;
    border-top: 1px solid #d9d9d9;
  }
  .card-body {
    padding:12px 0 0;
        color: rgba(0,0,0,.65);font-weight:300;
  }
  .ant-card-bordered {
    padding: 10px;
    margin:0 10px;
  }
  .slick-slider {
    padding-right: 4px;
    margin-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
    padding-top:12px;
    video {
    max-width: 100%;
}
img{
  margin:0 auto;
}
  }
  .slick-next:before,
  .slick-prev:before {
    color: #222;
  }
  .slick-next {
    right: -20px;
  }
  .slick-prev {
    left: -20px;
  }
  .ant-card-body .spanName {
    display: block;
    font-weight: 600;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 5px 10px;
  }
  .ant-checkbox + span {
    padding: 0;
  }
  .ant-checkbox-group > span {
    margin: 0 5px;
  }
  .ant-checkbox + span .ant-avatar-image {
    opacity: 0.3;
  }
  .ant-checkbox.ant-checkbox-disabled + span .ant-avatar-image {
    opacity: 1;
  }
  .ant-checkbox.ant-checkbox-checked + span .ant-avatar-image {
    opacity: 1;
  }
  .ant-checkbox-wrapper {
    position: relative;
  }
  .ant-checkbox {
    position: absolute;
    left: 0;
    right: 0;
    opacity: 0;
  }
  .text-primary {
    color: #2c4bff !important;
  }

  button.close {
    font-size: 20px;
    position: absolute;
    right: 15px;
    top: 10px;
    z-index: 11;
    color: #c8c8c8;
  }

  .social-accounts {
    margin: 0;
    padding: 0;
    justify-content: center;
   
  }
  .social-accounts img.social-icon {
    bottom: 0;
    position: absolute;
    width: 15px;
    right: 0;
    border: 0;
  }
  .social-accounts li {
    list-style: none;
    padding: 0 10px;
  }

  .textarea-wrapper {
    position: relative;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    padding-bottom: 60px;
    min-height: 166px;
        .emoji-container {
        border: 1px solid silver;
        text-align: center;
        border-radius: 5px;
        right: 8px;
        padding: 2px 6px;
        margin-top: 5px;
        position: absolute;
        z-index: 1000;
        cursor: pointer;
    }
  }

  .textarea-wrapper textarea.form-control {
    height:90px;
    border: 0;
    resize: none;
    padding:5px 50px 0 10px;
    font-size: 14px;
    color: rgba(0,0,0,.65);
  }

  .textarea-wrapper .custom-file-label {
    border: 1px dashed rgba(0,0,0,.2);
    font-size: 14px;
    color: rgba(0,0,0,.65);
    height: 36px;
    text-align: center;
    padding: 5px 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 300;
    top:20px;
  }

  .textarea-wrapper .custom-file {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 12px;
    display: block;
    width: auto;
    height: 60px;
    cursor: pointer;
   
  }

  .textarea-wrapper .custom-file-label::after {
    display: none;
  }

  .form-control:focus,
  .custom-file-input:focus ~ .custom-file-label {
    box-shadow: none;
  }

  .socialicon img {
    max-width: 100%;
  }

  .popupleft-col {
    padding: 10px 0 10px 10px;
     .fb-2000{
      padding:10px 20px;color:rgba(0,0,0,.4);font-weight:300;
    }
    .ant-upload-picture-card-wrapper {
      margin-top:20px;
    .ant-upload-list-picture-card .ant-upload-list-item, .ant-upload-list-picture-card-container{
    width: 60px;
    height: 50px;
    margin: 0 2px 8px 0;
}
.ant-upload.ant-upload-select-picture-card{
      width: 60px;
    
}
.ant-upload.ant-upload-select-picture-card > .ant-upload {
    
    padding: 6px;
    font-size: 12px;
}
  }

  .tab-col {
    border-left: 1px solid #e8e8e8;
    margin-right: -15px;
  }

 

  @media (max-width: 991px) {
    .popupleft - col {
      padding: 1rem;
    }

    .tab-col {
      border-left: 0;
      margin-right: 0;
    }
  }

  @media (max-width: 767px) {
    .popupleft-col {
      padding: 1rem 0;
    }

    .textarea-wrapper .custom-file-label {
      font-size: 14px;
    }
  }
`;
