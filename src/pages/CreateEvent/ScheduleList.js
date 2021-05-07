import React, { useState, useEffect } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import citiesUnicode from './myCities';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import Button from '@material-ui/core/Button';
import FileCopy from '@material-ui/icons/FileCopy';

const PurpleCheckbox = withStyles({
    root: {
        color: "#8266E2",
        '&$checked': {
            color: "#8266E2",
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const calculateTimeZones = (cities, goal_time = moment().toDate()) => {
    const goal_tz = momentTimezone(goal_time);
    const unicodeTz = cities.map(city => {
        return {
            ...city,
            timezone: goal_tz.tz(city.name).format('LT')
        }
    }).reduce((acumulator, item) => {
        acumulator[item.timezone] = acumulator[item.timezone] || { unicode: [] };
        acumulator[item.timezone].unicode.push(item.unicode)
        return acumulator;
    }, {})
    return unicodeTz;
}

const ScheduleList = ({ goal_time }) => {

    const [listSchedule, setlistSchedule] = useState([])
    const [listScheduleTxt, setlistScheduleTxt] = useState('')

    useEffect(() => {
        if (goal_time) {
            var result = calculateTimeZones(citiesUnicode, goal_time);
            const listSchedulesCities = Object.entries(result);
            setlistSchedule(listSchedulesCities)
            const resultTxt = listSchedulesCities.reduce((acumulator, cities) => {
                acumulator = `${acumulator} ${cities[0]} \t${cities[1].unicode} \n`;
                return acumulator.replace(',', '')
            }, '')
            setlistScheduleTxt(resultTxt)
        }
    }, [goal_time])

    return (
        <>
            <div className="date--box__extra" id="Horarios">
                <div className="header">
                    <h2>Horarios en distintos paises</h2>

                    <div className="date__cont">
                        <h5 >Seleccione Fecha & hora para recalcular</h5>
                    </div>

                </div>
                <div className="body">
                    <div className="order">
                        {/* <div className="ic"></div>
                        <span>Idioma</span>*/}
                    </div>

                    <div className="result">
                        <table>
                            {listSchedule.map((cities) => (
                                <>
                                    <tr>
                                        <th style={{ paddingLeft: 10, textAlign: 'left' }}>
                                            {cities[0]}
                                        </th>
                                        <th style={{ paddingLeft: 10, textAlign: 'left' }}>
                                            {cities[1].unicode}
                                        </th>
                                    </tr>

                                </>
                            ))}
                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#8266e2', color: '#fff', marginTop: 17 }}
                                size="small"
                                startIcon={<FileCopy />}
                            >
                                <span> Copy</span>
                            </Button>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}

const ScheduleBody = ({ goal_time }) => {

    const [listSchedule, setlistSchedule] = useState([])

    useEffect(() => {
        if (goal_time) {
            var result = calculateTimeZones(citiesUnicode, goal_time);
            const listSchedulesCities = Object.entries(result);
            setlistSchedule(listSchedulesCities)
        }
    }, [goal_time])

    return (
        <>
                <div>  
                    <div >
                        <table style={{width: '-webkit-fill-available'}}>
                            {listSchedule.map((cities) => (
                                <>
                                    <tr>
                                        <th style={{ paddingLeft: 10, textAlign: 'center' }}>
                                            {cities[0]}
                                        </th>
                                        <th style={{ paddingLeft: 10, textAlign: 'left' }}>
                                            {cities[1].unicode}
                                        </th>
                                    </tr>
                                </>
                            ))} 
                        </table>
                    </div>
                </div>
        </>
    )
}

export { ScheduleList, ScheduleBody }