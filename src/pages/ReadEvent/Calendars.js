import React, { Component, useEffect, useState } from 'react'
import { google, outlook, office365, yahoo, ics } from "calendar-link";
import Bowser from "bowser";


const Calendars = ({ name, timeTZ }) => {

    const [browser, setBrowser] = useState()
    const bowseer = Bowser.getParser(window.navigator.userAgent);

    const event = {
        title: name,
        start: timeTZ
    };

    const openCalendar = (link) => {
        window.open(link, "_blank")
    }
    const sw = navigator.serviceWorker;

    function pad(num, size = 2) {
        let s = num + '';
        while (s.length < size) s = '0' + s;
        return s;
    }

    useEffect(() => {
        console.log(1)
        console.log('sw', sw)
        if (sw && browser == true) {
            console.log(2)
            /*global showNotification, TimestampTrigger*/
            /*eslint no-undef: "error"*/
            const requestServices = async () => {
                debugger

                if ("showTrigger" in Notification.prototype) {
                    /* Notification Triggers supported */
                    console.log('Notification Triggers supported')
                }
                debugger;
                const reg = await sw.getRegistration();



                Notification.requestPermission().then(permission => {
                    if (permission !== 'granted') {
                        alert('you need to allow push notifications');
                    } else {
                        const timestamp = new Date().getTime() + 10 * 1000;
                        const scheduledTime = new Date(timestamp);
                        console.log('reeg', reg)


                        console.log(bowseer.getBrowser());

                        if (bowseer.getBrowser().name == "Chrome") { //TODO: REVIEW VERSION > 80
                            reg.showNotification(
                                'Scheduled Push Notification',
                                {
                                    tag: timestamp, // a unique ID
                                    body: 'Hi there, it\'s ' + pad(scheduledTime.getHours()) + ':' + pad(scheduledTime.getMinutes()), // content of the push notification
                                    showTrigger: new TimestampTrigger(timestamp), // set the time for the push notification
                                    data: {
                                        url: window.location.href, // pass the current url to the notification
                                    }
                                }
                            );
                        } else {
                            reg.showNotification(
                                'Scheduled Push Notification',
                                {
                                    tag: timestamp, // a unique ID
                                    body: 'Hi there, it\'s ' + pad(scheduledTime.getHours()) + ':' + pad(scheduledTime.getMinutes()), // content of the push notification
                                    timestamp: timestamp, // set the time for the push notification
                                    data: {
                                        url: window.location.href, // pass the current url to the notification
                                    }
                                }
                            );
                        }
                    }
                });


            }
            requestServices();

        }
    }, [sw, browser])

    return (
        <div className="calendars">
            <p>También, recuerdame</p>
            <ul>
                <li style={{cursor:'pointer'}} onClick={() => openCalendar(google(event))}>
                    <div className="ic google"></div>
                    <div className="info">
                        <span>Calendar</span>
                        <h4>Google</h4>
                    </div>
                </li>
                <li style={{cursor:'pointer'}}  onClick={() => openCalendar(ics(event))}>
                    <div className="ic apple"></div>
                    <div className="info">
                        <span>Calendar</span>
                        <h4>Apple</h4>
                    </div>
                </li>
                <li style={{cursor:'pointer'}}  onClick={() => openCalendar(outlook(event))}>
                    <div className="ic outlook"></div>
                    <div className="info">
                        <span>Calendar</span>
                        <h4>Outlook</h4>
                    </div>
                </li>
            </ul>

            { bowseer.getBrowser().name == "Chrome" && <div className="browser" onClick={() => setBrowser(true)}>
                <p style={{cursor:'pointer'}} >Nah! prefiero en mi navegador</p>
                <div style={{cursor:'pointer'}}  className="ic chrome"></div>
            </div>}


            {/*
              <p className="cright">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit a ipsum quod eveniet excepturi.</p>
            */}
        </div>
    )
}

export { Calendars }