import React, { Component } from 'react'
const Header = () => {
    return (
        <header>
            <div className="logo"></div>
            <div className="menu">
                {/*
                                <div className="timezone">
                    <div className="flag"><img src="https://www.countryflags.io/cl/flat/64.png"/></div>
                        <div className="country">CL</div>
                        <div className="zone">Santiago (GMT/UTC -3)</div>

                    </div>
                */}
                <nav>
                    <a href="">Crear un evento</a>
                    {/* TODO:
                    <a href="" className="menu__hl">Ingresar</a>
                   */}
                    {/*
                    <a href="" className="menu__expand"></a>
                    */}
                </nav>
            </div>
        </header>
    )
}

export { Header }