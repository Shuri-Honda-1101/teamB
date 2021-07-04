import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Edit from "./Components/Edit";
import Item from "./Components/Item";
import Catalog from "./Components/Catalog";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
// import firebase from "./config/firebase";
import { AuthProvider } from "./Components/AuthService";
import LoggedInRoute from "./Components/LoggedInRoute";
import Home from "./Components/Home";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <GlobalStyle />
          <Switch>
            <LoggedInRoute exact path="/user/:uid" component={Catalog} />
            <Route exact path="/" component={Home} />
            <LoggedInRoute exact path="/new" component={Edit} />
            <LoggedInRoute exact path="/edit/:id" component={Edit} />
            <LoggedInRoute
              exact
              path="/user/:uid/items/:did"
              component={Item}
            />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};

const GlobalStyle = createGlobalStyle`
${reset}
*, *:before, *:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
html{
  font-size: 62.5%;
}
`;

export default App;
