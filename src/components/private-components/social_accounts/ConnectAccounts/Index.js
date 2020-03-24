import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiPaths } from '../../../../utils/apiPaths';
import { queryString } from '../../../../utils/qs';
import { connectAccount } from '../../../../redux/social_accounts/action';
import TwitterLoginModule from '../../shared-components/twitter_login/TwitterLogin';
import SocialAccounts from '../../../../utils/social_accounts';
import GPLayout from '../../../template-parts/GPLayout';
class Index extends Component {
  state = {
    activeTab: 'social'
  };
  componentDidMount() {
    const code = queryString(this.props.location.search).hasOwnProperty('code');
    if (code) {
      const { connectAccount } = this.props;
      if (localStorage.getItem('social_type') === 'linkedin') {
        const data = `client_id=81ll7w4p8szfpt&grant_type=authorization_code&code=${
          queryString(this.props.location.search).code
        }&redirect_uri=https://staging.roman3.io/accounts/connect`;

        connectAccount(`${apiPaths.linked_in_account}`, data);
      }

      if (localStorage.getItem('social_type') === 'instagram') {
        const data = `code=${
          queryString(this.props.location.search).code
        }&redirect_uri=https://staging.roman3.io/accounts/connect`;

        connectAccount(`${apiPaths.instagram_account}`, data);
      }
    }
  }

  linkedInAuth = () => {
    localStorage.setItem('social_type', 'linkedin');
    window.open(
      'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=81ll7w4p8szfpt&redirect_uri=https://staging.roman3.io/accounts/connect&state=987654321&scope=r_liteprofile%20r_emailaddress%20w_organization_social%20r_basicprofile%20r_organization_social%20rw_organization_admin%20w_member_social',
      '_self'
    );
  };

  instagramInAuth = () => {
    localStorage.setItem('social_type', 'instagram');
    window.open(
      'https://api.instagram.com/oauth/authorize?app_id=682471205616636&redirect_uri=https://staging.roman3.io/accounts/connect&scope=user_profile,user_media&response_type=code',
      '_self'
    );
  };

  componentWillUnmount() {
    localStorage.removeItem('social_type');
  }

  handleTabs = () => {};

  render() {
    return (
      <GPLayout sideBar={true}>
        <WrapperDiv>
          <div className='wrapper-row'>
            <div className='col-right'>
              <ul className='breadcrumb'>
                <li>
                  <Link to={'/accounts'} className='text-blue'>
                    Social Accounts
                  </Link>
                </li>
                <li>Connect</li>
              </ul>
              <div className='heading-card clearfix'>
                <h1 className='widget-title'>Connect a New Social Account</h1>
              </div>

              <div className='social-account-main-row'>
                <div className='account-left-col'>
                  <ul className='social-list'>
                    <li>
                      <SocialAccounts
                        title='Facebook Pages'
                        icon='fa-facebook-f'
                        client_id='259269895011932'
                        scope='public_profile,manage_pages,publish_pages'
                        type='facebook'
                      />
                    </li>

                    <li>
                      <SocialAccounts
                        title='Facebook Groups'
                        icon='fa-facebook-f'
                        client_id='259269895011932'
                        scope='publish_to_groups, groups_access_member_info'
                        type='facebook'
                      />
                    </li>

                    <li>
                      <TwitterLoginModule />
                    </li>
                    <li>
                      <a href onClick={this.linkedInAuth} id='linkedin'>
                        <i className='fab fa-linkedin'></i> LinkedIn{' '}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </WrapperDiv>
      </GPLayout>
    );
  }
}

Index.propTypes = {};

export default connect(undefined, { connectAccount })(Index);

const WrapperDiv = styled.div`
  width: 100%;
  .wrapper-row {
    position: relative;
  }
  .account-left-col ul {
    list-style: none;
    margin-left: -42px;
  }
  .col-left-head-div {
    padding: 10px 20px;
    border-bottom: 1px solid #f0f0f0;
  }
  .col-left-head-typo-1 {
    font-size: 16px;
  }
  .left-tabs {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    cursor: pointer;
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
    width: 45px;
    height: 45px;
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
  .wrapper-row .col-left {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 260px;
    left: 0;
    margin-top: 60px;
    border-right: 1px solid #f0f0f0;
    padding: 20px 0;
    background: #fcfcfc;
  }
  .wrapper-row .col-right {
    padding: 15px 20px;
    background: rgb(255, 255, 255);
    height: 90vh;
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
  .social-list li {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    border-radius: 3px;
  }
  .social-list li a {
    color: #666;
    padding: 6px 13px;
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
  }
  .social-list li a:before {
    content: '';
    position: absolute;
    right: 15px;
    top: 12px;
    width: 10px;
    height: 10px;
    background: transparent;
    transform: rotate(45deg);
    border-top: 2px solid #53b5e6;
    border-right: 2px solid #53b5e6;
  }
  .social-list li a i {
    width: 18px;
    height: 18px;
    background: #0055c7;
    border-radius: 100%;
    color: #fff;
    font-size: 10px;
    text-align: center;
    line-height: 18px;
    margin-right: 5px;
  }

  .social-list li a i.fa-instagram {
    background: #d6249f;
    background: radial-gradient(
      circle at 30% 107%,
      #fdf497 0%,
      #fdf497 5%,
      #fd5949 45%,
      #d6249f 60%,
      #285aeb 90%
    );
  }
  .social-list li a i.fa-pinterest-p {
    background: #ed1c24;
  }
  .social-list li a i.fa-twitter {
    background: #53b5e6;
  }
  .social-list li a i.fa-linkedin-in {
    background: #1088e9;
  }
  .breadcrumb li {
    display: inline-block;
    margin-right: 30px;
  }
  .breadcrumb li a {
    position: relative;
  }
  .breadcrumb li a:before {
    position: absolute;
    content: '>';
    right: -18px;
    top: 0;
    color: #666;
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
