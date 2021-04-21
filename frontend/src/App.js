import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";

// import CardPage from './pages/CardPage';
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ForgotPassPage from "./pages/ForgotPassPage";
import ResetPassPage from "./pages/ResetPassPage";
import UserChoresPage from "./pages/UserChoresPage";
import SamView from "./components/GroupChores/GroupChores";

import useQueryClientCreator from "./hooks/useQueryClientCreator";
import { GlobalProvider } from "./context/GlobalState";
import GroupsPage from "./pages/GroupsPage";
import GroupChoresView from "./components/GroupChoresView/GroupChoresView";
import { QueryClientProvider } from "react-query";

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
              <UserChoresPage />
            </Route>
            <Route path="/groups" exact>
              <GroupsPage />
            </Route>
            <Route path="/groupchores/:group_ID" exact>
              <GroupChoresView />
            </Route>
            <Route path="/signin" exact>
              <LoginPage />
            </Route>
            <Route path="/sammy" exact>
              <SamView />
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
