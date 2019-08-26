import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import AdminLogin from './pages/adminLogin';
import PosRegister from './pages/posRegister';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/adminLogin" component={AdminLogin} />
            <Route exact path="/posRegister" component={PosRegister} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
