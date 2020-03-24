import React, { Fragment } from 'react';
import { Row, Col, Skeleton, Empty } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment-timezone';

import {
  actionModalEditScheduledPost,
  openModal
} from '../../../../redux/modal/actions';
import {
  setNewPost,
  setNewPostDescription
} from '../../../../redux/schedule_posts/actions';
import {
  triggerShareNow,
  deletePost
} from '../../../../redux/create_post/action';
import { setMultipleFileList } from '../../../../redux/post_media/actions';

function DraftPosts(props) {
  const scheduledPosts = useSelector(
    state => state.schedule_posts.scheduled_draft_posts.draft
  );
  const spinner = useSelector(state => state.schedule_posts.spinner);
  /**
   * * Redux hooks { useSelector, useDispatch }
   */

  const new_post = useSelector(state => state.schedule_posts.new_post);
  const selected_account = useSelector(
    state => state.social_accounts.selectedAccount
  );
  const dispatch = useDispatch();

  /**
   * * editPost
   */
  const editPost = (post_id, description, scheduled_at, media) => {
    dispatch(actionModalEditScheduledPost(true));
    dispatch(openModal(true));
    const updatedPost = { ...new_post };
    updatedPost.description = description;
    updatedPost.status = 'scheduled';
    updatedPost.media = media.length > 0 ? media : [];
    updatedPost.scheduled_at = scheduled_at;
    updatedPost.post_id = post_id;

    dispatch(setNewPostDescription(description));

    media.length > 0 &&
      media.forEach((value, index) => {
        let newMedia = {
          uid: index,
          url: value,
          name: value,
          local: true
        };
        dispatch(setMultipleFileList(newMedia));
      });

    dispatch(setNewPost(updatedPost));
    props.history.push('/dashboard/queue');
  };

  /**
   * * shareNow
   */
  const shareNow = (post_id, description) => {
    const shareNowData = {
      description: description,
      status: 'now'
    };
    dispatch(
      triggerShareNow(
        shareNowData,
        post_id,
        selected_account.id,
        moment().format('YYYY-MM-DD'),
        moment()
          .add(31, 'days')
          .format('YYYY-MM-DD')
      )
    );
  };

  /**
   * * delete post
   */
  const delete_post = post_id => {
    dispatch(
      deletePost(
        post_id,
        selected_account.id,
        moment().format('YYYY-MM-DD'),
        moment()
          .add(30, 'days')
          .format('YYYY-MM-DD')
      )
    );
  };

  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <MainWrapper>
            {spinner ? (
              <div className='buffer-box border border-secondary '>
                <div className='buffer-textbox'>
                  <Skeleton />
                </div>
              </div>
            ) : scheduledPosts.length > 0 ? (
              scheduledPosts.map(post => {
                return (
                  <div className='buffer-box border border-secondary'>
                    <div className='buffer-textbox'>{post.description}</div>
                    <div className='bottom-row'>
                      <div className='row align-items-center'>
                        <div className='col-lg-7'>
                          <div className='left-col'>
                            <ClockCircleOutlined />
                            This post created at {post.created_at} .
                          </div>
                        </div>
                        <div className='col-lg-5'>
                          <div className='btn-col'>
                            <div className='d-flex'>
                              <button
                                onClick={() => delete_post(post.id)}
                                className='btn'
                              >
                                Delete
                              </button>
                              <button
                                onClick={() =>
                                  editPost(
                                    post.id,
                                    post.description,
                                    post.created_at,
                                    post.media.length > 0 ? post.media : []
                                  )
                                }
                                className='btn btn-outline-secondary'
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  shareNow(post.id, post.description)
                                }
                                className='btn share-btn btn-primary'
                              >
                                Share Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </MainWrapper>
        </Col>
      </Row>
    </Fragment>
  );
}

export default withRouter(DraftPosts);

const MainWrapper = styled.div`
  .border-secondary {
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    margin-bottom: 20px;
    border-radius: 3px;
    font-size: 12.4px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
    white-space: pre-wrap;
  }
  .buffer-textbox {
    padding: 10px;
  }
  .bottom-row {
    padding: 10px;
    .left-col {
      display: flex;
    }
    .btn {
      font-size: 14px;
      border: 0;
      margin: 0 5px;
      padding: 5px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.4);
      background: transparent;
      &:focus {
        box-shadow: none;
      }
    }
    .share-btn {
      color: #2c4bff;
    }
    .d-flex {
      justify-content: flex-end;
    }
    .anticon {
      color: rgb(44, 75, 255);
      padding: 5px 5px 5px 0;
    }
  }

  @media (max-width: 991px) {
    .bottom-row {
      .d-flex {
        justify-content: flex-start;
        margin-top: 5px;
      }
    }
  }
`;
