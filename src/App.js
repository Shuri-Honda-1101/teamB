import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Edit from "./Components/Edit";
import Item from "./Components/Item";
import Catalog from "./Components/Catalog";
import { SignUp } from "./Components/SignUp";
import Login from "./Components/Login";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Catalog} />
          <Route exact path="/edit/:id" component={Edit} />
          <Route exact path="/item" component={Item} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
