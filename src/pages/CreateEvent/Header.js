import React, { Component } from 'react'
import { Signup } from './Signup'
import { useSelector, useDispatch } from 'react-redux';
import { Signin } from './Signin';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { authLogout } from '../../reducer/auth';
import { useLocation, Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';


const Header = ({ openModalSet }) => {

    const location = useLocation();
    console.log('location.pathname', location.pathname);
    const dispatch = useDispatch();
    const isAuth = useSelector(({ auth }) => auth.token !== null && typeof auth.token !== 'undefined' && auth.email != null);
    console.log('isAuth', isAuth)
    const auth = useSelector(({ auth }) => auth);
    console.log('isauthauthauthauthAuth', auth)

    const [open, setOpen] = React.useState(false);
    console.log('auth', auth)
    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (event) => {
        if (event.target.value == 'channel') {

        } else if (event.target.value == 'logout') {
            dispatch(authLogout());
        }
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <header>
                {!isAuth &&
                    <>
                        <div class="logo">
                            <div class="country"></div>
                        </div>
                        <div class="menu">
                            <div class="timezone cursorzone" onClick={() => openModalSet(true)}>
                                <div className="zone">
                                    <a  >REGISTRAR</a>
                                </div>
                            </div>
                            <Signin />
                            { /*<a href="" class="menu__expand"></a> */}
                        </div>
                    </>
                }
                {
                    isAuth &&
                    <>
                        <div class="logo">
                            <div class="country"></div>
                        </div>
                        <div className="menu">
                            <nav >
                                {location.pathname !== '/' && <Link to="/">Crear Evento</Link>}

                                <Button className={'menu__expand'} onClick={handleOpen}>
                             {/*auth.nick_name*/}
                                 <Avatar alt="Remy Sharp" src={auth.picture} /> 
                           {console.log('auth',auth)}
                                </Button>
                                <div className="hola">
                                    <FormControl className={'select-header'}>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={open}
                                            onClose={handleClose}
                                            onOpen={handleOpen}
                                            value={''}
                                            onChange={handleChange}
                                        >
                                         {/*   <MenuItem value={'channel'}><span className="style-text"> <AccountBoxIcon style={{ marginRight: '4px' }} /> Ver mi canal</span></MenuItem>*/}
                                            <MenuItem value={'logout'}><span className="style-text"> <ExitToAppIcon style={{ marginRight: '4px' }} />  Cerrar Sesión</span></MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </nav>
                        </div>
                    </>
                }

            </header>
        </>
    )
}

export { Header }