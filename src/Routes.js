import React, { lazy, useState, useEffect } from 'react';
import { Switch, Router, Route, Redirect, useLocation } from 'react-router-dom';
import ReadEvent from './pages/ReadEvent';
import CreateEvent from './pages/CreateEvent';
import {PrivicityPolicity}  from './pages/PrivicityPolicity';
import { createBrowserHistory } from 'history';
import { useDispatch } from 'react-redux';

import { authCheckState } from './reducer/auth'
import { Legal } from './pages/Legal';


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
            <Route path={['/privacy_policy']}>
                <Switch location={location} key={location.pathname}>
                    <PrivicityPolicity />
                </Switch>
            </Route>
            <Route path={['/terms_and_Conditions']}>
                <Switch location={location} key={location.pathname}>
                    <Legal/>
                </Switch>
            </Route>
            <Route path={['/:id_owner/:id_counter']}>
                <Switch location={location} key={location.pathname}>
                    <ReadEvent />
                </Switch>
            </Route>
        </Router>
    );
}