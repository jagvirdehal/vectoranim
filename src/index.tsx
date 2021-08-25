import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import './index.css';
import R3 from './R3';
import Dashboard from './Dashboard';
import { Globals } from '@react-spring/three';

Globals.assign({
  frameLoop: 'always',
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/dash">
          <Dashboard />
        </Route>
        <Route path="/r3">
          <R3 />
        </Route>
        <Route path="/">
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/r3">Go to R3</Link>
                </li>
                <li>
                  <Link to="/dash">Go to Dashboard</Link>
                </li>
              </ul>
            </nav>
          </div>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
