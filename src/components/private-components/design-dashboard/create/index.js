import React, { useEffect, useState } from 'react';
import { getTemplates } from '../../../../redux/templates/action';
import { useSelector, useDispatch } from 'react-redux';
import { DesignStyleWrapper } from './create-style';
import { Typography, Divider ,Input ,Select ,Tabs, Spin }  from 'antd';
import { getCategories } from '../../../../redux/elements/action';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import PlayIcon from '../../../../images/play.svg';
import Slider from "react-slick";
import { createProject } from '../../../../redux/projects/action';
import DesignLayout from '../../../template-parts/DesignLayout';
import { editorPaths } from '../../../../utils/editorPaths';
import GridTab from './grid-tab-view'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const TOKEN = localStorage.getItem("id_token");


const SlickButtonFix = ({currentSlide, slideCount, children, ...props}) => (
    <span {...props}>{children}</span>
);

const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    draggable: true,
    // swipeToSlide: false,
    prevArrow: <SlickButtonFix><LeftOutlined /></SlickButtonFix>,
    nextArrow: <SlickButtonFix><RightOutlined /></SlickButtonFix>,
    responsive: [
        {
            breakpoint: 1600,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 3
            }
          },
        {
            breakpoint: 1250,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 3
            }
          },
        {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 750,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 520,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
    ]
  };
