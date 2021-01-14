import React, { Component } from 'react'
const TItle = ({ name, description, categories }) => {
    return (
        <>
            <div className="event__title">
                <div className="category">
                    {categories.map(data => <span id={`span_${data}`}> {data} </span>)}
                </div>
                <div className="title">{name}</div>
                <div className="org">{description}</div>
                <div className="addthis_inline_share_toolbox"></div>
            </div>
        </>
    )
}

export { TItle }