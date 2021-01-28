import React, { useState, useEffect } from 'react'
import { Header } from './Header';
import { Signup } from './Signup'
import Form from './Form'
import { Logo } from '../Logo';


export default function CreateEvent() {
    const openModalSet = (val) => { setValue(val) }
    const [value, setValue] = useState(false);

    return (
        <main>
            <Logo />
            <Signup valueOpen={value} openModalSet={openModalSet} />
            <Header openModalSet={openModalSet} />
            <Form openModalSet={openModalSet} />
            <div class="bg__full"></div>
        </main>
    )
};