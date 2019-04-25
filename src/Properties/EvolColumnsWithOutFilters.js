import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter, dateFilter, selectFilter } from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory,{ Type } from 'react-bootstrap-table2-editor';
import {APPS} from './Apps';
import {EVOLHOURS} from './EvolHours';

import { EVOLACTIVITIES } from './EvolActivities';

export const evolColumnsWithOutFilters=[{
    /*carga_esf_inc_id*/ 
    dataField:'frontEndManualChargeTableId',
        text:'#',
        headerStyle: (colum, colIndex) => {
            return { width: '40px', textAlign: 'center' };
        }
    },{
    dataField:'pry',
        text:'PRY',
        sort:true,
    },{
        dataField:'ot',
            text:'OT',
            sort:true,
    },{
    dataField:'fecha_actividad',
        text:'Fecha actividad',
        formatter: (cell) => {
            let dateObj = cell;
            if (typeof cell !== 'object') {
                dateObj = new Date(cell);
                dateObj.setDate(dateObj.getDate() + 1)
            }
            return `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
        
        },
        editor: {
            type: Type.DATE
        },
        sort:true,
        headerStyle: (colum, colIndex) => {
            return { width: '180px', textAlign: 'center' };
}
},{
    dataField:'horas',
    text:'Hs',
    headerStyle: (colum, colIndex) => {
        return { width: '100px', textAlign: 'center' };
      },
      editor: {
        type: Type.SELECT,
        options: EVOLHOURS
    }
},{
    dataField:'horastasa',
    text:'TASA',
    headerStyle: (colum, colIndex) => {
        return { width: '70px', textAlign: 'center' };
      },
    editable: false 
},{
    dataField:'titulo',
    text:'Titulo PPM-OT',
    sort:true
},{
    dataField:'actividad',
    text:'Actividad',
    editor: {
        type: Type.SELECT,
        options: EVOLACTIVITIES
    },
    sort:true
},{
    dataField:'app_afectada',
    text:'Aplicación Afectada',
    editor: {
        type: Type.SELECT,
        options: APPS
        },
    sort:true
},{
    dataField:'observaciones',
    text:'Observaciones',
    editor: {
        type: Type.TEXTAREA
      }
}/*,{
    dataField:'eid',
    text:'Enterprise Id'
}*/]