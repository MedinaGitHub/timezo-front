import React, { Component } from 'react'
const TItle = ({  picture,name, description, categories }) => {
    return (
        <>
            <div className="event__title">
                <div className="category">
                    {categories.map(data => <span id={`span_${data}`}> {data} </span>)}
                </div>
                <div className="title">{name}</div>
                <div className="org">{description}</div>
                {/*<!-- Go to www.addthis.com/dashboard to customize your tools -->*/}
                <div 
                data-title={'Asiste al evento '+ name + ', revisa en este Link los detalles'}
                data-media={picture}
                className="addthis_inline_share_toolbox_3fk0 addthismargin"></div>
            
            
            </div>
        </>
    )
}

export { TItle }