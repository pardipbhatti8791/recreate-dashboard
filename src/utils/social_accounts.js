/* global FB */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectAccount } from '../redux/social_accounts/action';
import { apiPaths } from './apiPaths';

class SocialAccounts extends Component {
  connectToFacebook = () => {
    const { scope } = this.props;
    FB.login(this.facebookLoginHandler, { scope: scope });
  };

  /**
   * * Handle login response
   */
  facebookLoginHandler = response => {
    if (response.status === 'connected') {
      var access_token = FB.getAuthResponse()['accessToken'];
      this.responseFacebook(access_token);
    } else {
      console.log('Not Connected');
    }
  };

  responseFacebook = token => {
    const { connectAccount } = this.props;
    const data = 'access_token=' + token;
    connectAccount(`${apiPaths.connect_account}/facebook`, data);
  };

  logout = () => {
    this.FB.logout();
  };

  render() {
    const { title, icon } = this.props;
    return (
      <div>
        <a href onClick={this.connectToFacebook}>
          <i className={`fab ${icon}`}></i> {title}
        </a>
      </div>
    );
  }
}

export default connect(undefined, { connectAccount })(SocialAccounts);
