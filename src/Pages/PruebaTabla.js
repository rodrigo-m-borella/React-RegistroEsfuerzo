import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory,{ Type } from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';

class PruebaTabla extends Component {
    
    constructor(props){
        super(props)
        this.state={
            columns:[{                
                dataField:'id',
                text:'id',
                headerStyle: (colum, colIndex) => {
                    return { width: '40px', textAlign: 'center' };
                  }
                },{
                dataField:'field',
                text:'field',
                },{
                dataField:'fecha_actividad',
                text:'Fecha Actividad',
                  formatter: (cell) => {
                    let dateObj = cell;
                    if (typeof cell !== 'object') {
                        dateObj = new Date(cell);
                        console.log('dateObj',dateObj)
                        dateObj.setDate(dateObj.getDate() + 1)
                        console.log('dateObj plus 1',dateObj)
                    }
                    return `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
                    
                    },    
                    editor: {
                    type: Type.DATE
                    }
                }],
                rowsValues: [{
                    id:1,
                    field:'field1',
                    fecha_actividad:'2019-04-03T00:00:00.000Z'
                },{
                    id:2,
                    field:'field2',
                    fecha_actividad:'2019-04-01' 
                },{
                    id:3,
                    field:'field3',
                    fecha_actividad:'04/01/2019'
                },{
                    id:4,
                    field:'field4',
                    fecha_actividad:'01/04/2019'
                },{
                    id:5,
                    field:'field5',
                    fecha_actividad:'2019-01-04'
                },{
                    id:6,
                    field:'field6',
                    fecha_actividad:'2019-3-31'
                }]
            
        }
    }

    afterSaveCell(){
        console.log('rowsValues',this.state.rowsValues)
    }

    render() {
        const pagOptions = {
            paginationSize: 4,
            pageStartIndex: 0,
            // alwaysShowAllBtns: true, // Always show next and previous button
            // withFirstAndLast: false, // Hide the going to First and Last page button
            // hideSizePerPage: true, // Hide the sizePerPage dropdown always
            // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            sizePerPageList: [{
              text: '10', value: 10
            }, {
              text: '15', value: 15
            }, {
                text: '20', value: 20
              }
            ] // A numeric array is also available. the purpose of above example is custom the text
          };
          const selectRow = {
            mode: 'checkbox',
            clickToSelect: false,
            style: { backgroundColor: '#D1DEFF', color:'black' },
            clickToEdit: true,
            selected: this.state.newSelectedRows,
            onSelect: (row, isSelect, rowIndex, e) => {
                row.selected='true';
              },
          };
        return (
            <div>
                 <BootstrapTable
                    keyField="id"
                    striped
                    hover
                    condensed
                    pagination={ paginationFactory(pagOptions) }
                    data={ this.state.rowsValues }
                    columns={ this.state.columns }
                    bootstrap4={true} 
                    cellEdit={ cellEditFactory({ 
                        mode: 'click',
                        blurToSave: true,
                        autoSelectText: false, 
                        //onStartEdit:this.onStartEdit.bind(this),
                        //beforeSaveCell:this.beforeSaveCell.bind(this),
                        afterSaveCell:this.afterSaveCell.bind(this)
                        })
                    }
                    selectRow={ selectRow }
                     />
            </div>
        );
    }
}
export default PruebaTabla;