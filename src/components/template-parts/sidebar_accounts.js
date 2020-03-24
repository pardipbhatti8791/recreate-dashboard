import React from 'react';
import { ReactComponent as MenuIcon } from '../../images/social-acc-icon.svg';
import styled from 'styled-components';

function SideBarAccounts() {
  return (
    <SidebarWrapper>
      <div className='leftMenuContainer'>
        <div className='wrapper-left'>
          <div class='col-left-head-div'>
            <p class='col-left-head-typo-1'> Small Business Plan </p>{' '}
            <p> Pyxis media </p>{' '}
          </div>
          <div class='left-tabs left-tabs-active'>
            <MenuIcon className='left-tabs-icon left-tabs-active-icon' />
            <h2 class='widget-title'> Social Accounts </h2>{' '}
          </div>
        </div>
      </div>
    </SidebarWrapper>
  );
}

export default SideBarAccounts;

const SidebarWrapper = styled.div`
  width: 17%;
  position: relative;
  background: #fcfcfc;
  height: calc(100vh - 60px);
  
  .leftMenuContainer {
    height: 80%;
    overflow-y: auto;
    position: relative;
    margin-bottom: 50px;
    border-right: 1px solid rgb(230, 235, 239);
    padding: 1rem;
  }
  h2.widget-title {
    font-size: 18px;
    font-weight: 400;
  }
  .col-left-head-div {
    padding: 10px 20px;
    border-bottom: 1px solid #f0f0f0;
    color: rgb(119, 119, 119);
    font-weight: 300;
    font-size: 16px;
    p {
      margin: 0;
    }
  }
  .col-left-head-typo-1 {
    font-size: 16px;
    color: rgb(119, 119, 119);
  }
  .left-tabs {
    display: flex;
    align-items: center;
    padding: 10px 20px;
  }
  .left-tabs-active {
    border-right: 3px solid #2b7abf;
  }
  .left-tabs-active-icon path {
    fill: #2b7abf;
  }
  .left-tabs-active-icon circle {
    fill: #2b7abf !important;
  }
  .left-tabs-icon {
    width: 20px;
    height: 20px;
    margin-right: 15px;
  }
  .leftMenuContainer .inputGroup {
    position: relative;
    font-size: 14px;
    margin-bottom: 20px;
    input {
      height: 32px;
      border: solid 1px #d9d9d9;
      border-radius: 4px;
      padding-left: 30px;
      position: relative;
      width: 100%;
      outline: none;
      background: #fff;
      color: rgba(0, 0, 0, 0.65);
      &:placeholder {
        color: #fff;
      }
    }
    .iconSearch {
      position: absolute;
      left: 10px;
      top: 0px;
      bottom: 0;
      line-height: 32px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .list-group {
    margin:0;padding:0;
    li {
      list-style: none;
      padding: 0;
      margin: 0 0 11px;
      .cion {
        display: flex;
        align-items: center;
        color: rgba(0, 0, 0, 0.65);
        padding: 8px 12px;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        border-radius: 4px;
        cursor: pointer;
        .spanImg {
          position: relative;
          height: 34px;
        }
        .ant-avatar-lg {
          width: 34px;
          height: 34px;
        }
        .social-icon {
          width: 25px;
          height: 25px;
          margin-left: 10px;
          bottom: -5px;
          right: -18px;
          position: absolute;
          border-radius: 5px;
          margin-right: 10px;
          border-width: 1px;
          border-style: dashed;
          border-color: rgb(168, 170, 189);
          padding: 5px;
          z-index: 1;
        }
        .spanName {
          margin-left: 10px;
          white-space: normal;
          width: calc(100% - 40px);
          vertical-align: middle;
        }
        &:hover {
          background: rgba(0, 0, 0, 0.15);
        }
      }
      .active {
        background: #2c4bff;
        color: #fff;

        &:hover {
          background: #2c4bff;
          color: #fff;
        }
      }
    }
  }

  .manage-account-btn {
    position: fixed;
    bottom: 0;
    padding-top: 16px;
    background: #fcfcfc;
    border-top: 1px solid #e6ebef;
    z-index: 11;
    width: calc(15.5% - 2rem);
    margin: 0 1rem 40px;

    button {
      width: 100%;
      background: #fff;
      outline: none;
      overflow: hidden;
      text-overflow: ellipsis;
      border: solid 1px #b8b8b8;
      padding: 13.15px 12px;
      font-weight: 500;
      color: #777;
      cursor: pointer;
      border-radius: 4px;
      white-space: nowrap;
      &:hover {
        color: #2c4bff;
        border-color: #2c4bff;
      }
    }
  }
  @media (max-width: 991px) {
    width: 33%;
    .manage-account-btn{
      width:calc(32.5% - 2rem)
    }
  }
  @media (max-width: 767px) {
   width:100%;height:auto;
   .leftMenuContainer{
      margin: 0;
    height: auto;
    padding: 20px 20px 0;
     .list-group{
      display:none;
    }
   }
    .manage-account-btn{
      position: static;
      padding: 20px;
      width: 100%;
      margin: 0;
    }
  }
`;
