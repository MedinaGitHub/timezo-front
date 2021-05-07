import React, { Fragment, useState, useRef, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form'
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import axios from '../../utils/axios';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import es from "date-fns/locale/es";
import { words } from '../../utils/words'
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
//check boxes form.
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { LensTwoTone } from '@material-ui/icons';

const PurpleCheckbox = withStyles({
    root: {
        color: "#8266E2",
        '&$checked': {
            color: "#8266E2",
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


const Form = ({ openModalSet, changeGoalTimeSet }) => {
    const { register, errors, handleSubmit } = useForm();

    const history = useHistory();
    const auth = useSelector(({ auth }) => auth);
    const [valueAutocomplete, setValueAutocomplete] = React.useState([]);
    const [selectedDate, handleDateChange] = useState(null);
    const [captcha, setCaptcha] = useState(null);
    const [link, setlink] = useState()
    const [error, setError] = useState()
    const [bodyFormData, setBodyFormData] = useState()
    const [loading, setLoading] = useState('Crear')
    const reRef = useRef();

    const [checkBoxes, setCheckBoxes] = React.useState({
        createAccount: false,
    });

    const handleChangeChecks = (event) => {
        setCheckBoxes({ ...checkBoxes, [event.target.name]: event.target.checked });
    };

    const sendDataToServer = async () => {
        if (bodyFormData) {
            var response;
            if (auth.token) {
                response = await axios.post('api/createAuth', bodyFormData, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': auth.token } });
            } else {
                response = await axios.post('api/create', bodyFormData, { headers: { 'Content-Type': 'multipart/form-data' } });
            }
            setLoading('Crear')
            if (response.data.message) {
                setError(response.data.message)
            } else {
                history.push("/" + response.data._nick_name + '/' + response.data.id);
            }
        }
    }

    useEffect(() => {
        if (bodyFormData) {
            if (checkBoxes.createAccount == false) {
                sendDataToServer()
            } else if (checkBoxes.createAccount == true && auth.token) {
                sendDataToServer()
            } else {
                //ejecutar el modal de registro.
                openModalSet(true);
            }
        }
    }, [bodyFormData, auth.token])

    useEffect(() => {
        if (bodyFormData) {
            if (checkBoxes.createAccount == false) {
                sendDataToServer()
            } else if (checkBoxes.createAccount == true && auth.token) {
                sendDataToServer()
            } else {
                //ejecutar el modal de registro.
                openModalSet(true);
            }
        }
    }, [auth.token])

    useEffect(() => {
        changeGoalTimeSet(selectedDate)
    }, [selectedDate])


    const onSubmit = async (data, e) => {
        setError(null)
        setLoading('Cargando...')
        let token_recaptcha = null;
        if (!captcha) {
            token_recaptcha = await reRef.current.executeAsync();
            setCaptcha(token_recaptcha)
        }
        var bodyFormData = new FormData();
        bodyFormData.append('token_recaptcha', captcha ? captcha : token_recaptcha);
        bodyFormData.append('_name', data._name);
        bodyFormData.append('_description', data._description);
        bodyFormData.append('_categories', JSON.stringify(valueAutocomplete));
        bodyFormData.append('_event_time', selectedDate);
        bodyFormData.append('_link_event', data._link_event);
        bodyFormData.append('galleryImage', data._picture[0]);
        setBodyFormData(bodyFormData)// ejecuta el useEffect

    }


    function showExtra() {
        var element = document.getElementById("extra");
        var btn = document.getElementById("btnExtra");
        element.classList.add("show");
        btn.classList.add("hide");
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form__event">
                    <div className="cont__form">
                        <div className="form--input">
                            <input type="text" autocomplete="off" className="normal" placeholder="Nombre Evento" minlength="2" maxlength="150" required
                                name="_name"
                                ref={
                                    register({
                                        required: { value: true, message: 'Ingrese el nombre del evento' }
                                    })}
                            />
                            <span>Nombre Evento</span>
                        </div>

                        <div className="form--input optional">
                            <input type="text" autocomplete="off" className="normal" placeholder="Descripción" minlength="0" maxlength="1000"
                                name="_description"
                                ref={
                                    register({
                                        required: { value: true, message: 'Ingrese la descripción del evento' }
                                    })}
                            />
                            <span>Descripción</span>
                            <h5>opcional</h5>
                        </div>

                        {/*<input type="text" className="normal" placeholder="Categorías" />*/}

                        <Autocomplete
                            name="_categories"
                            multiple
                            id="tags-filled"
                            value={valueAutocomplete}
                            options={words.map((option) => option)}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            onChange={(event, newValue) => {
                                setValueAutocomplete([...newValue])

                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Categorías" placeholder="Categoria" />
                            )}
                        />

                        <div className="form--input half border picture">
                            <input type="file"
                                id="file-4"
                                className="normal inputfile inputfile-3"
                                data-multiple-caption="{count} files selected"
                                accept=".jpg, .jpeg, .png, .gif"
                                placeholder="Imagen"
                                name="_picture"
                                ref={
                                    register({
                                        required: { value: true, message: 'Ingrese la imágen del evento' }
                                    })}
                                required />
                            <label for="file-4">
                                <h6>Imagen</h6>
                            </label>
                            <span>Imagen</span>
                        </div>

                        <div className="form--input half border date">
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                                <DateTimePicker
                                    className="seba"
                                    ampm={false}
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    label="Fecha & Hora"
                                />
                            </MuiPickersUtilsProvider>
                        </div>

                        <div className="form--input">
                            <input autocomplete="off" name="_link_event" type="text" className="normal" placeholder="Link Evento"
                                ref={
                                    register({
                                        required: { value: true, message: 'Ingrese la imágen del evento' }
                                    })}
                                required />
                            <span>Link evento</span>
                        </div>

                        <div className="bottom__form">

                            <FormControlLabel
                                control={
                                    <PurpleCheckbox
                                        checked={checkBoxes.createAccount}
                                        onChange={handleChangeChecks} name="createAccount"
                                    />
                                }
                                label="Quiero registrarme para gestionar mis eventos"
                            />

                            {/* 
                                <div class="opt" onClick={() => showExtra()} id="btnExtra">Opciones avanzadas</div>

                                    <div class="extra" id="extra">
                                        <div class="form--check">
                                            <label for="caca">Lorem ipsum dolor sit amet</label>
                                            <input type="checkbox" id="caca" checked />
                                            <span></span>
                                        </div>

                                        <div class="form--check">
                                            <label for="caca">Consectetur adipisicing elit</label>
                                            <input type="checkbox" id="caca" checked />
                                            <span></span>
                                        </div>
                                        <div class="form--check">
                                            <label for="caca">Laboriosam eaque ducimus eum autem</label>
                                            <input type="checkbox" id="caca" checked />
                                            <span></span>
                                        </div>
                                    </div>
                            */}


                        </div>
                        <button type="submit" className="btn--create">{loading}!</button>

                    </div>

                    {error &&
                        <div className="div-link">
                            <p className="error_create_event">{error} </p>
                        </div>
                    }

                    {link &&
                        <div className="div-link">
                            <p className="link_finally"> Tu link 👉🏻 <a target="_blank" href={`${link}`} >{link}</a> </p>
                        </div>
                    }
                </div>
            </form>

            <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA}
                ref={reRef}
                size="invisible"
            />
        </Fragment >
    )
}

export default Form;