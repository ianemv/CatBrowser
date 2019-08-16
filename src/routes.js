import React from 'react';
import { Switch, Route } from 'react-router'

import Home from './Components/home'
import ViewCat from './Components/viewCat'



const Routes = (props) => (
    <Switch>
        <Route  exact path="/" render={(props) => <Home {...props}/>} />
        <Route path="/:catid" render={(props) => <ViewCat {...props}/>} />
    </Switch>
)

export default Routes;