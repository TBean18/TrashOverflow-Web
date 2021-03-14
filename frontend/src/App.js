import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Router >
        <Switch>
          <Route path="/" exact>
            <LoginPage />
          </Route>
          <Route path="/cards" exact>
            <CardPage />
          </Route>
          <Redirect to="/" />
        </Switch>  
      </Router>
    </GlobalProvider>
  );
}

export default App;
