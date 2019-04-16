import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter, dateFilter, selectFilter } from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory,{ Type } from 'react-bootstrap-table2-editor';
import {APLICACIONES} from './Aplicaciones';

import { ACTIVIDADES } from './Actividades';

let incFilter;
let dateFil;
let hsFilter;
let titFilter;
let actFilter;
let appFilter;
let obsFilter;

export const columnsWithFilters= [{
    
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
        filter: textFilter({getFilter: (filter) => {
                        incFilter = filter;
                    }
                })
    },{
    dataField:'fecha_actividad',
        text:'Fecha',
        filter: dateFilter({
            style: { display: 'inline-grid' },
            getFilter: (filter) => {
                dateFil = filter;
            }
        }),
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
    },
    filter: textFilter({getFilter: (filter) => {
                            hsFilter = filter;
                        }
                    }) 
},{
    dataField:'titulo',
    text:'Titulo PPM-OT / Titulo Incidencia',
    sort:true,
    filter: textFilter({getFilter: (filter) => {
                            titFilter = filter;
                            }
                        })
},{
    dataField:'actividad',
    text:'Actividad',
    editor: {
        type: Type.SELECT,
        options: ACTIVIDADES
    },
    sort:true,
    //formatter: cell => ACTIVIDADES[cell],
    filter: selectFilter({
            options: ACTIVIDADES,
            getFilter: (filter) => {
                            actFilter = filter;
                        } 
            })
        
},{
    dataField:'app_afectada',
    text:'Aplicación Afectada',
    editor: {
        type: Type.SELECT,
        options: APLICACIONES
        },
    sort:true,
    //formatter: cell => APLICACIONES[cell],
    filter: selectFilter({
                options: APLICACIONES,
                getFilter: (filter) => {
                            appFilter = filter;
                            } 
                        })
},{
    dataField:'observaciones',
    text:'Observaciones',
    editor: {
        type: Type.TEXTAREA
      },
    filter: textFilter({getFilter: (filter) => {
                                    obsFilter = filter;
                                    } 
                        })
}/*,{
    dataField:'eid',
    text:'Enterprise Id'
}*/];

export const clearAllFilters = () =>{
    incFilter('');
    dateFil('');
    hsFilter('');
    titFilter('');
    actFilter('');
    appFilter('');
    obsFilter('');
}



