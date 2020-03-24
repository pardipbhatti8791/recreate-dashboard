import React, { Fragment } from 'react';
import styled from 'styled-components';
import MainHeader from './header';
import SideBar from './sidebar';
import SideBarAccounts from './sidebar_accounts';

class GPLayout extends React.Component {
  render() {
    const { sideBar = false } = this.props;
    return (
      <Fragment>
        <MainHeader />
        <MainWrapper>
          {!sideBar ? <SideBar /> : <SideBarAccounts />}

          <MainContent>{this.props.children}</MainContent>
        </MainWrapper>
      </Fragment>
    );
  }
}

export default GPLayout;

const MainWrapper = styled.div`
  padding-top: 59px;
  display: flex;
  background: rgb(241, 243, 246);
  padding-right: 7.5%;
  @media (max-width: 991px) {
    padding-right: 0;
  }
  @media (max-width:767px) {
    display:block;
  }
`;
const MainContent = styled.div`
  width: calc(100% - 17%);
  background: #fff;
  padding: 10px 25px;
   @media (max-width: 991px) {
    width: calc(100% - 33%);
  }
  @media (max-width: 767px) {
    width: 100%;
    padding:10px 20px;
  }
`;
