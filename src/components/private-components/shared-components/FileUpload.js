import React, { useState } from 'react';
import { Upload } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';

/**
 * * @custom actions
 */
import { uploadMedia, setFileList } from '../../../redux/post_media/actions';
import { setNewPost } from '../../../redux/schedule_posts/actions';

function PicturesWall(props) {
  /**
   * * @React hooks
   */
  const [switchViews, set_switchViews] = useState(false);

  /**
   * @Redux hooks { useSelector, useDispatch }
   */
  const media_list = useSelector(state => state.schedule_posts.new_post);
  const fileList = useSelector(state => state.media.fileList);
  const dispatch = useDispatch();
  const updatedMedia = { ...media_list };

  /**
   * * @uploading props
   */
  const uploadProps = {
    onRemove: file => {
      updatedMedia.media.splice(updatedMedia.media.indexOf(file.url), 1);
      const filteredFileList = fileList.filter(f => f.uid !== file.uid);

      /**
       * * @updating store
       */
      dispatch(setNewPost(updatedMedia));
      dispatch(setFileList(filteredFileList));
      /**
       * * @switching back view
       */
      updatedMedia.media < 1 && set_switchViews(false);
    },
    action: file => {
      set_switchViews(true);
      var tempData = new FormData();
      tempData.append('media', file);
      dispatch(uploadMedia(tempData, fileList));
    },
    fileList,
    multiple: true,
    listType: 'picture-card'
  };

  return (
    <div className='clearfix'>
      <Upload {...uploadProps}>
        {switchViews || media_list.media.length > 0 ? (
          <div>
            <PlusOutlined />
            <div className='ant-upload-text'>Upload</div>
          </div>
        ) : (
          <div>
            <label className='custom-file-label dropzone' htmlFor='customFile'>
              Drag &amp; Drop files here or{' '}
              <span className='text-primary'>Select to upload</span>
            </label>
          </div>
        )}
      </Upload>
    </div>
  );
}

export default PicturesWall;
