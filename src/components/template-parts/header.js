import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProject } from '../../redux/projects/action';
import { editorPaths } from '../../utils/editorPaths';
import { Menu, Dropdown, Drawer } from 'antd';
import {
  ArrowUpOutlined,
  EditFilled,
  AlignLeftOutlined,
  DownOutlined,
  MenuOutlined,
  QuestionCircleFilled
} from '@ant-design/icons';
import './App.css';

const TOKEN = localStorage.getItem("id_token");

const menuProfile = (
  <Menu>
    <Menu.Item key='0'>
      <Link to='/profile'>Profile</Link>
    </Menu.Item>
    <Menu.Item key='1'>
      <a
        onClick={() => {
          localStorage.removeItem('id_token');
          window.location.href = '/';
        }}
        href='#n'
      >
        Logout
      </a>
    </Menu.Item>
  </Menu>
);

class MainHeader extends Component {

  state = { DrawerVisible: false };

  createNewProject = (type, templateId) => {
    const { createProject } = this.props;
    createProject({
      title: "My project",
      description: "This is description of project",
      type: type,
      template_id: templateId,
      width: 100,
      height: 100
    });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.createProjectData) {
      const { type, id } = nextProps.createProjectData;
      window.location.assign(`${type === "image" ? editorPaths.image 
      : editorPaths.video
        }${id}?token=${TOKEN}`
      );
    }
  }

  showDrawer = () => {
    this.setState({
      DrawerVisible: true,
    });
  };

  onClose = () => {
    this.setState({
      DrawerVisible: false,
    });
  };

  render() {
    const menuCreate = (
      <Menu>
        <Menu.Item onClick={() => this.createNewProject("image", 1006)}>
          Image Editor
        </Menu.Item>
        <Menu.Item onClick={() => this.createNewProject("video", 1007)}>
          Video Editor
        </Menu.Item>
      </Menu>
    );
    return (
      <SectionHeader>
        <div className='headerLeft'>
          <MenuGroup>
            <Logo src='/images/logo.png' />
            <Link to='/' className='active'>
              <ArrowUpOutlined /> Published
            </Link>
            <Dropdown overlay={menuCreate}>
              <Link
                to='/design-dashboard'
                className='ant-dropdown-link'
              >
                <EditFilled /> Create <DownOutlined />
              </Link>
            </Dropdown>
            <Link to='/'>
              <AlignLeftOutlined /> Analyze
            </Link>
          </MenuGroup>
        </div>
        <div className='headerRight'>
          <Dropdown overlay={menuProfile} trigger={['click']}>
            <div
              className='ant-dropdown-link'
              onClick={e => e.preventDefault()}
            >
              <div className='useremail'>{localStorage.getItem('email')}</div>
              <div className='profileimg'>
                <img src='/images/profileimg.png' alt='imgg' />
              </div>
            </div>
          </Dropdown>
        </div>

        <div className='mobile-btn' onClick={this.showDrawer}>
          <MenuOutlined />
        </div>
        <Drawer
          title="Menu"
          placement="right"
          className="mobileDrawer"
          closable={true}
          onClose={this.onClose}
          visible={this.state.DrawerVisible}
        >
          <MenuGroup>
            <div className="mobile-menulist">
              <Link to='/'>
                <ArrowUpOutlined /> Published
            </Link>

              <Dropdown overlay={menuCreate} trigger={['click']}>
                <Link
                  to='/'
                  className='ant-dropdown-link'
                  onClick={e => e.preventDefault()}
                >
                  <EditFilled /> Create <DownOutlined />
                </Link>
              </Dropdown>
              <Link to='/'>
                <AlignLeftOutlined /> Analyze
            </Link>
              <Link>
                <QuestionCircleFilled /> Help
              </Link>
              <Link><div className='useremail'>{localStorage.getItem('email')}</div></Link>

            </div>
          </MenuGroup>
        </Drawer>
      </SectionHeader>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createProject: data => dispatch(createProject(data))
});

const mapStateToProps = state => ({
    createProjectData: state.projects.createProjectData
});

export default connect(mapStateToProps,mapDispatchToProps)(MainHeader);

const SectionHeader = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 0 20px;
  line-height: 1;
  display: flex;
  justify-content: space-between;
height:60px;
  .mobile-btn {
    display: none;
    position: absolute;
    right: 15px;
    top: 20px;
    font-size: 1.2rem;
    color: rgb(50, 51, 50);
  }
  .headerRight {
    .ant-dropdown-link {
      display: flex;
      align-items: center;
      height: 59px;
      cursor: pointer;
    }
    .useremail {
      margin-right: 30px;
      font-size: 12px;
    }
    .profileimg {
      width: 40px;
      height: 40px;
      background-color: rgb(251, 251, 251);
      border-radius: 50%;
      img {
        max-width: 100%;
      }
    }
  }
  @media (max-width: 767px) {
    .mobile-btn {
      display: block;
    }
    .headerLeft, .headerRight{
      display:none;
    }
  }
`;

const Logo = styled.img`
  width: 25px;
  margin: 17px 20px 17px 0;
`;

const MenuGroup = styled.div`
  width: 100%;
  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.5);
    padding: 21px 20px 22px;
    font-size: 14px;
    font-weight: 400;
    .anticon-arrow-up {
      transform: rotate(45deg);
    }
  }
  a:hover,
  .active {
    background: rgb(240, 240, 240);
    color: rgba(0, 0, 0, 0.5);
  }
  .mobile-menulist{
    a{
      display:block;padding:15px 0;
      .anticon{
        padding-right:5px;
      }
      .anticon-down{
          float: right;
          padding-top: 6px;
          font-weight: 700;
          font-size: 12px;
      }
      &:hover{
        background:transparent;
      }
    }
    .useremail {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
  }

`;


