import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './js/reportWebVitals';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from './js/App';
import GroupView from './js/GroupView'

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/groupview" component={GroupView}/>
    </Switch>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
