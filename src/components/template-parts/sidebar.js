import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Avatar } from 'antd';
import { withRouter } from 'react-router-dom';

/**
 * * @actions
 */
import {
  getSocialsAccounts,
  setSelectedAccount
} from '../../redux/social_accounts/action';
import { getPostSchedules } from '../../redux/schedule_posts/actions';
import { setActive, setSocialAccountType } from '../../redux/sidebar/actions';

function SideBar(props) {
  /**
   * @React Hooks { useState }
   */
  const [default_page, set_default_page] = useState(false);
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
  const activeBar = useSelector(state => state.sidebar.current_active);

  /**
   * @functional based component hooks
   */
  useEffect(() => {
    dispatch(getSocialsAccounts());

    return () => {};
  }, [dispatch]);

  /**
   * * select another page
   * @param {*} type
   * @param {*} id
   */
  const changePage = (type, id, account) => {
    dispatch(
      getPostSchedules(
        `social_account_id=${id}&social_account_type=${type}`,
        id
      )
    );
    dispatch(setSelectedAccount(account));
  };

  /**
   * *
   */
  if (reduxStateData.social_accounts[0] !== undefined) {
    if (!default_page) {
      const data = reduxStateData.social_accounts[0];
      changePage('page', data.id, data);
      dispatch(setSelectedAccount(data));
      dispatch(
        setSocialAccountType(reduxStateData.social_accounts[0].provider)
      );
      set_default_page(true);
    }
  }

  /**
   * * @handling search
   */
  const handleSearch = value => {
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
      <li
        key={index}
        onClick={() => {
          changePage(
            account.provider === 'linkedin' || account.provider === 'instagram'
              ? account.provider
              : 'page',
            account.id,
            account
          );

          dispatch(setActive(index));
          switch (account.provider) {
            case 'facebook':
              dispatch(setSocialAccountType('facebook'));
              return;
            case 'twitter':
              dispatch(setSocialAccountType('twitter'));
              return;
            case 'linkedin':
              dispatch(setSocialAccountType('linkedin'));
              return;
            case 'instagram':
              dispatch(setSocialAccountType('instagram'));
              return;
            default:
              dispatch(setSocialAccountType('facebook'));
              return;
          }
        }}
      >
        <div className={`${index === activeBar && 'active'} cion`}>
          <span className='spanImg'>
            {account.picture_url !== null ? (
              <Avatar size='large' src={account.picture_url} />
            ) : (
              <Avatar size='large'>{account.name}</Avatar>
            )}
            {account.provider === 'facebook' && (
              <img
                src='/images/facebook.png'
                className='social-icon'
                alt='fb'
              />
            )}
            {account.provider === 'twitter' && (
              <img src='/images/twitter.png' className='social-icon' alt='fb' />
            )}
            {account.provider === 'linkedin' && (
              <img
                src='/images/linkedin.png'
                className='social-icon'
                alt='linkedin'
              />
            )}
            {account.provider === 'instagram' && (
              <img
                src='/images/instagram.svg'
                className='social-icon'
                alt='fb'
              />
            )}
          </span>
          <span className='spanName'>{account.name}</span>
        </div>
      </li>
    );
  };

  return (
    <SidebarWrapper>
      <div className='leftMenuContainer'>
        <div className='inputGroup'>
          <input
            type='text'
            placeholder='Search Profiles'
            onChange={e => handleSearch(e.target.value)}
          />
          <i className='fa fa-search iconSearch' aria-hidden='true'></i>
        </div>
        <ul className='list-group'>
          <Skeleton
            loading={reduxStateData.social_accounts_spinner}
            active={true}
            avatar={true}
          >
            {filteredData.length > 0
              ? filteredData.map((f, index) => {
                  return accountsHtml(f, index);
                })
              : reduxStateData.social_accounts.map((account, index) => {
                  return accountsHtml(account, index);
                })}
          </Skeleton>
        </ul>
      </div>
      <div className='manage-account-btn'>
        <button onClick={() => props.history.push('/accounts')}>
          Manage Accounts
        </button>
      </div>
    </SidebarWrapper>
  );
}

export default withRouter(SideBar);

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
    margin: 0;
    padding: 0;
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
    .manage-account-btn {
      width: calc(32.5% - 2rem);
    }
  }
  @media (max-width: 767px) {
    width: 100%;
    height: auto;
    .leftMenuContainer {
      margin: 0;
      height: auto;
      padding: 20px 20px 0;
      .list-group {
        display: none;
      }
    }
    .manage-account-btn {
      position: static;
      padding: 20px;
      width: 100%;
      margin: 0;
    }
  }
`;
