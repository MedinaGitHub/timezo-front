import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import { format, parseISO } from 'date-fns'
import { enUS, fr } from 'date-fns/esm/locale'
import { PicSide } from './PicSide';
import { Header } from '../CreateEvent/Header';
import { TItle } from './Title';
import { TimeEvent } from './TimeEvent';
import { LetMeKnow } from './LetMeKnow';
import { Calendars } from './Calendars';
import { Logo } from '../Logo';

export default function ReadEvent() {

    const { id_owner, id_counter } = useParams();
    const [event_data, setEvent_data] = useState(null)


    const optionsTime =
    {
        //localeMatcher: "best fit", // lookup or best fit
        //timeZone: undefined,
        //hour12: true,              // true or false
        //formatMatcher: "best fit", // lookup or best fit
        //era: undefined,        // narrow, short, or long
        //year: "numeric",         // numeric or 2-digit
        month: "long",          // numeric, 2-digit, narrow, short, or long
        day: "numeric",          // numeric or 2-digit
        weekday: "long",        // narrow, short, or long
        hour: "numeric",         // numeric or 2-digit
        minute: "numeric",       // numeric or 2-digit
        //second: "numeric",       // numeric or 2-digit
        //timeZoneName: "short",   // short or long
    };


    useEffect(() => {
        const getProcedure = async () => {
            const procedure = await axios.get(`/api/events/${id_counter}/${id_owner}`);
            const localDate = parseISO(procedure.data[0]._event_time);
            procedure.data[0].time_local = localDate.toLocaleString(undefined, optionsTime)
                ;
            setEvent_data(procedure.data[0])
        }
        getProcedure()
    }, [id_owner, id_counter])
    return (
        <>
            <main>
            <Header />
                {event_data && <>
                    <PicSide link_event={event_data._link_event} picture={event_data._picture_event} />
                </>}
                <section className="box__info">
          
                    <div className="box__event">
                        <div className="share"></div>
                        <div className="cont__event">
                            {event_data && <>
                                <TItle 
                                  picture={event_data._picture_event}
                                  name={event_data._name}
                                  description={event_data._description}
                                  categories={event_data._categories} 
                                  nick_name={event_data._nick_name}
                                  />
                                <TimeEvent time={event_data.time_local} />
                                <LetMeKnow />
                                <Calendars name={event_data._name} timeTZ={event_data._event_time} timeLocal={event_data.time_local} />
                            </>}
                            {/*       <p className="cright">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit a ipsum quod eveniet excepturi.</p>*/}
                        </div>
                    </div>
                </section>


            </main>
        </>

    )
};