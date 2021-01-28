import React, { Component } from 'react'
import logo from '../img/timezo.svg';

const Logo = () => {
    return (
        <>
            <div className={'imgTimezo'}>
                <img src={logo} alt="" />
            </div>
        </>
    )
}

export { Logo }