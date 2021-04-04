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
import ForgotPassPage from './pages/ForgotPassPage';
import Main from './js/Main';

import { GlobalProvider } from './context/GlobalState';
import GroupView from './js/GroupView';
import Login from './components/Login/Login';
import { QueryClientProvider } from 'react-query';
import useQueryClientCreator from './hooks/useQueryClientCreator';

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
            <Redirect to="/" />
          </Switch>
        </Router>
      </GlobalProvider>
    </QueryClientProvider>
  );
}

export default App;
