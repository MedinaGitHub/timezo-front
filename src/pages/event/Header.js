import React, { Component } from 'react'
import { Signup } from './Signup'
import { useSelector, useDispatch } from 'react-redux';
import { Signin } from './Signin';

const Header = ({ openModalSet }) => {
    const isAuth = useSelector(({ auth }) => auth.token !== null && typeof auth.token !== 'undefined'  && auth.email != null  );
    console.log('isAuth',isAuth)
    const auth = useSelector(({ auth }) => auth);
    console.log('isauthauthauthauthAuth',auth)
    console.log('auth', auth)
    return (
        <>
            <header>
                <div class="logo"></div>
                {!isAuth &&
                    <div class="menu">
                        <div class="timezone cursorzone" onClick={() => openModalSet(true)}>
                            <div className="zone">
                                <a  >Registrar</a>
                            </div>
                        </div>
                        <Signin />
                        { /*<a href="" class="menu__expand"></a> */}

                    </div>
                }
                {
                    isAuth &&
                    <div class="menu">

                        <nav>
                            <a href=""></a>
                            <a href="">{auth.nick_name}</a>
                            { /*<a href="" class="menu__expand"></a> */}
                        </nav>
                    </div>
                }

            </header>
        </>
    )
}

export { Header }