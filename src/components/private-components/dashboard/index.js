import React from 'react';
import styled from 'styled-components';
import SchedulePost from './queue';
import PublishedPosts from './published';
import DraftPosts from './drafts';
import SettingsPosts from './settings';
import { Tabs } from 'antd';
import GPLayout from '../../template-parts/GPLayout';

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
function Dashboard() {
  //let { url } = useRouteMatch();

  return (
    <GPLayout>
      <MainTabWrapper>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Queue" key="1">
            <div className="tabcontent-width">
              <SchedulePost />
            </div>

          </TabPane>
          <TabPane tab="Published" key="2">
            <div className="tabcontent-width">
              <PublishedPosts />
            </div>
          </TabPane>
          <TabPane tab="Drafts" key="3">
            <div className="tabcontent-width">
              <DraftPosts />
            </div>
          </TabPane>
          <TabPane tab="Settings" key="4">
            <div className="container cont-height">
              <div className="tabcontent-width">
                <SettingsPosts />
              </div>
            </div>
          </TabPane>
        </Tabs>
      </MainTabWrapper>

    </GPLayout>
  );
}

export default Dashboard;

const MainTabWrapper = styled.div`
.ant-tabs-nav .ant-tabs-tab{
  padding:12px 16px;
  &:hover{
      color: #2c4bff;
  }
}
.ant-tabs-ink-bar{
  background-color:#2c4bff;
}
.ant-tabs-nav .ant-tabs-tab-active {
    color: #2c4bff;
  }
  .ant-tabs-tabpane{
    padding:20px 0;
    overflow-y: auto;
    height: calc(100vh - 140px);
    
    .cont-height{
      max-height: 80vh;
    overflow-y: auto;
    }
  }
  .tabcontent-width{
      width:87%;
    }
  @media(max-width:767px){
    .ant-tabs-tabpane{
    height: calc(100vh - 305px);}
    .tabcontent-width{
      width:100%;padding:0 5px;
    }
  }
`;
