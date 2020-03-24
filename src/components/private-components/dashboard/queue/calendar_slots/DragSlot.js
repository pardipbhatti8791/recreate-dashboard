import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment-timezone';

/**
 * * @Item Type
 */
import { CARD } from '../../../../../utils/ItemTypes';

/**
 * * @custom actions
 */
import { swapPost } from '../../../../../redux/create_post/action';

/**
 * * @style for task
 */
const style = {
  cursor: 'move'
};

const Box = ({
  name,
  isDropped,
  id,
  scheduled_at,
  description,
  timezone,
  slots_data,
  delete_post,
  shareNow,
  editPost,
  media,
  accept,
  dispatch,
  social_account_id,
  start_date,
  end_date
}) => {
  const ref = useRef(null);

  /**
   * * @Swapping value
   * @param {*} index
   * @param {*} item
   */
  const onDrop = (index, item) => {
    if (index !== item.id) {
      let swapData = `post1=${index}&post2=${item.id}`;
      dispatch(swapPost(swapData, social_account_id, start_date, end_date));
    }
  };

  /**
   * * @dragHook
   */
  const [{ opacity, background }, drag] = useDrag({
    item: { id, description, media, type: CARD },
    collect: monitor => {
      return {
        opacity: monitor.isDragging() ? 0.1 : 1,
        background: monitor.isDragging() ? 'grey' : 'white'
      };
    }
  });

  /**
   * * @dropHook
   */
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: item => onDrop(id, item),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const isActive = isOver && canDrop;
  drag(drop(ref));

  return (
    <li
      ref={ref}
      style={{ ...style, opacity, background }}
      key={slots_data}
      className={`buffer-box border border-secondary rounded ${
        isActive ? 'dragedBColor' : ''
      }`}
    >
      <div className='buffer-textbox'>{description}</div>
      <div className='bottom-row'>
        <div className='row align-items-center'>
          <div className='col-lg-7'>
            <div className='left-col'>
              <ClockCircleOutlined /> This post will be sent{' '}
              {moment(scheduled_at)
                .tz(timezone !== null ? timezone : 'GMT')
                .format('MMMM Do YYYY, h:mm a')}{' '}
              ({timezone})
            </div>
          </div>
          <div className='col-lg-5'>
            <div className='btn-col'>
              <div className='d-flex'>
                {isDropped ? <s>{name}</s> : name}
                <button onClick={() => delete_post(id)} className='btn'>
                  Delete
                </button>
                <button
                  className='btn btn-outline-secondary'
                  onClick={() =>
                    editPost(
                      id,
                      description,
                      scheduled_at,
                      media !== null ? media : []
                    )
                  }
                >
                  Edit
                </button>
                <button
                  className='btn share-btn  btn-primary'
                  onClick={() => shareNow(id, description)}
                >
                  Share Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default Box;
