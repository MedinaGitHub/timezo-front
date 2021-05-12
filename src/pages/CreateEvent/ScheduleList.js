import React, { useState, useEffect } from 'react'
import citiesUnicode from './myCities';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const calculateTimeZones = (cities, goal_time = moment().toDate()) => {
    const goal_tz = momentTimezone(goal_time);
    const unicodeTz = cities.map(city => {
        return {
            ...city,
            timezone: goal_tz.tz(city.name).format('LT')
        }
    }).reduce((acumulator, item) => {
        acumulator[item.timezone] = acumulator[item.timezone] || { code: [] };
        acumulator[item.timezone].code.push(item.code)
        return acumulator;
    }, {})
    return unicodeTz;
}
const calculateTimeZonesUnicode = (cities, goal_time = moment().toDate()) => {
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


const ScheduleBody = ({ goal_time }) => {

    const [listSchedule, setlistSchedule] = useState([])
    const [listScheduleTxt, setlistScheduleTxt] = useState('')

    useEffect(() => {
        if (goal_time) {
            var result = calculateTimeZones(citiesUnicode, goal_time);
            const listSchedulesCities = Object.entries(result);
            setlistSchedule(listSchedulesCities)

            var resultUnicode = calculateTimeZonesUnicode(citiesUnicode, goal_time);
            const listSchedulesCitiesUnicde = Object.entries(resultUnicode);
            const resultTxt = listSchedulesCitiesUnicde.reduce((acumulator, cities) => {
                acumulator = `${acumulator} ${cities[0]} \t${cities[1].unicode} \n`;
                return acumulator.replace(',', '')
            }, '')
            setlistScheduleTxt(resultTxt)
        }
    }, [goal_time])

    return (
        <>
            <div class="country--main">
                <div class="hour">Cambie fecha & hora para recalcular</div>
            </div>
            <div>
                <div >
                    <table style={{ width: '-webkit-fill-available', marginBottom: 10 }}>
                        {listSchedule.map((cities) => (
                            <>
                                <tr>
                                    <th style={{ paddingLeft: 50, textAlign: 'center' }}>
                                        {cities[0]}
                                    </th>
                                    <th style={{ paddingLeft: 50, textAlign: 'left' }}>
                                        {cities[1].code.map(item => (
                                            <img src={require(`../../img/flags/${item}.svg`).default} style={{ height: 20, marginRight: 5 }} />
                                        ))}
                                    </th>
                                </tr>
                            </>
                        ))}
                    </table>

                    <CopyToClipboard text={listScheduleTxt}>
                        <Tooltip title="Copiar en portapapeles horios y banderas ">
                            <FileCopyOutlinedIcon className='CopyFLags' />
                        </Tooltip>
                    </CopyToClipboard>
                </div>
            </div>
        </>
    )
}

export { ScheduleBody }