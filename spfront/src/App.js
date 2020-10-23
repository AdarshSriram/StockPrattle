import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from "react-router-dom";
import LandingPage from './components/landingPage.jsx';
import UserPage from './components/userHome.jsx';

function App() {
  return (
    <HashRouter>
        <div>
            <Switch>
                <Route path={"/userPage"} exact component={UserPage} />
                <Route path={""} exact component={LandingPage}/>
            </Switch>
        </div>
    </HashRouter>
  );
}

export default App;
