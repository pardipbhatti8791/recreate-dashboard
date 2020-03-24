import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Skeleton, Avatar } from 'antd';

/**
 * * @customLayout
 */
import GPLayout from '../../../template-parts/GPLayout';
import { getSocialsAccounts } from '../../../../redux/social_accounts/action';

function Index() {
  const [filteredData, setFilteredData] = useState([]);
  /**
   * @using redux hooks
   */
  const dispatch = useDispatch();
  const reduxStateData = useSelector(state => {
    return {
      social_accounts: state.social_accounts.socialAccounts,
      social_accounts_spinner: state.social_accounts.socialAccountSpinner
    };
  });
  /**
   * @functional based component hooks
   */
  useEffect(() => {
    dispatch(getSocialsAccounts());

    return () => {};
  }, [dispatch]);
  useEffect(() => {});

  /**
   * * @handling search
   */
  const handleSearch = value => {
    console.log(value);
    let filteredAccounts = reduxStateData.social_accounts.filter(
      social_data => {
        let poetName = social_data.name.toLowerCase();
        return poetName.indexOf(value.toLowerCase()) !== -1;
      }
    );

    setFilteredData(filteredAccounts);
  };

  /**
   *
   * @param {*} account
   * @param {*} index
   */
  const accountsHtml = (account, index) => {
    return (
      <div key={index} className='main-row'>
        <div className='profile-rel-div'>
          {account.picture_url !== null ? (
            <Avatar size='large' src={account.picture_url} />
          ) : (
            <Avatar size='large'>{account.name}</Avatar>
          )}{' '}
          {account.provider === 'facebook' && (
            <img
              src='/images/facebook.png'
              className='social-icon soc-rel-div-icon'
              alt='fb'
            />
          )}
          {account.provider === 'twitter' && (
            <img
              src='/images/twitter.png'
              className='social-icon soc-rel-div-icon'
              alt='fb'
            />
          )}
          {account.provider === 'linkedin' && (
            <img
              src='/images/linkedin.png'
              className='social-icon soc-rel-div-icon'
              alt='linkedin'
            />
          )}
          {account.provider === 'instagram' && (
            <img
              src='/images/instagram.svg'
              className='social-icon soc-rel-div-icon'
              alt='fb'
            />
          )}
        </div>{' '}
        <div className='profile-det-div'>
          <div className='client-name'>{account.name}</div>
          <div className='client-account'>
            {' '}
            {`${account.provider || ''} page`}{' '}
          </div>{' '}
        </div>{' '}
        <div className='btn-box'>
          <a href='#s' className='reconnect-btn'>
            Reconnect{' '}
            <img
              src={require('../../../../images/reconnect-accounts-icon.svg')}
              alt='imgg'
            />{' '}
          </a>{' '}
          <a href='#s'>
            Remove{' '}
            <img
              src={require('../../../../images/remove-accounts-icon.svg')}
              alt='imgg'
            />{' '}
          </a>{' '}
        </div>{' '}
      </div>
    );
  };

  return (
    <GPLayout sideBar={true}>
      <WrapperDiv>
        <div className='wrapper-row'>
          <div className='col-right'>
            <p className='text-blue'> Social Accounts </p>{' '}
            <div className='heading-card clearfix'>
              <h1 className='widget-title'> Your Social Accounts </h1>{' '}
              <Link to={'/accounts/connect'} className='btn-blue'>
                Add New Social Account{' '}
              </Link>{' '}
            </div>{' '}
            <div className='search-div'>
              <img
                className='search-icon'
                src={require('../../../../images/10-icon.svg')}
                alt='imgg'
              />{' '}
              <input
                className='search-input'
                placeholder='Search Social Accounts'
                onChange={e => handleSearch(e.target.value)}
              />
            </div>{' '}
            <h3 className='account-heading'> Name </h3>{' '}
            <Skeleton
              loading={reduxStateData.social_accounts_spinner}
              active={true}
            >
              <div className='account-list-row'>
                {filteredData.length > 0
                  ? filteredData.map((f, index) => {
                      return accountsHtml(f, index);
                    })
                  : reduxStateData.social_accounts.map((account, index) => {
                      return accountsHtml(account, index);
                    })}
              </div>
            </Skeleton>
          </div>{' '}
        </div>{' '}
      </WrapperDiv>
    </GPLayout>
  );
}
export default Index;
const WrapperDiv = styled.div`
  width: 100%;
  .wrapper-row {
    position: relative;
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
  .search-div {
    position: relative;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(-50%, -50%);
    width: 16px;
  }
  .search-input {
    padding: 10px 10px 10px 40px;
    border: 1px solid #ddd;
    width: 100%;
    max-width: 400px;
  }
  .profile-rel-div {
    position: relative;
    margin-right: 15px;
    width: fit-content;
  }
  .profile-det-div {
    width: fit-content;
  }
  .client-name,
  .client-account {
    width: 100%;
  }
  .client-account {
    text-transform: capitalize;
  }
  .soc-rel-div-img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    font-size: 24px;
    font-weight: 700;
  }
  .soc-rel-div-icon {
    position: absolute;
    right: -3px;
    bottom: 0;
    margin: 0;
    padding: 0;
    border: 0;
    width: 18px;
  }
  .wrapper-row .col-right {
    padding: 15px 20px;
    background: rgb(255, 255, 255);
  }
  h2.widget-title {
    font-size: 18px;
    font-weight: 400;
  }
  .text-blue {
    color: #53b5e6;
  }
  h1.widget-title {
    font-size: 18px;
    font-weight: 400;
  }
  .btn-blue {
    background: #1088e9;
    color: #fff;
    padding: 10px 30px;
  }
  .right-5 {
    margin-right: 5px;
  }
  .heading-card {
    position: relative;
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .heading-card h1.widget-title {
    float: left;
    margin-top: 8px;
  }
  .heading-card .btn-blue {
    float: right;
  }
  .account-heading {
    border-bottom: 1px solid #ccc;
    padding: 15px 0;
    font-weight: 400;
    font-size: 14px;
  }
  .account-list-row .main-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 15px;
  }
  .main-row .name-box {
    width: 50%;
    padding-left: 10px;
  }
  .name-box .imgbox {
    background: #ddd;
    width: 45px;
    height: 45px;
    border-radius: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .client-detail {
    position: relative;
    padding-left: 55px;
  }
  .btn-box {
    display: flex;
    width: fit-content;
    align-items: center;
    margin-left: auto;
  }
  .reconnect-btn {
    border: 0;
  }
  .reconnect-btn:after {
    content: '';
    width: 1px;
    height: 100%;
    border-left: 1px solid rgba(0, 0, 0, 0.3);
    margin: 0 15px;
  }
  .btn-box a {
    color: rgba(0, 0, 0, 0.3);
    font-size: 16px;
  }
  .btn-box a img {
    width: 16px;
    margin-left: 15px;
  }
  @media (max-width: 500px) {
    .btn-box {
      margin: 10px auto;
    }
  }
  @media (max-width: 767px) {
    .wrapper-row .col-left {
      position: static;
      width: 100%;
      border: 0;
      margin: 0;
    }
    .wrapper-row .col-right {
      margin: 0;
    }
  }
  @media (max-width: 576px) {
    .heading-card .btn-blue {
      margin-top: 10px;
    }
    .main-row .name-box,
    .main-row {
      width: 100%;
    }
    .main-row {
      text-align: left;
      margin-top: 15px;
    }
  }
`;
