import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import ROUTES from "./routes";
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { useAuth, AuthProvider } from "./firebase";

import Landing from "./pages/Landing.js";
import Dashboard from "./pages/Dashboard.js";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Session from "./pages/Session";
import Unnecessary from "./pages/customModals";

import { createMuiTheme } from "@material-ui/core/styles";
import CreateSession from "./pages/CreateSession";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Solway",
  },
});

function App() {
  let { currentUser } = useAuth();

  let privateRoutes = (
    <Switch>
      <Route exact path={ROUTES.dashboard} component={Dashboard} />
      <Route exact path={ROUTES.createSession} component={CreateSession} />
      <Route exact path={ROUTES.session} component={Session} />
      <Route exact path="/unnecessary" component={Unnecessary} />
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
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {currentUser ? privateRoutes : publicRoutes}
      </BrowserRouter>
    </ThemeProvider>
  );
}

const AuthfulApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AuthfulApp;
