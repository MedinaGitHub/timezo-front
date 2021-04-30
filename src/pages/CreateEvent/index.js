import React, { useState, useEffect } from 'react'
import { Header } from './Header';
import { Signup } from './Signup'
import Form from './Form'
import { Logo } from '../Logo';
import { Link } from "react-router-dom";


export default function CreateEvent() {
    const openModalSet = (val) => { setValue(val) }
    const [value, setValue] = useState(false);

    return (
        <main>
            <Signup valueOpen={value} openModalSet={openModalSet} />
            <Header openModalSet={openModalSet} />
            <Form openModalSet={openModalSet} />
            <div class="bg__full"></div>
            <div> <Link className={'link-conditions'} to="/terms_and_Conditions">Terms And Conditions</Link> <Link className={'link-privacity'} to="/privacy_policy">Privacy Policy</Link>  </div>
        </main>
    )
};