import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './pages/register';
import Home from './pages/home';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
