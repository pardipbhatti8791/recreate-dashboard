import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { gpAxios } from '../../../../utils/gpAxios';
import { apiPaths } from '../../../../utils/apiPaths';
import { queryString } from '../../../../utils/qs';

class TwitterLoginModule extends Component {
  state = {
    triggerExchange: false
  };

  componentDidMount() {
    let url = new URL(window.location.href);
    if (
      url.searchParams.get('oauth_token') &&
      url.searchParams.get('oauth_verifier')
    ) {
      const config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };
      const exchangeData = queryString(this.props.location.search);
      const exchangeQS = `oauth_token=${exchangeData.oauth_token}&oauth_verifier=${exchangeData.oauth_verifier}`;
      gpAxios
        .post(apiPaths.twitter_exchange_token, exchangeQS, config)
        .then(resp => {
          window.location.href = '/dashboard/accounts';
        })
        .catch(e => {
          console.log(e.response);
        });
    }
  }

  requestToken = () => {
    const uri = 'redirect_uri=https://dev.roman3.io/dashboard/accounts/connect';
    gpAxios
      .post(apiPaths.twitter_request_token, uri)
      .then(resp => {
        window.open(resp.data.data.redirect_url, '_self');
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  render() {
    return (
      <a href onClick={this.requestToken}>
        <i className='fab fa-twitter'></i> Twitter{' '}
      </a>
    );
  }
}

export default withRouter(TwitterLoginModule);
