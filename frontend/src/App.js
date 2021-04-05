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
import LoginPage from './pages/LoginPage';
import ForgotPassPage from './pages/ForgotPassPage';
import ResetPassPage from './pages/ResetPassPage';
import Main from './js/Main';

import useQueryClientCreator from './hooks/useQueryClientCreator';
import { GlobalProvider } from './context/GlobalState';
import GroupView from './js/GroupView';
import GroupChoresView from './components/GroupChoresView/GroupChoresView';
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
          <Route path="/reset/:token" exact>
              <ResetPassPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </GlobalProvider>
        </QueryClientProvider>


  );
}

export default App;
