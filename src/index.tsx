import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { pageurl } from './utils/constants';
import Home from './components/home';
import Header from './components/nav';
import { OMDBMoviesProvider } from './context/OMDBMoviesContext';
import './index.scss';

const Routes = () => (
  <Router>

    <Header />
    
    <Switch>    
        <Route exact path={pageurl.HOME} component={Home} />
    </Switch>
    
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    <OMDBMoviesProvider>
      <Routes />
    </OMDBMoviesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
