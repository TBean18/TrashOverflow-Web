import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './App.css';

import LoginPage from './pages/Login';
// import CardPage from './pages/CardPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import ForgotPassPage from './pages/ForgotPassPage';
import Main from './js/Main';

import { GlobalProvider } from './context/GlobalState';
import GroupView from './js/GroupView';
import GroupChoresView from './components/GroupChoresView/GroupChoresView';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/chores" exact>
            <Main />
          </Route>
          <Route path="/groups" exact>
            <GroupView />
          </Route>
          <Route path="/groupchores" exact>
            <GroupChoresView />
          </Route>
          <Route path="/signin" exact>
            <LoginPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/forgot" exact>
            <ForgotPassPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
