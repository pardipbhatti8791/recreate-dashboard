import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import App from './components/template-parts/App';
import * as serviceWorker from './serviceWorker';
import configureStore from './redux/store';

export const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <DndProvider backend={Backend}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DndProvider>
  </Provider>,

  document.getElementById('root')
);
serviceWorker.unregister();
