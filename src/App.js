import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Edit from "./Components/Pages/Edit/Edit";
import Item from "./Components/Pages/Item/Item";
import Catalog from "./Components/Pages/Catalog/Catalog";
import SignUp from "./Components/Pages/SignUp/SignUp";
import Login from "./Components/Pages/LogIn/Login";
// import firebase from "./config/firebase";
import { AuthProvider } from "./Components/utility/AuthService";
import LoggedInRoute from "./Components/utility/LoggedInRoute";
import Home from "./Components/Pages/Home/Home";
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
            <LoggedInRoute exact path="/edit/:id/:mid" component={Edit} />
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
  font-family: "ヒラギノ角ゴシック";
}
body{
  padding: calc(62 / 375 * 100vw) 0 calc(48 / 375 * 100vw) 0;
  /* background-color: #000;
  color: #fff; */
  font-weight: 200;
}
`;

export default App;
