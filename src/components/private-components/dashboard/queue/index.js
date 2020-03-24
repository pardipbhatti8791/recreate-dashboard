import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';

import PostModal from './schedule_post/ModalView';
import NewSlots from './calendar_slots/NewSlot';

class SchedulePost extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Col>
            <PostModal />
          </Col>
        </Row>

        <Row>
          <Col>
            <NewSlots />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default SchedulePost;
