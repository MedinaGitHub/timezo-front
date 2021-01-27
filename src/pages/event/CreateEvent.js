import React, {useState } from 'react'
import { Header } from './Header';
import { Signup } from './Signup'
import Form from './Form'

export default function CreateEvent() {
    const openModalSet = (val) =>{setValue(val)}
    const [value, setValue] = useState(false);
    return (
        <main>
            <Signup valueOpen={value} openModalSet={openModalSet} />
            <Header  openModalSet={openModalSet} />
            <Form  openModalSet={openModalSet} />
            <div class="bg__full"></div>
        </main>
    )
};