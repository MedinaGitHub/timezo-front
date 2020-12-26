import React, { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import axios from '../../utils/axios';


const HookForm = () => {

    const { register, errors, handleSubmit } = useForm();

    const [selectedDate, handleDateChange] = useState(new Date());
    const [link, setlink] = useState('')

    const onSubmit = async (data,e ) => {
        console.log('data', data)
        console.log('selectedDate', selectedDate)

        data._event_time = selectedDate

        const response  = await axios.post('api/create', {...data });
          console.log('response',response)

          ///:id_owner/:id_counter
          setlink(`${window.location.origin}/${response.data._nick_name}/${response.data._counter_id}`);

            e.target.reset();
    }

    return (
        <Fragment>
            <h2>Hooks Forms</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    name="_name"
                    ref={
                        register({
                            required: { value: true, message: 'Ingrese el nombre del evento' }
                        })
                    }
                    className="form-control my-2"
                    placeholder="Nombre evento"
                ></input>
                <span className="text-danger text-small d-block mb-2">
                    {errors?._name?.message}
                </span>

                <input
                    name="_link_event"
                    ref={
                        register({
                            required: { value: true, message: 'Ingrese el link por donde se transmitira' }
                        })
                    }
                    className="form-control my-2"
                    placeholder="Link del evento"
                ></input>
                <span className="text-danger text-small d-block mb-2">
                    {errors?._name?._link_event}
                </span>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        name="_event_time "
                        label="DateTimePicker"
                        inputVariant="outlined"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </MuiPickersUtilsProvider>

                <button type="submit" className="btn btn-primary">
                    Enviar
                </button>
            </form>
            <div>
               <h3> {link}</h3>
            </div>
        </Fragment>
    );
}

export { HookForm };

export default function CreateEvent() {
    return (
        <div>
            <HookForm />
        </div>
    )
};