import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Skeleton, Empty } from 'antd';
import moment from 'moment';
import { ClockCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export default function PublishedPosts() {
  const scheduledPosts = useSelector(
    state => state.schedule_posts.scheduled_draft_posts.published
  );
  const spinner = useSelector(state => state.schedule_posts.spinner);
  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <MainWrapper>
            {spinner ? (
              <div className='buffer-box border border-secondary'>
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
                        <div className='col-md-12'>
                          <div
                            className='left-col'
                          >
                            <ClockCircleOutlined />
                            This post will be sent{' '}
                            {moment(post.scheduled_at).format(
                              'MMMM Do'
                            )} at {moment(post.scheduled_at).format('hh:mm A')}
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

const MainWrapper = styled.div`
  .border-secondary {
      border: 1px solid rgba(0,0,0,.1) !important;
      margin-bottom: 20px;
      border-radius: 3px;
      font-size: 12.4px;
    font-weight: 400;
    color: rgba(0,0,0,.4);
    white-space: pre-wrap;
  }
.buffer-textbox{
  padding:10px;
}
.bottom-row{
  padding:10px;
  .anticon{
        color: rgb(44, 75, 255);
        padding:5px 5px 5px 0;
  }
}
.left-col{
  display:flex;
}  
`;
