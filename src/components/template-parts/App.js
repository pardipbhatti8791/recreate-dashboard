import React, { Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { useSelector } from 'react-redux';

import './App.css';
import Dashboard from '../private-components/dashboard';
import SignIn from '../authentication/sign_in/SignIn';
import CalendarView from '../private-components/dashboard/queue/calendar_view';
import Accounts from '../private-components/social_accounts/AllAccounts/index';
import ConnectAccounts from '../private-components/social_accounts/ConnectAccounts/Index';
import Design from '../private-components/design-dashboard/create';
import Library from '../private-components/design-dashboard/library';
import Profile from '../private-components/profile';

function App() {
  const isAuth = useSelector(state => state.authentication.isAuthenticated);
  const locationHelper = locationHelperBuilder({});

  /**
   * * if user is not authenticated then get back to login
   */
  const userIsAuthenticated = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatedSelector: props =>
      props.authentication.isAuthenticated !== false,
    wrapperDisplayName: 'UserIsAuthenticated'
  });

  /**
   * * if user Authenicated redirect back to last page
   */
  const userIsNotAuthenticated = connectedRouterRedirect({
    redirectPath: (state, ownProps) =>
      locationHelper.getRedirectQueryParam(ownProps) || '/dashboard/queue',
    allowRedirectBack: true,
    authenticatedSelector: state => !isAuth,
    wrapperDisplayName: 'UserIsNotAuthenticated'
  });

  return (
    <Fragment>
      <Switch>
        <Route path='/' exact component={userIsNotAuthenticated(SignIn)} />
        <Route path='/login' exact component={userIsNotAuthenticated(SignIn)} />
        <Route
          exact
          path='/dashboard'
          component={userIsAuthenticated(Dashboard)}
        />
        <Route
          exact
          path='/dashboard/:children'
          component={userIsAuthenticated(Dashboard)}
        />
        <Route
          path='/dashboard/queue/calendar'
          component={userIsAuthenticated(CalendarView)}
        />
        <Route
          exact
          path='/accounts'
          component={userIsAuthenticated(Accounts)}
        />
        <Route
          path='/accounts/connect'
          component={userIsAuthenticated(ConnectAccounts)}
        />
        <Route
          exact
          path='/design-dashboard'
          component={userIsAuthenticated(Design)}
        />
        <Route
          path='/design-dashboard/library'
          component={userIsAuthenticated(Library)}
        />
        <Route
          path='/profile'
          component={userIsAuthenticated(Profile)}
        />
        <Route
          render={() => {
            return (
              <Fragment>
                <h1>Page not found!</h1>
                <Link to='/dashboard'>Back to dashboard</Link>
              </Fragment>
            );
          }}
        />
      </Switch>
    </Fragment>
  );
}

export default App;
