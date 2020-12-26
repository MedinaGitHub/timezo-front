import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import { format, parseISO } from 'date-fns'

export default function ReadEvent() {

    const { id_owner, id_counter } = useParams();
    const [event_data, setEvent_data] = useState(null)

    useEffect(() => {
        const getProcedure = async () => {
            const procedure = await axios.get(`/api/events/${id_counter}/${id_owner}`);
            const localDate = parseISO(procedure.data[0]._event_time);
            procedure.data[0].time_local = format(localDate, 'MMMM dd, yyyy, EEEE, hh:mm aaa')
            setEvent_data(procedure.data[0])
        }
        getProcedure()
    }, [id_owner, id_counter])
    return (
        <div>
            {event_data &&
                <>
                    <h3>{event_data._name}</h3>
                    <h3>{event_data._link_event}</h3>
                    <h2>{event_data.time_local}</h2>
                </>}
        </div>
    )
};