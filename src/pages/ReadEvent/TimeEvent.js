import React, { Component } from 'react'
const TimeEvent = ({time, weeklyTime,weekly}) => {
    return (
        <>
            <div className="date__event">
                <div className="date__event--text">Esta es la fecha en tu zona horaria</div>
               {!weekly &&  <div className="date__event--number">{time}</div>}
               {weekly &&  <div className="date__event--number">{`Todos los ${weeklyTime}`}</div>}
            </div>
        </>
    )
}

export { TimeEvent }