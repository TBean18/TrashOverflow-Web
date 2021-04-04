import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './App.css';

// import CardPage from './pages/CardPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import Login from './components/Login/Login';
import ForgotPassPage from './pages/ForgotPassPage';
import GroupView from './js/GroupView';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Main from './js/Main';

import useQueryClientCreator from './hooks/useQueryClientCreator';
import { GlobalProvider } from './context/GlobalState';
import { QueryClientProvider } from 'react-query';

function App() {
  const queryClient = useQueryClientCreator();

  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path="/signin" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <RegisterPage />
            </Route>
            <Route path="/forgot" exact>
              <ForgotPassPage />
            </Route>
            <Route path="/reset" exact>
              <ResetPassword />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </GlobalProvider>
    </QueryClientProvider>
  );
}

export default App;
