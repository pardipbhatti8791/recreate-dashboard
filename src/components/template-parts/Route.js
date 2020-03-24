import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import GPLayout from './GPLayout';
import Dashboard from '../private-components/dashboard';

export default class MainRoute extends Component {
  render() {
    return (
      <Fragment>
        <GPLayout>
          <Route path='/dashboard/:children' component={Dashboard} />
        </GPLayout>
      </Fragment>
    );
  }
}
