import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Customer from '../customer/customer'
import City from '../city/city'

export default props => (
    <div className='content-wrapper'>
        <Switch>
            <Route exact path='/' component={Customer} />
            <Route path='/city' component={City} />
            <Redirect from='*' to='/' />
        </Switch>
    </div>
)