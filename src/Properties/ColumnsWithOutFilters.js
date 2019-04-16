import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter, dateFilter, selectFilter } from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory,{ Type } from 'react-bootstrap-table2-editor';
import {APLICACIONES} from './Aplicaciones';

import { ACTIVIDADES } from './Actividades';

export const columnsWithOutFilters=[{
    /*carga_esf_inc_id*/ 
    dataField:'frontEndManualChargeTableId',
        text:'#',
        headerStyle: (colum, colIndex) => {
            return { width: '40px', textAlign: 'center' };
        }
    },{
    dataField:'inc_id',
        text:'Nro Inc - PRY OT',
        sort:true,
    },{
    dataField:'fecha_actividad',
        text:'Fecha',
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
            return { width: '250px', textAlign: 'center' };
}
},{
    dataField:'horas',
    text:'Min/Hs',
    headerStyle: (colum, colIndex) => {
        return { width: '70px', textAlign: 'center' };
      },
    validator: (newValue, row, column) => {
    if (isNaN(newValue)) {
        return {
        valid: false,
        message: 'No num'
        };
    }
    if(newValue < 0){
        return{
            vslid:false,
            message:'(-)'
        };
    }    
    return true;
    } 
},{
    dataField:'titulo',
    text:'Titulo PPM-OT / Titulo Incidencia',
    sort:true
},{
    dataField:'actividad',
    text:'Actividad',
    editor: {
        type: Type.SELECT,
        options: ACTIVIDADES
    },
    sort:true
},{
    dataField:'app_afectada',
    text:'Aplicación Afectada',
    editor: {
        type: Type.SELECT,
        options: APLICACIONES
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