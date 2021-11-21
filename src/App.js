import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { AuthProvider } from "./Components/utility/AuthService";

//Pages
import { SignUp } from "./Components/Pages/SignUp";
import { Login } from "./Components/Pages/LogIn";
import Home from "./Components/Pages/Home";

//Components
import { Header } from "./Components/utility/Header/Header";
import { Default } from "./Components/utility/Default/Default";
import LoggedInRoute from "./Components/utility/LoggedInRoute";

const App = ({ history }) => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <GlobalStyle />
          <Header />
          <Switch>
            <Route exact path="/lp" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <LoggedInRoute path="/" component={Default} />
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
  font-weight: 200;
  font-family: "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "Hiragino Sans", "ヒラギノ角ゴシック", sans-serif;
}
a{
  text-decoration:none;
}
input,textarea{
   -webkit-appearance: none;
   border-radius: 0;
}
html{
  font-size: 62.5%;
}
body{
  padding: 63px 0 48px 0;
  background-color: #000;
  color: #fff;
  font-family: "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3",
    "Hiragino Sans", "ヒラギノ角ゴシック", sans-serif;
  input,textarea{
  background-color: #000;
  color: #fff;
  border:none;
  border-bottom:1px solid #707070;
  }
}
`;

export default App;
