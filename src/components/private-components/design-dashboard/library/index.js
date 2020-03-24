import React, { useEffect, useState } from 'react';
import { getProjects } from '../../../../redux/projects/action';
import { getFiles } from '../../../../redux/files/action';
import { useSelector, useDispatch } from 'react-redux';
import { DesignStyleWrapper } from './library-style';
import { Typography, Button , Row, Col,Tabs, Spin }  from 'antd';
import { LeftOutlined, HeartFilled, UploadOutlined, DeleteFilled } from '@ant-design/icons';
import DesignLayout from '../../../template-parts/DesignLayout';
import MediaCard from '../../shared-components/media-card';
import { getUrlVars } from '../../../../utils/common_functions';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from 'react-router-dom';

const { Text } = Typography;
const { TabPane } = Tabs;

  const responsiveWidth  = () => {
    let windowWidth = window.innerWidth;
    if(windowWidth > 1416){ // xxl
        return "20%"
    }else if(windowWidth < 1416 && windowWidth > 1100){ // xl
        return "25%"
    }else if(windowWidth < 1100 && windowWidth > 900){ // md
        return "33%"
    }else if(windowWidth < 900 && windowWidth > 500){ // sm
        return "50%"
    }else if(windowWidth < 500){ // xsm
        return "100%"
    }
  }
  
function Create() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ activeKey, setActiveKey ] = useState('1');
    const projects = useSelector(state => state.projects.projectData);
    const projectSpinner = useSelector(state => state.projects.projectSpinner);
    // const projectsError = useSelector(state => state.projects.projectsError);
    const projectLoadMoreSpinner = useSelector(state => state.projects.projectLoadMoreSpinner);

    const files = useSelector(state => state.files.filesData);
    const filesSpinner = useSelector(state => state.files.filesSpinner);
    // const filesError = useSelector(state => state.files.filesError);
    const fileLoadMoreSpinner = useSelector(state => state.files.fileLoadMoreSpinner);
    
    const colStyles = {
      flexBasis: "19%",
      width: responsiveWidth(),
      float: 'left',
      padding: 20
    };

    const  getMoreData = (e) => {
      if (!projectLoadMoreSpinner && !fileLoadMoreSpinner && !projectSpinner && projects.next &&
          e.target.scrollTop + e.target.clientHeight >=
          e.target.scrollHeight
      ) {
          if(activeKey === '1'){
              const page = getUrlVars(projects.next).page;
              dispatch(getProjects({page}));
          }else if (activeKey === '3'){
              const page = getUrlVars(files.next).page;
              dispatch(getFiles({page}));
          }
      }
    }
    useEffect (() => {
        dispatch(getProjects({}));
        dispatch(getFiles({}));
    }, [dispatch]);

    useEffect (() => {
        let element = document.getElementById('scrollable-container');
        element.addEventListener("scroll", getMoreData);
        return () => element.removeEventListener('scroll', getMoreData)
    });

    return(
      <DesignLayout>
        <DesignStyleWrapper>
              <div className="isoDesignContentWrapper">
                  <div className="header-nav-link" >
                    <Button onClick={history.goBack} style={{ marginRight: 16 }}><LeftOutlined /><Text>Back</Text></Button> <Text className="titleText">My Library</Text>
                  </div>
                  <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={setActiveKey}>
                      <TabPane tab="All Designs" key="1">
                          {projectSpinner ?
                              <center><Spin size="large" /></center> : 
                              <React.Fragment>
                                <Row> 
                                  {projects && projects.results.map(project =>
                                  <Col style={colStyles}>
                                      {/* <a href={ project.type === 'image'? `${APPCONSTANTS.IMAGE_APP_URI}${project.id}?token=${TOKEN}` : `${APPCONSTANTS.VIDEO_APP_URI}${project.id}?token=${TOKEN}`}> */}
                                      <MediaCard
                                          title={project.title}
                                          description={project.description}
                                          playIcon={project.type === 'video'}
                                      />
                                      {/* </a> */}
                                  </Col>
                                  )}
                              </Row>
                               {projectLoadMoreSpinner ? <center><Spin /></center>  : null}
                              </React.Fragment>
                              
                          } 
                      </TabPane>
                      <TabPane tab={<div className="icon-tabs"><HeartFilled/> Likes</div>} key="2">
                          Content of Tab Pane 2
                      </TabPane>
                      <TabPane tab={<div className="icon-tabs"><UploadOutlined /> Uploads</div>} key="3">
                      {filesSpinner ?
                              <Spin size="large" /> : 
                              (<React.Fragment>
                                  <Row> 
                                  {files && files.results.map(project =>
                                  <Col style={colStyles}>
                                      <MediaCard
                                          title={project.title}
                                                description={project.description}
                                                playIcon={project.description === 'video/mp4'}
                                                thumbnail={project.file_url}
                                            />
                                        </Col>
                                        )}
                                    </Row>
                                  {fileLoadMoreSpinner ? <center><Spin /></center>  : null}
                                  </React.Fragment>)
                          } 
                      </TabPane>
                      <TabPane tab={<div className="icon-tabs"><DeleteFilled /> Trash</div>} key="4">
                          Content of Tab Pane 3
                      </TabPane>
                  </Tabs>
              </div>
            </DesignStyleWrapper>
      </DesignLayout>
    )
    
}

export default Create;
