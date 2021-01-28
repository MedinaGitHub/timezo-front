import React, { lazy, useState, useEffect } from 'react';
import { Switch, Router, Route, Redirect, useLocation } from 'react-router-dom';
import ReadEvent from './pages/ReadEvent';
import CreateEvent from './pages/CreateEvent';
import { createBrowserHistory } from 'history';
import { useDispatch } from 'react-redux';

import { authCheckState } from './reducer/auth'


const history = createBrowserHistory();


export default function Routes() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(authCheckState());
        // eslint-disable-next-line
    }, []);
    
    const location = useLocation();
    return (
        <Router history={history}>
            <Route exact path="/">
                <CreateEvent />
            </Route>
            <Route path={['/:id_owner/:id_counter']}>
                <Switch location={location} key={location.pathname}>
                    <ReadEvent />
                </Switch>
            </Route>
        </Router>
    );
}