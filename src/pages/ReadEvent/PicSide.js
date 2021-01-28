import React, { useState, useEffect, Component } from 'react'
import logo from '../../img/react.jpg';

const PicSide = ({ link_event, picture }) => {
    return (
        <section className="pic__event">

            <div className="original">
                <img src={picture} alt="" />
                <div className="link">
                    <a id='linevent' target="_blank" href={`//${link_event}`} className="link--event">Llévame al evento!</a>
                    {/*  <a href="" className="link--home">Genial, quiero ver eventos similares</a> */}
                </div>
            </div>

            <div className="blurred">
                <img src={picture} alt="" />
            </div>

        </section>
    )
}

export { PicSide }


/*
Primero el flujo de la data
Click a me interesa
Reviso que en el localStorage no le haya hecho click, y si tiene click cambiar el ¨Gracias¨ a un OK, ya le avisamos tu interés.
Viaja a la API el país y el  GMT que tenga el gallo. junto el ID de la invitación  y el dueño de la invitación.
Luego, le dejo en el localStorage un diccionario de Dueño/invitacion  para que no haga mil veces click
Al final la persona puede ver los distintos GMT y su número de veces que le hicieron asistiré.
*/