import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import GoogleLogin from 'react-google-login';
import axios from '../../utils/axios';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';

import { authGoogleSignIN } from '../../reducer/auth';

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

const Signin = () => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const auth = useSelector(({ auth }) => auth);

    const responseGoogle = async (response) => {
         
        if (response.profileObj) {
            //pegarle a la API
            //   const token = await axios.post('api/auth/google', { data: response, nickname: value });

            dispatch(authGoogleSignIN({ data: response }));
             ;
            // console.log('token', token)
        }
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        auth.error = ''
        setOpen(false);
    };

    return (
        <>

            <nav class="cursorzone" onClick={handleClickOpen}>
                <a >Crear</a>
                <a >Ingresar</a>

            </nav>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <span className="google-text">Inicio sesión con Google</span>
                </DialogTitle>
                <DialogContent dividers>
                    <div className="modalRegistro">
                        <GoogleLogin
                            clientId="571028661086-ep938aqcle3uqot5f40mjmujqacpr67g.apps.googleusercontent.com"
                            buttonText="Identificarme con mi correo de Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
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

export { Signin }