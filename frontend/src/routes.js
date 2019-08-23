import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import AdminLogin from './pages/adminLogin';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/adminLogin" component={AdminLogin} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
