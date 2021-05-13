import React from 'react';
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { green, purple } from '@material-ui/core/colors';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));
const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#8266e2'),
        backgroundColor: '#8266e2',
        '&:hover': {
            backgroundColor: '#522ecc',
        },
    },
}))(Button);

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

export default function ClipBoardUrl({ txt ,copyTxt }) {
    const classes = useStyles();

    return (
        <PopupState variant="popper" popupId="demo-popup-popper">
            {(popupState) => (
                <div>
                    <CopyToClipboard text={copyTxt}>
                        <ColorButton variant="contained" color="primary" className={'ShareThisLink'}  {...bindToggle(popupState)}>
                            {txt}
                        </ColorButton>
                    </CopyToClipboard>
                    <Popper {...bindPopper(popupState)} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper>
                                    <Typography className={classes.typography}>{`Url copiada en portapapeles`}</Typography>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </div>
            )}
        </PopupState>
    );
}