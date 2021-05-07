import React, { useState, useEffect } from 'react'
import { Header } from './Header';
import { Signup } from './Signup'
import Form from './Form'
import { Logo } from '../Logo';
import { Link } from "react-router-dom";
import { ScheduleList } from './ScheduleList';
import moment from 'moment';


export default function CreateEvent() {
    const [value, setValue] = useState(false);
    const [goal_time, setVGoalTime] = useState(moment().toDate());
    const openModalSet = (val) => { setValue(val) }
    const changeGoalTimeSet = (val) => { setVGoalTime(val) }


    return (
        <main>
            <Signup valueOpen={value} openModalSet={openModalSet} />
            <Header openModalSet={openModalSet} />
            <Form openModalSet={openModalSet} changeGoalTimeSet={changeGoalTimeSet} />
            <ScheduleList goal_time={goal_time} />
            <div class="bg__full"></div>
            <div>
                <ul className='list-footer'>
                    <li> <span >contacto@labsinnova.cl</span> </li>
                    <li> <Link to="/terms_and_Conditions">Terms And Conditions</Link></li>
                    <li><Link to="/privacy_policy">Privacy Policy</Link> </li>
                </ul>
            </div>
        </main>
    )
};