function Create() {
    const dispatch = useDispatch();
    const [ activeKey, setActiveKey ] = useState('1');
    const [ selectedCategory, setSelectedCategory ] = useState('');
    useEffect (() => {
        dispatch(getTemplates());
        dispatch(getCategories());
    }, [dispatch]);
    const smbText = (text) => <Text ellipsis style={{width: 150}} className="iconText">{text}</Text>;
    const categories = useSelector(state=> state.elements.categories);
    const createProjectData = useSelector(state=> state.projects.createProjectData);
    // const categoriesSpinner = useSelector(state=> state.elements.categoriesSpinner);
    // const categoriesError = useSelector(state=> state.elements.categoriesError);
    useEffect(()=> {
        if (createProjectData) {
            const { type, id } = createProjectData;
            window.location.assign(`${type === "image" ? editorPaths.image 
            : editorPaths.video
              }${id}?token=${TOKEN}`
            );
          }
    },[createProjectData])
    const createNewProject = (type, templateId) => {
        dispatch(createProject({
          title: "My project",
          description: "This is description of project",
          type: type,
          template_id: templateId,
          width: 100,
          height: 100
        }));
      };
    const _getTemplates = (type, templateData) => {
        const templates = {
            images: [],
            videos: []
        }
        templateData && templateData.results.forEach((template, index) => {
            if(template.thumbnail !==""){
                if(template.type === 'image')
                templates.images.push(
                    <div onClick={() => createNewProject(template.type, template.id)} key={template.thumbnail + index} className="boxConatiner">
                        <div className="isoDesignVideoBox" style={{background: `url(${template.thumbnail.replace('upload/', 'upload/q_auto:low/')})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                        </div>
                        {smbText(template.title)}
                    </div>
                );
            else
                templates.videos.push(<div onClick={() => createNewProject(template.type, template.id)} key={template.thumbnail + index} className="boxConatiner">
                        <div className="isoDesignVideoBox" style={{background: `url(${template.thumbnail.replace('upload/', 'upload/q_auto:low/')})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                            <img src={PlayIcon} width="40" alt="play" /> 
                        </div>
                        {smbText(template.title)}
                    </div>);
            }
        });
        if(templateData && !templateData.results.length){
            return(<div>No data for the selected category</div>)
        }
        if(type === 'images'){
            return (<>
                {templates.images.length ? <GridTab banners={templates.images} /> : <Text>No Banner templates</Text>}
                </>);
        }
        if(type === 'videos'){
            return (<>
                {templates.videos.length ? <GridTab banners={templates.videos} /> : <Text>No Video templates</Text>}
                </>)
        }
        return (
            <>
                <div style={{display: 'flex' ,justifyContent:"space-between"}}>
                <Text className="titleText">Popular Banners</Text>
                <Text className="seeAllText" onClick={()=>setActiveKey("2")}>See all</Text>
                </div>
                    {templates.images.length ? <Slider {...settings}>{templates.images}</Slider> : <Text>No Banner templates</Text>}
                
                    <Divider />
                    <div style={{display: 'flex',justifyContent:"space-between"}}>
                    <Text className="titleText">Popular Videos</Text>
                    <Text className="seeAllText" onClick={()=> setActiveKey("3")}>See all</Text>
                    </div>
                    {templates.videos.length ? <Slider {...settings}>{templates.videos}</Slider> : <Text>No Video templates</Text>}
                   
            </>)
    }

    const handleCategoryChange = (value) => {
        if(value !== ''){
            dispatch(getTemplates({ category: value }));
        }else{
            dispatch(getTemplates());
        }
        setSelectedCategory(value);
    }
    
    const operations  = () => (<>
        <Text>Category:</Text>
        {categories  && <Select value={selectedCategory} style={{ width: 200, marginLeft:10,marginRight:20}} onChange={handleCategoryChange}>
            <Option value="">Select Category...</Option>
            {categories.map((catogory) =>
                <Option key={catogory.id} value={catogory.id}>{catogory.name}</Option>
            )}
            </Select>
        }
        </>
    )

    const handleSearch = (value) => {
        if(value !== '' && selectedCategory !== ''){
            dispatch(getTemplates({ category: selectedCategory, search: value }));
        } else if(value !== ''){
            dispatch(getTemplates({search: value }));
        }
    }

    const isLoadingData = useSelector(state=> state.templates.templatesSpinner);
    const templateData = useSelector(state=> state.templates.data);
    return (
        <DesignLayout sideBar={true}>
            <DesignStyleWrapper >
                <div className="isoDesignJumbotronWrapper">
                <div className="searchbar-container">
                <Text className="isoJumbotronTitile">Create.Animate.Publish</Text>
                <br/>
                <Text className="isoJumbotronSubTitile">Create.Animate.Publish</Text>
                <br/>
                <Input.Group compact style={{marginTop:20}}>
                <Select defaultValue="Option1">
                    <Option value="Option1">All Sources</Option>
                    <Option value="Option2">Video</Option>
                    <Option value="Option2">Banner</Option>
                </Select>
                <Search
                    placeholder="Search for what are you looking for"
                    onSearch={handleSearch}
                    className="main-search-input"
                />
                </Input.Group>
                </div>
                </div>
                <div style={{textAlign:'center'}}>
                    <Tabs
                        defaultActiveKey="1"
                        activeKey={activeKey} 
                        onChange={setActiveKey} 
                        tabBarExtraContent={operations()}
                    >
    
                    <TabPane tab="Popular" key="1">
                        <div className="isoDesignContentWrapper">
                            {isLoadingData ? <Spin /> : _getTemplates(null, templateData)}
                        </div>
                    </TabPane>
    
                    <TabPane tab="Banner" key="2">
                    <div className="isoDesignContentWrapper">{_getTemplates('images', templateData)}</div>
                    </TabPane>
    
                    <TabPane tab="Video" key="3">
                    <div className="isoDesignContentWrapper">{_getTemplates('videos', templateData)}</div>
                    </TabPane>
                    {/* <TabPane tab="Ready to share templates" key="4">
                    Content of Tab Pane 4
                    </TabPane>
                    <TabPane tab="Recent Templates" key="5">
                    Content of Tab Pane 5
                    </TabPane> */}
                    {/* <Text>Category</Text> */}
                </Tabs>
            </div>
            </DesignStyleWrapper>
        </DesignLayout>
    );
}

export default Create;
