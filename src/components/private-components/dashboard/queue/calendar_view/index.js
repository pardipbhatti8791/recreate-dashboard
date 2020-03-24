import React, { Component } from 'react';
import { Row, Col, Divider } from 'antd';

import PostModal from '../schedule_post/ModalView';
import Calendar from './Calendar';
import GPLayout from '../../../../template-parts/GPLayout';

class CalendarView extends Component {
  render() {
    return (
      <GPLayout>
        <Row>
          <Col span={22}>
            <PostModal />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={22}>
            <Calendar />
          </Col>
        </Row>
      </GPLayout>
    );
  }
}
export default CalendarView;
