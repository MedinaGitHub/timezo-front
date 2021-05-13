import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import GoogleLogin from 'react-google-login';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';

import { authGoogle } from '../../reducer/auth';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const Signup = ({ valueOpen = false, openModalSet }) => {
    const [open, setOpen] = React.useState(valueOpen);
    const [value, setValue] = React.useState('');
    const dispatch = useDispatch();
    const auth = useSelector(({ auth }) => auth);

    useEffect(() => {
        setOpen(valueOpen)
    }, [valueOpen])

    const responseGoogle = async (response) => {
        if (response.profileObj) {
            //pegarle a la API
            //   const token = await axios.post('api/auth/google', { data: response, nickname: value });
            dispatch(authGoogle({ data: response, nickname: value }));
            // console.log('token', token)
        }
    };

    useEffect(() => {
        console.log('ocurrio un erroor', auth.error)
    }, [auth.error])

    useEffect(() => {
        if (auth.token && auth.email) {
            try {
                openModalSet(false)
            } catch (error) {
            }
        }
    }, [auth.token])

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        auth.error = ''
        try {
            openModalSet(false)
            setOpen(false);
        } catch (error) {
        }
    };
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <span className="google-text">Registro con Google</span>
                </DialogTitle>
                <DialogContent dividers>
                    <div className="modalRegistro">
                        <TextField
                            id="outlined-textarea"
                            label="Ingresa cual será tu nickname"
                            placeholder="Ejemplo: Cosme_fulanito"
                            multiline
                            variant="outlined"
                            value={value}
                            onChange={handleChange}
                        />
                        {
                            value.length <= 3 &&
                            <>
                                <GoogleLogin
                                    buttonText="Identificarme con mi correo de Google"
                                />
                                <Typography className="register-notice" variant="caption" display="block" gutterBottom>
                                    *Ingresa primero un nickname
                                </Typography>
                            </>
                        }
                        {
                            value.length > 3 &&
                            <GoogleLogin
                                clientId="571028661086-ep938aqcle3uqot5f40mjmujqacpr67g.apps.googleusercontent.com"
                                buttonText="Identificarme con mi correo de Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        }

                        {
                            auth.error &&
                            <p className="error_login">{auth.error} </p>
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export { Signup }