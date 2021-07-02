import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Edit from "./Components/Edit";
import Item from "./Components/Item";
import Catalog from "./Components/Catalog";
import { SignUp } from "./Components/SignUp";
import Login from "./Components/Login";
// import firebase from "./config/firebase";
import { AuthProvider } from "./Components/AuthService";
import LoggedInRoute from "./Components/LoggedInRoute";
import Home from "./Components/Home";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Switch>
            <LoggedInRoute exact path="/user/:uid" component={Catalog} />
            <Route exact path="/" component={Home} />
            <Route exact path="/new" component={Edit} />
            <Route exact path="/edit/:id" component={Edit} />
            <Route exact path="/user/:uid/items/:did" component={Item} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
