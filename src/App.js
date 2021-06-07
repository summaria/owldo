
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import ROUTES from "./routes";
import React from 'react';

import { useAuth, AuthProvider } from "./firebase";

import Landing from './pages/Landing.js';
import Dashboard from './pages/Dashboard.js';
import Signin from './pages/signin';
import Signup from './pages/signup';

function App() {
    let { currentUser } = useAuth();

    let privateRoutes = (
        <Switch>
          <Route exact path={ROUTES.dashboard} component={Dashboard} />
          <Redirect to={ROUTES.dashboard} />
        </Switch>
    );

    let publicRoutes = (
        <Switch>
          <Route exact path={ROUTES.landing} component={Landing} />
					<Route exact path={ROUTES.signin} component={Signin} />
          <Route exact path={ROUTES.signup} component={Signup} />
          <Redirect to={ROUTES.signin} />
        </Switch>
    );

    return (
      <BrowserRouter>
        {
            currentUser? privateRoutes: publicRoutes
        }
      </BrowserRouter>
    );
}

const AuthfulApp = () => <AuthProvider><App /></AuthProvider>

export default AuthfulApp;
