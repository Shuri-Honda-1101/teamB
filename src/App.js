import logo from './logo.svg';
import './App.css';
import Catalog from '../Catalog'
import {
  BrowserRouter as Router, Switch, Route
}
  from "react-router-dom"
import Edit from '../Edit';
import Item from '../Item'

function App() {
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
