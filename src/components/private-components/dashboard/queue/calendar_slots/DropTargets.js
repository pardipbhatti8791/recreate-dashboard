import React from 'react';
import { useDrop } from 'react-dnd';
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  InstagramOutlined
} from '@ant-design/icons';
import moment from 'moment';

const DropTargetCard = ({
  accept,
  onDrop,
  time,
  scheduleQueued,
  fullDate,
  social_account_type
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const isActive = isOver && canDrop;

  const selectedSocialAccountType = () => {
    switch (social_account_type) {
      case 'facebook':
        return <FacebookOutlined />;
      case 'linkedin':
        return <LinkedinOutlined />;
      case 'twitter':
        return <TwitterOutlined />;
      case 'instagram':
        return <InstagramOutlined />;
      default:
        return <FacebookOutlined />;
    }
  };

  return (
    <li
      style={isActive ? { borderColor: '#1a3bf9' } : {}}
      ref={drop}
      onClick={() => scheduleQueued(time, fullDate)}
    >
      <div className='time-box'>
        {moment(time.split(':'), 'hh:mm A').format('hh:mm A')}
      </div>
      <div className='schedule-post'>
        {selectedSocialAccountType()} Schedule a Post
      </div>
    </li>
  );
};

export default DropTargetCard;
