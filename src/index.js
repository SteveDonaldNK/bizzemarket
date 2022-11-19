import React from 'react';
import { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Context from './pages/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Fragment>
      <BrowserRouter>
      <Context>
        <App />
      </Context>
      </BrowserRouter>
  </Fragment>
);