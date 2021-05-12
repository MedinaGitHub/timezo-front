import React, { Component, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link, useHistory } from 'react-router-dom';
import axios from '../../utils/axios';
import MyDataTable from './myDataTable';


const columns = [

    { field: '_id', title: 'id' },
    { field: 'createdAt', title: 'createdAt', width: 190 },
    { field: 'email', title: 'email', width: 190 },
    { field: 'name', title: 'name' },
    { field: 'nick_name', title: 'nick_name', width: 190 },
];

const columnsEvents = [
    { field: 'link', title: 'link' },
    { field: '_categories', title: 'name' },
    { field: '_link_event', title: 'email', width: 190 },
    { field: '_name', title: 'id' },
    { field: '_nick_name', title: 'createdAt', width: 190 },
    { field: 'id', title: 'ID', width: 190 },
];

export default function RecordInfo() {
    const isAuth = useSelector(({ auth }) => auth.token !== null && typeof auth.token !== 'undefined' && auth.email != null);

    const [users, setUsers] = useState(null)

    const [events, setEvents] = useState([])

    useEffect(() => {
        const getProcedure = async () => {
            if (isAuth) {
                const token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] = token;
                axios.defaults.headers.common.Authorization = token;
                const response = await axios.get(`/api/myRecordUsers`);
                const result = response.data.map((item, index) => {
                    return {
                        ...item,
                        id: index + 1
                    }
                })
                setUsers(result)

                const responseEvents = await axios.get(`/api/myRecordEvents`);
                const resultEvents = responseEvents.data.map((item, index) => {
                    return {
                        ...item,
                        link: 'https://timezo.io/' + item._nick_name + '/' + item.id
                    }
                })

                setEvents(resultEvents)

            }
        }
        getProcedure()
    }, [isAuth])


    return (
        <>
            {users &&
                <>
                    <h1>Usuarios</h1>
                    <MyDataTable columns={columns} rows={users} />
                    <h1>Eventos</h1>
                    <MyDataTable columns={columnsEvents} rows={events} />
                </>
            }
        </>
    )
}
