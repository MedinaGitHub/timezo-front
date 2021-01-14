import React, { Component } from 'react'
const TimeEvent = ({time}) => {
    return (
        <>
            <div className="date__event">
                <div className="date__event--text">Esta es la fecha en tu zona horaria</div>
                <div className="date__event--number">{time}</div>
            </div>
        </>
    )
}

export { TimeEvent }