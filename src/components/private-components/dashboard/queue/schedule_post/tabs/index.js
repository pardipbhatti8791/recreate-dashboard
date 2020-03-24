import React from 'react';
import { Tabs, Collapse, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';
import Slider from 'react-slick';
import {
  EllipsisOutlined,
  LikeOutlined,
  MessageOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

/**
 * * @import custom actions
 */
import { setNewPost } from '../../../../../../redux/schedule_posts/actions';
import { setFileList } from '../../../../../../redux/post_media/actions';

/**
 * Ant Components
 */
const { TabPane } = Tabs;
const { Panel } = Collapse;

export default function ModalTabs(props) {
  /**
   * Slider Setting
   */
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  /**
   * @using redux hooks
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
  const fileList = useSelector(state => state.media.fileList);

  /**
   * Add Media from My Media
   * @param {*} media
   */
  const addMedia = async media => {
    const updateNewPost = { ...newPostState };

    let newMedia = {
      uid: media.id,
      url: media.media,
      name: media.name,
      local: true
    };
    updateNewPost.media = [...updateNewPost.media, media.media];
    const newFileList = [...fileList, newMedia];
    dispatch(setFileList(newFileList));
    dispatch(setNewPost(updateNewPost));
  };

  return (
    <Tabs defaultActiveKey='1' role='tablist' className='main-tabs'>
      <TabPane tab='Media Library' key='1'>
        {/* Nav tabs */}
        <div className='search-col'>
          <div className='searchtext'>
            <input
              type='search'
              placeholder='input search text'
              className='form-control'
            />
            <button className='search-btn'>
              <SearchOutlined />
            </button>
          </div>
          <div className='hamburgericon'>
            <MenuOutlined />
          </div>
        </div>
        <Tabs defaultActiveKey='1.1' className='sub-tabs'>
          <TabPane className='nav-item' tab='New Media' key='1.1'>
            <Collapse expandIconPosition='right' bordered={false}>
              <Panel header='Video Templates' key='1'>
                <div
                  id='collapseOne'
                  className='collapse show'
                  data-parent='#accordion'
                >
                  <div className='card-body'>Test Message</div>
                </div>
              </Panel>
              <Panel header='Ready to share facts' key='2'>
                <div
                  id='collapseOne'
                  className='collapse show'
                  data-parent='#accordion'
                >
                  <div className='card-body'>Test Message</div>
                </div>
              </Panel>
              <Panel header='Banner Templates' key='3'>
                <div
                  id='collapseOne'
                  className='collapse show'
                  data-parent='#accordion'
                >
                  <div className='card-body'>Test Message</div>
                </div>
              </Panel>
              <Panel header='Stock Images' key='4'>
                <div
                  id='collapseOne'
                  className='collapse show'
                  data-parent='#accordion'
                >
                  <div className='card-body'>Test Message</div>
                </div>
              </Panel>
              <Panel header='Stock videos' key='5'>
                <div
                  id='collapseOne'
                  className='collapse show'
                  data-parent='#accordion'
                >
                  <div className='card-body'>Test Message</div>
                </div>
              </Panel>
            </Collapse>
          </TabPane>
          <TabPane tab='My Files' key='1.2'>
            <Collapse expandIconPosition='right' bordered={false}>
              <Panel header='My video Templates' key='1'>
                <Slider {...settings}>
                  {reduxStateData &&
                    reduxStateData.media &&
                    reduxStateData.media.map((media, index) => {
                      if (media.media.includes('.mp4')) {
                        return (
                          <div key={index}>
                            <Card onClick={() => addMedia(media)}>
                              <div>
                                <video height='120'>
                                  <source src={media.media} />
                                </video>
                                <span className='spanName'>{media.name}</span>
                              </div>
                            </Card>
                          </div>
                        );
                      }
                      return true;
                    })}
                </Slider>
              </Panel>
              <Panel header='My Banner Templates' key='2'>
                <Slider {...settings}>
                  {reduxStateData &&
                    reduxStateData.media &&
                    reduxStateData.media.map((media, index) => {
                      if (
                        media.media.includes('.png') ||
                        media.media.includes('.jpg')
                      ) {
                        return (
                          <div key={index}>
                            <Card onClick={() => addMedia(media)}>
                              <div>
                                <img src={media.media} height='120' alt='img' />

                                <span className='spanName'>{media.name}</span>
                              </div>
                            </Card>
                          </div>
                        );
                      }
                      return true;
                    })}
                </Slider>
              </Panel>
            </Collapse>
          </TabPane>
        </Tabs>
      </TabPane>
      <TabPane className='nav-item' tab='Post Perview' key='2'>
        <PostPreviewWrapper>
          {newPostState.social_accounts.length > 0 &&
            newPostState.social_accounts.map(socialAccount => {
              return (
                <div className='post-preview-row'>
                  <div className='single-post'>
                    <div class='headDiv d-flex'>
                      <img
                        src='/images/facebook.png'
                        class='social-icon'
                        alt='fb'
                      />
                      <p class='headTypo'>{socialAccount.provider} Page</p>
                    </div>
                    <div className='contentDiv'>
                      <div className='contentTopDiv'>
                        <span className='ant-avatar contentAvatar'>
                          <img src={socialAccount.picture_url} alt='img' />
                        </span>
                        <div class='contentTopTypoDiv'>
                          <p class='contentTopTypo1'>{socialAccount.name}</p>
                          <p class='contentTopTypo2'>{props.description}</p>

                        </div>
                        <button
                          type='button'
                          class='ant-btn moreBtn'
                          ant-click-animating-without-extra-node='false'
                        >
                          <EllipsisOutlined />
                        </button>
                      </div>
                      <div class='contentMiddleDiv'>
                        <p class='contentMiddleTypo'></p>
                        <div className='mediaDiv'>
                          {newPostState.media.length > 0 &&
                            newPostState.media.map(m => {
                              return <img className="middleImage" src={m} alt='m' />;
                            })}
                        </div>
                      </div>
                      <div className='contentBottomDiv'>
                        <div className='socialDiv'>
                          <LikeOutlined /> Like
                        </div>
                        <div className='socialDiv'>
                          <MessageOutlined /> Comment
                        </div>
                        <div className='socialDiv'>
                          <ShareAltOutlined /> Share{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </PostPreviewWrapper>
      </TabPane>
    </Tabs>
  );
}
const PostPreviewWrapper = styled.div`
  height: 339px;
  background: rgb(236, 238, 237);
  overflow-y: auto;
  padding: 25px 50px;
  .headDiv {
    margin-bottom: 20px;
    flex-wrap: wrap;
    -webkit-box-align: center;
    align-items: center;
    img {
      width: 20px;
      margin-right: 10px;
    }
    .headTypo {
      font-size: 16px;
      margin: 0;
      font-weight: 300;
    }
  }
  .contentDiv {
    margin-bottom: 40px;
    background: white;
    border-radius: 5px;
    padding: 15px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.2);
    border-image: initial;
    .contentTopDiv {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 15px;
      align-items:center;
      
    }
    .mediaDiv{
        text-align:center;
        .middleImage {
            width: 100%;
            margin-top: 8px;
            vertical-align: middle;
        }
      }
  }
  .contentAvatar {
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }
  .contentTopTypo1 {
    font-size: 16px;
    color: darkblue;
    margin: 0;
    font-weight: 400;
  }
  .contentTopTypo2 {
    font-size: 14px;
    font-weight: 300;
    margin: 0;
  }
  .moreBtn {
    margin-left: auto;
    height: fit-content;
    line-height: 1;
    font-size: 1.6rem;
    border-width: 0px;
    border-radius: 50%;
    padding: 9px 10px;
  }
  .contentMiddleDiv {
    display: flex;
    flex-wrap: wrap;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 15px;
  }
  .contentBottomDiv {
    display: flex;
    flex-wrap: wrap;
    -webkit-box-align: center;
    align-items: center;
    justify-content: space-around;
    .socialDiv {
      display: flex;
      flex-wrap: wrap;
      -webkit-box-align: center;
      align-items: center;
      font-weight: 300;
      .anticon {
        margin-right: 10px;
      }
    }
  }
`;
