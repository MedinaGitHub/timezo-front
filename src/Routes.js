import React, { lazy, useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import ReadEvent from './pages/event/ReadEvent';
import CreateEvent from './pages/event/CreateEvent';


export default function Routes() {
    const location = useLocation();
    return (
            <Switch>
                <Route exact path="/">
                    <CreateEvent />
                </Route>
                <Route path={['/:id_owner/:id_counter']}>
                    <Switch location={location} key={location.pathname}>
                        <ReadEvent />
                    </Switch>
                </Route>
            </Switch>
    );
}