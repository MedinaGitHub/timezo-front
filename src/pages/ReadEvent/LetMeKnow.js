import React, { Component } from 'react'

const IGonnaGo = () => {
    var element = document.getElementById("lmk");
    element.classList.toggle("ty");
}

const LetMeKnow = () => {
    return (
        <>
            <div className="igo" id="lmk" onClick={IGonnaGo}>
                <div className="content__igo">
                    <div className="ic">
                        <div className="hand"></div>
                        <div className="hand2"></div>
                    </div>
                    <div className="text">
                        <span>Avísales que me interesa</span>
                        <span>Gracias!</span>
                    </div>
                </div>
          {/* <p className="asterisco">*le mencionaremos tu zona horaria para que lo considere</p> */} 
            </div>
        </>
    )
}

export { LetMeKnow }