import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Week,
  Month,
  Inject,
  Resize
} from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import moment from 'moment-timezone';

import { SampleBase } from './sample-base';
import { connect } from 'react-redux';
import {
  openModal,
  actionModalCalendar,
  actionModalNewOrEdit
} from '../../../../../redux/modal/actions';
import {
  setNewPost,
  setNewPostDescription
} from '../../../../../redux/schedule_posts/actions';
import { setMultipleFileList } from '../../../../../redux/post_media/actions';

/**
 * Schedule Default sample
 */
class Calendar extends SampleBase {
  /**
   * * @ handling edit event
   * @param {*} args
   */
  handleEdit(args) {
    const {
      openModal,
      setNewPost,
      new_post,
      setNewPostDescription,
      actionModalCalendar,
      actionModalNewOrEdit,
      selected_account,
      setMultipleFileList
    } = this.props;
    actionModalCalendar(true);
    actionModalNewOrEdit(true);
    openModal(true);
    const updatedPost = { ...new_post };
    updatedPost.social_accounts = [
      ...updatedPost.social_accounts,
      selected_account
    ];
    updatedPost.description = args.data.Subject;
    updatedPost.status = 'scheduled';
    updatedPost.media =
      args.data.media !== null && args.data.media.length > 0
        ? args.data.media
        : [];
    updatedPost.scheduled_at = moment(args.data.StartTime)
      .tz('GMT')
      .format();
    updatedPost.post_id = args.data.Id;
    setMultipleFileList({});
    args.data.media !== null &&
      args.data.media.length > 0 &&
      args.data.media.forEach((value, index) => {
        let newMedia = {
          uid: index,
          url: value,
          name: value,
          local: true
        };
        setMultipleFileList(newMedia);
      });

    /**
     * * @setting description
     */
    setNewPostDescription(args.data.Subject);
    setNewPost(updatedPost);
  }

  /**
   * * @handling new event
   */
  handleNewPost = e => {
    const {
      setNewPost,
      new_post,
      actionModalCalendar,
      actionModalNewOrEdit,
      selected_account
    } = this.props;
    actionModalCalendar(true);
    actionModalNewOrEdit(false);
    const updatedPost = { ...new_post };
    updatedPost.social_accounts = [
      ...updatedPost.social_accounts,
      selected_account
    ];

    updatedPost.scheduled_at = moment(e.data.startTime)
      .tz('GMT')
      .startOf('day')
      .format();
    setNewPost(updatedPost);
  };

  render() {
    const { calendar_data, openModal } = this.props;

    return (
      <div className='schedule-control-section'>
        <div className='control-section'>
          <div className='control-wrapper'>
            <div className='text-right mb-4'>
              <Link to='/dashboard/queue' className='btn btn-primary'>
                <i className='fas fa-hand-point-left'></i>
                &nbsp; Day View
              </Link>
            </div>

            <ScheduleComponent
              height='650px'
              ref={schedule => (this.scheduleObj = schedule)}
              selectedDate={moment().format()}
              eventSettings={{
                dataSource: extend([], calendar_data, null, true)
              }}
              popupOpen={e => {
                if (e.type === 'QuickInfo' && !e.data.hasOwnProperty('Id')) {
                  this.handleNewPost(e);
                  openModal(true);
                }

                if (e.type === 'Editor') {
                  this.handleEdit(e);
                  e.cancel = true;
                  openModal(true);
                }

                if (
                  !e.data.hasOwnProperty('Id') &&
                  e.type !== 'EventContainer'
                ) {
                  openModal(true);
                  e.cancel = true;
                }
              }}
            >
              <ViewsDirective>
                <ViewDirective option='Week' />
                <ViewDirective option='Month' />
              </ViewsDirective>
              <Inject services={[Week, Month, Resize]} />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      calendar_data: state.schedule_posts.calendar_data,
      new_post: state.schedule_posts.new_post,
      selected_account: state.social_accounts.selectedAccount
    };
  },
  {
    openModal,
    setNewPost,
    setNewPostDescription,
    setMultipleFileList,
    actionModalCalendar,
    actionModalNewOrEdit
  }
)(Calendar);
