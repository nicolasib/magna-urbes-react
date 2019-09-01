import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/index';
import Register from './pages/register';
import AdminLogin from './pages/adminLogin';
import PosRegister from './pages/posRegister';
import MapComp from './pages/Map';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/adminLogin" component={ AdminLogin } />
            <Route exact path="/posRegister" component={ PosRegister } />
            <Route exact path="/map" component={ MapComp } />
        </Switch>
    </BrowserRouter>
);

export default Routes;
