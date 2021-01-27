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
