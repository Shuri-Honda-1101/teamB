
import logo from './logo.svg';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import Edit from './Components/Edit';
import Item from './Components/Item';
import Catalog from './Components/Catalog';
import { SignUp } from "./Components/SignUp";
import Login from "./Components/Login";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Router>
        <Switch>
          <Route exact path='/' component={Catalog} />
          <Route exact path='/edit' component={Edit} />
          <Route exact path='/item' component={Item} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </Router>
    </div>

  );
};

export default App;
