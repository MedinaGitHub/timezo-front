import React, { lazy, useState, useEffect } from 'react';
import { Switch, Router, Route, Redirect, useLocation } from 'react-router-dom';
import ReadEvent from './pages/ReadEvent';
import CreateEvent from './pages/event/CreateEvent';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import { useDispatch } from 'react-redux';

import {  authCheckState } from './reducer/auth'

ReactGA.initialize("G-0LX7RPJE1L");

const history = createBrowserHistory();
history.listen(location => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
});

export default function Routes() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(authCheckState());
      // eslint-disable-next-line
    }, []);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, [])
    
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