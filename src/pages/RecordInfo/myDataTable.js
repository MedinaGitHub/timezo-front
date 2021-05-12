/*import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';



export default function MyDataTable({ columns, rows }) {
    return (<>
        {console.log('rows', rows)}
        <div style={{ height: 700, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
        </div>
    </>
    );
}
*/
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'


export default function MyDataTable({ columns, rows }) {
    return (<>
        {console.log('rows', rows)}
        <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={columns}
          data={rows}
          title="Demo Title"
        />
      </div>
    </>
    );
}

