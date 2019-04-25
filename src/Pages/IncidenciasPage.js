import React, { Component } from 'react';
import {Table,Spinner} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory,{ Type } from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

class IncidenciasPage extends Component {
    constructor(props){
        super(props)
        this.state={
            listaIncidencias:[],
            columns:[{
              dataField:'id',
              text:'#',
              headerStyle: (colum, colIndex) => {
                return { width: '40px', textAlign: 'center' };
              }
            },{
              dataField:'nroInc',
              text:'Nro Incidencia'
            },{
              dataField:'usrAsignado',
              text:'Usr asignado'
            },{
              dataField:'estado',
              text:'Estado'
            }]
            ,
            rowsValues:[]
          }
    }

    componentDidMount(){
      let loading = () => <div><Spinner animation="border" /></div>
    }
    componentWillMount(){
        
      //fetch("http://192.168.0.9:5006/informe/incidents")
      fetch("http://10.244.48.33:5006/informe/incidents")
      //fetch("http://10.244.49.48:5006/informe/incidents")
      //fetch("http://localhost:5006/informe/incidents")
            .then(res => res.json())
            .then(
            (result) => {
                console.log("LISTA INC: ",result);
                console.log("LISTA INC TAM: ",result.length);
                this.setState({rowsValues:result});
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log("ERRORES: ",error)
            }
            )
        }

        

  render() {

    const MyExportCSV = (props) => {
      const handleClick = () => {
        props.onExport();
      };
        return (
          <div>
            <button className="btn btn-success" onClick={ handleClick }>Export to CSV</button>
          </div>
        );
      };
    
    const { SearchBar } = Search;

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
        text: '20', value: 20
      }, {
        text: '30', value: 30
      }
      ] // A numeric array is also available. the purpose of above example is custom the text
    };
    
    return (

      <ToolkitProvider
        keyField="id"
        data={ this.state.rowsValues }
        columns={ this.state.columns }
        exportCSV={ {
          fileName: 'Historico incidencias.csv',
          separator: ';',
          ignoreHeader: false,
          noAutoBOM: false
          } 
        }
        search
      >
        {
          props => (
            <div>
              <br/>
                  <SearchBar  { ...props.searchProps }
              />
              <br/>
              <BootstrapTable { ...props.baseProps}
                keyField="id"
                striped
                hover
                condensed
                data={ this.state.rowsValues }
                columns={ this.state.columns }
                bootstrap4={true}
                pagination={ paginationFactory(pagOptions) }
                cellEdit={ 
                  cellEditFactory({ 
                    mode: 'click',
                    autoSelectText: true,
                    blurToSave: true                
                  })
                }
                />
                <hr />
                <MyExportCSV { ...props.csvProps } />
            </div>
            )
          }
        </ToolkitProvider>
      
    );
  }
}

export default IncidenciasPage;
