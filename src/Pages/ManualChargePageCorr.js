import React, { Component } from 'react';
import {Button,Row, Container,Image, Col, Modal} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory,{ Type } from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {columnsWithFilters,clearAllFilters} from '../Properties/ColumnsWithFilters';
import {columnsWithOutFilters} from '../Properties/ColumnsWithOutFilters';
import filterFactory, { textFilter, dateFilter, selectFilter } from 'react-bootstrap-table2-filter';
import latigo from '../img/latigo-sm.png';

class ManualChargePage extends Component {
  
    constructor(props){
        super(props)
        
        this.state={
            
            listaIncidencias:[],
            nextValTableId:'0',
            currentDay:'',
            columns: columnsWithOutFilters,
            rowsValues: [],
            newSelectedRows:[],
            currentPage:0,/*esta variable por ahora no se usa, es para el redireccionamiento a la 1er pag luego de add*/ 
            exportName:'',
            withFilters:false,
            showModalError:false,
            errorMessage:'',
            adding:false,
            showModalDialog:false,
            modaDialogTitle:'',
            modaDialogBody:'',
            confirmDelete:false
        }
        
        this.loadPage = this.loadPage.bind(this);
        this.validateMandatoryItemsFields = this.validateMandatoryItemsFields.bind(this);
    }

    loadPage(){
        this.setState({adding:false})
        this.setState({newSelectedRows:[]})
        //var url = new  URL("http://192.168.0.9:5006/informe/myincidents")
        //var url = new  URL("http://10.244.49.48:5006/informe/myincidents")
        var url = new  URL("http://10.244.48.33:5006/informe/myincidents")
        //var url = new  URL("http://10.244.48.33:5006/informe/myincidents")
        var params = {eid: localStorage.getItem('usersession')}
        url.search = new URLSearchParams(params)
        fetch(url)
        .then(res => res.json())
        .then(
        (result) => {
           var reverseResult = result.reverse()
           this.setState({rowsValues:reverseResult});
           sessionStorage.setItem('nextValTableId',result.length+1);
          console.log('rowsValues: ',this.state.rowsValues) 
        },
       // Note: it's important to handle errors here
       // instead of a catch() block so that we don't swallow
       // exceptions from actual bugs in components.
        (error) => {
           console.log("ERRORES: ",error)
        }
       )
   }
    
    
    componentWillMount(){
        this.loadPage()
        }

//sessionStorage.setItem('rowsValues',reverseResult);
    addRow(){
        this.setState({adding:true})
        var temprowsValues = this.state.rowsValues.reverse()
        var nextValTableId = sessionStorage.getItem('nextValTableId')
        var eid = localStorage.getItem('usersession')
        var emptyElement = { 
            frontEndManualChargeTableId:nextValTableId,
            carga_esf_inc_id:'',
            inc_id:'',
            fecha_actividad:this.state.currentDay,
            horas:'',
            titulo:'',
            actividad:'',
            app_afectada:'',
            observaciones:'',
            eid: eid,
            selected: true
        }
        var newSelectedRows = this.state.newSelectedRows
        
        newSelectedRows.push(nextValTableId)
        this.setState({newSelectedRows:newSelectedRows})
        
        temprowsValues.push(emptyElement)
        this.setState({rowsValues:temprowsValues.reverse()})
        nextValTableId++
        sessionStorage.setItem('nextValTableId',nextValTableId)
        this.setState({currentPage:0})
    }

    validateMandatoryItemsFields(itemsToSave){
        console.log('entra a validateMandatoryItemsFields')
        var valid=true
        itemsToSave.map((item)=>{
            if ((item.inc_id=='') || (item.fecha_actividad=='') || (item.horas=='') || (item.actividad=='')){
                this.setState({errorMessage:'Los Campos Nro Inc, Fecha actividad, Min y Actividad, son obligatorios'})
                this.setState({showModalError:true})
                valid = false
            }
        })
        return valid
    }

    save(){
        var itemsToSave = []
        /*console.log('grilla total',this.state.rowsValues)*/
        this.state.rowsValues.map((item,key) =>{
            if(item.selected){
                itemsToSave.push(item)
            }
        })

        if (itemsToSave.length==0){
            this.setState({errorMessage:'0 ítems seleccionados para guardar'})
            this.setState({showModalError:true})
        }else if (this.validateMandatoryItemsFields(itemsToSave)){  
                console.log('entra al fecth del save')          
                //fetch('http://192.168.0.9:5006/informe/updateManualCharge',
                //fetch('http://10.244.49.48:5006/informe/updateManualCharge',
                fetch('http://10.244.48.33:5006/informe/updateManualCharge',
                //fetch('http://10.244.48.33:5006/informe/updateManualCharge',
                    {
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(itemsToSave)
                    })
                    .then(res=>res.json())
                    .then(
                    result=>{
                        this.loadPage()
                    },
                    (error)=>{
                        console.log("error: ", error)
                        }
                    )
            }
        
    }

    delete(){
        var itemsToDelete = []
        this.state.rowsValues.map((item,key) =>{
            if(item.selected){
                itemsToDelete.push(item)
            }
        })
        if (itemsToDelete.length!=0){
                //fetch('http://10.244.49.48:5006/informe/deleteManualCharge',
                fetch('http://10.244.48.33:5006/informe/deleteManualCharge',
                    {
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(itemsToDelete)
                    })
                    .then(res=>res.json())
                    .then(
                    result=>{
                        this.setState({showModalDialog:false})
                        this.loadPage()
                    },
                    (error)=>{
                        console.log("error: ", error)
                        }
                    )
            }
    }

    confirmDelete(){        
        var itemsToDelete = []
        /*console.log('grilla total',this.state.rowsValues)*/
        this.state.rowsValues.map((item,key) =>{
            if(item.selected){
                itemsToDelete.push(item)
            }
        })
        if (itemsToDelete.length!=0){
            this.setState({modaDialogTitle:'Atención'})
            this.setState({modaDialogBody:'Está seguro que quiere eliminar los ítems seleccionados?'})
            this.setState({showModalDialog:true})           
            }
        
    }



    copy(){

        if(!this.state.adding){
            var nextValTableId =  Number (sessionStorage.getItem('nextValTableId'));
            var eid = localStorage.getItem('usersession')
            var temprowsValues = this.state.rowsValues.reverse()
            var _newSelectedRows = []

            this.state.rowsValues.map((item,key) =>{
                if(item.selected){
                    var copiedElement ={
                        frontEndManualChargeTableId:nextValTableId,
                        carga_esf_inc_id:'',
                        inc_id:item.inc_id,
                        fecha_actividad:this.state.currentDay,
                        horas:'',
                        horastasa:'',
                        titulo:item.titulo,
                        actividad:item.actividad,
                        app_afectada:item.app_afectada,
                        observaciones:'',
                        eid: eid,
                        selected: true
                        }                      
                    
                    item.selected=false
                    _newSelectedRows.push(nextValTableId)
                    temprowsValues.push(copiedElement)
                    
                    nextValTableId++
                }
                
                
            });
            
            this.setState({rowsValues:temprowsValues.reverse()})
            sessionStorage.setItem('nextValTableId',nextValTableId)
            
            this.setState({newSelectedRows:_newSelectedRows})

            this.setState({currentPage:0})
        }else{
            this.setState({errorMessage:'Guarde las filas agregadas antes de copiar'})
            this.setState({showModalError:true})
        }
        
    }
 
       

    componentDidMount(){
        var days = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        
        var now = new Date()
        Date.prototype.getDayName = function() {
            return days[ this.getDay() ];
        };
        var dayname = now.getDayName()
  
        if(date<10){
            date=`${('0' + date)}`;
        }
        if(month<10){
            month=`${('0' + month)}`;
        }

        var fecha_combodate =  `${year}-${month}-${date}`;
        this.setState({
          //Setting the value of the date time
          //currentDay:year + '-' + month + '-' +date 
          currentDay:fecha_combodate 
            })
        var fecha_exportName= `${date}-${month}-${year}`;
        var exportName='Esfuerzo_Inc_'+localStorage.getItem('usersession')+'_'+fecha_exportName+'.csv'
        this.setState({exportName:exportName})
    }

    afterSaveCell(oldValue, newValue, row, column){
        if (column.dataField=='actividad'){
            if(row.actividad=='Incidencia'){
                if((row.horas<15) && (row.horas!=0) && (row.horas!='')){
                    this.setState({errorMessage:'La cantidad mínima de minutos por incidencia es de 15.'})
                    this.handleShowModalError()
                    row.horas=''
                }else{
                    if (row.horas<=120){
                        row.horastasa=120    
                    }else{
                        if (row.horas<=240){
                            row.horastasa=240
                        }else{
                            if (row.horas<=360){
                                row.horastasa=360
                            }else{
                                if (row.horas<=480){
                                    row.horastasa=480
                                }else{
                                    if(row.horas>480){
                                        row.horastasa=row.horas*1.25
                                        row.horastasa=Math.round(row.horastasa)
                                    }
                                }
                            }
                        }
                    } 
                }             
            }
            
            if(row.actividad=='Incidencia mal asignada sin análisis'){
                row.horastasa=60
            }
            if(row.actividad=='Incidencia mal asignada con análisis'){
                let _horasTemp=Math.round(row.horas*1.25)
                    while (_horasTemp%5!=0){
                        _horasTemp++
                        console.log('_horasTemp',_horasTemp)
                    }

                row.horastasa=_horasTemp
            }
            if(row.actividad=='Incidencia en Guardia'){
                let _horasTemp=Math.round(row.horas*4)
                while (_horasTemp%5!=0){
                    _horasTemp++
                    console.log('_horasTemp',_horasTemp)
                }
                 row.horastasa=_horasTemp
            }
        }

        if (column.dataField=='horas'){
            if(row.actividad=='Incidencia'){
                if((row.horas<15) && (row.horas!=0) && (row.horas!='')){
                    this.setState({errorMessage:'La cantidad mínima de minutos por incidencia es de 15.'})
                    this.handleShowModalError()
                    row.horas=''
                }else{
                    if (row.horas<=120){
                        row.horastasa=120    
                    }else{
                        if (row.horas<=240){
                            row.horastasa=240
                        }else{
                            if (row.horas<=360){
                                row.horastasa=360
                            }else{
                                if (row.horas<=480){
                                    row.horastasa=480
                                }else{
                                    if(row.horas>480){
                                        row.horastasa=row.horas*1.25
                                        row.horastasa=Math.round(row.horastasa)
                                    }
                                }
                            }
                        }
                    } 
                }             
            }
            
            if(row.actividad=='Incidencia mal asignada sin análisis'){
                row.horastasa=60
            }
            if(row.actividad=='Incidencia mal asignada con análisis'){
                let _horasTemp=Math.round(row.horas*1.25)
                    while (_horasTemp%5!=0){
                        _horasTemp++
                        console.log('_horasTemp',_horasTemp)
                    }

                row.horastasa=_horasTemp
            }
            if(row.actividad=='Incidencia en Guardia'){
                let _horasTemp=Math.round(row.horas*4)
                while (_horasTemp%5!=0){
                    _horasTemp++
                    console.log('_horasTemp',_horasTemp)
                }
                 row.horastasa=_horasTemp
            }


        }
    }

    beforeSaveCell(oldValue, newValue, row, column){
        console.log('BEFORE SAVE CELL')
        console.log('column', column)
        var cell = row.fecha_actividad;
        console.log('row.fecha_actividad',row.fecha_actividad);
        var formatedDate;
         
        let dateObj = cell;
        if (typeof cell !== 'object') {
            dateObj = new Date(cell);
            console.log('dateObj',dateObj);
        };
       
        formatedDate = `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;

            row.fecha_actividad=dateObj
            console.log('row.fecha_actividad',row.fecha_actividad)

            console.log('oldValue',oldValue)
            console.log('newValue',newValue)
            
    }

    onStartEdit(row, column, rowIndex, columnIndex){
        console.log('ON START EDIT')
        if(this.state.currentRowDateFieldFlag[0]!==row.frontEndManualChargeTableId){
            let currentRowDateFieldFlagVar=[row.frontEndManualChargeTableId,false]    
            console.log('currentRowDateFieldFlag var',currentRowDateFieldFlagVar)
            this.setState({currentRowDateFieldFlag:currentRowDateFieldFlagVar})
        }
        console.log(this.state.currentRowDateFieldFlag)

    }

    handleShowModalError = () => {
        this.setState({showModalError:true})
    }

    handleCloseModalError = () => {
        this.setState({showModalError:false})
    }

    handleCloseModalDialog = () => {
        this.setState({showModalDialog:false})
    }

    handleConfirmModalDialog = () => {
        this.setState({showModalDialog:false})
        this.delete()
        
    }

    


  render() {

    //const CaptionElement = () => <div><h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>Lista de incidencias</h3></div>;
    const CaptionElement = () => <div><h3 style={{ textAlign: 'center', color: 'purple', padding: '0.5em' }}>Carga de esfuerzo Incidencias</h3></div>;
    var pagOptions = {
        paginationSize: 4,
        pageStartIndex: 0,
        page:this.state.currentPage,
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
            if (row.selected){
                row.selected=false
                let _newSelectedRows = this.state.newSelectedRows
                for (var i=0;i<_newSelectedRows.length;i++){
                    if (_newSelectedRows[i]==row.frontEndManualChargeTableId){
                        _newSelectedRows.splice(i,1)
                    }
                }
                this.setState({newSelectedRows:_newSelectedRows})
            }else{
                row.selected=true
                let _newSelectedRows = this.state.newSelectedRows
                _newSelectedRows.push(row.frontEndManualChargeTableId)
                this.setState({newSelectedRows:_newSelectedRows})
            }
          }
      };

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
    //const { SearchBar } = Search; 
    
    const modifyHeaderColumns = () => {
        var columnState = this.state.columns;
        if(this.state.withFilters){
            this.setState({columns:columnsWithOutFilters})
            this.setState({withFilters:false})
            clearAll()
        }else{
            this.setState({columns:columnsWithFilters})
            this.setState({withFilters:true})
        }
        
      };

    const clearAll = () => {
        clearAllFilters();
    }


    let upperButtons
      if (this.state.withFilters){
        let incFilter =''
        upperButtons=
        <Row>
            <Col><Button variant="outline-primary" onClick={this.addRow.bind(this)}>Add</Button>    <Button variant="outline-primary" onClick={this.save.bind(this)}>Save</Button>   <Button variant="outline-primary" onClick={this.copy.bind(this)}>Copy</Button></Col> 
            <Col><Button variant="outline-danger" onClick={this.confirmDelete.bind(this)}>Delete</Button></Col>
            <Col/><Col/><Col/>            
            <Col xs lg="2"><Button variant="outline-primary" onClick={ modifyHeaderColumns }> Filters </Button> <Button variant="outline-danger" onClick={clearAll}> Clear </Button></Col>
        </Row>
      }else{
        upperButtons=
        <Row>
            <Col><Button variant="outline-primary" onClick={this.addRow.bind(this)}>Add</Button>    <Button variant="outline-primary" onClick={this.save.bind(this)}>Save</Button>   <Button variant="outline-primary" onClick={this.copy.bind(this)}>Copy</Button></Col> 
            <Col><Button variant="outline-danger" onClick={this.confirmDelete.bind(this)}>Delete</Button></Col>
            <Col/><Col/><Col/>            
            <Col xs lg="2"><Button variant="outline-primary" onClick={ modifyHeaderColumns }> Filters </Button> </Col>
        </Row>
      }

      let modalError
        if (this.state.showModalError){
            modalError = 
            <>
            <Modal size="sm" show={this.state.showModalError} onHide={this.handleCloseModalError}>
                <Modal.Header closeButton>
                    <Row>
                        <Col>
                            <Image src={latigo} roundedCircle  />
                        </Col>
                        <Col>
                            <Modal.Title><h4 align="right">Error</h4></Modal.Title>
                        </Col>
                    </Row>
                </Modal.Header>
                <Modal.Body>{this.state.errorMessage}</Modal.Body> 
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={this.handleCloseModalError}>
                        Close
                    </Button>                
                </Modal.Footer>
            </Modal>
            </>
        }  
      
    let modalDialog 
    if (this.state.showModalDialog){
        modalDialog =
        <>
        <Modal size="sm" show={this.state.showModalDialog} onHide={this.handleCloseModalDialog}>
            <Modal.Header closeButton>
                <Row>
                    <Col>
                        <Image src={latigo} roundedCircle  />
                    </Col>
                    <Col>
                        <Modal.Title><h4 align="right">{this.state.modaDialogTitle}</h4></Modal.Title>
                    </Col>
                </Row>
            </Modal.Header>
            <Modal.Body>
                <p>{this.state.modaDialogBody}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleCloseModalDialog}>Close</Button>
                <Button variant="primary" onClick={this.delete.bind(this)} >Delete</Button>
            </Modal.Footer>
        </Modal>
        </>
    }


    return (
        <div>
          <CaptionElement/>
          <hr/>
           {upperButtons}
           {modalError}
           {modalDialog}
          <ToolkitProvider
            /*
            search={{
                    defaultSearch:'.'
                }}
            */
            keyField="id"
            data={ this.state.rowsValues }
            columns={ this.state.columns }
                exportCSV={ {
                fileName: this.state.exportName,
                separator: ';',
                ignoreHeader: false,
                noAutoBOM: false
                }}
            
            >
            
            {
                
                props => (
                    
                    <div>
                        {/*
                        <br/>
                            <SearchBar  { ...props.searchProps }
                            />
                        
                        */}
                        <br/>
                    <BootstrapTable { ...props.baseProps}
                        keyField="frontEndManualChargeTableId"
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
                            autoSelectText: true, 
                            //onStartEdit:this.onStartEdit.bind(this),
                            //beforeSaveCell:this.beforeSaveCell.bind(this),
                            afterSaveCell:this.afterSaveCell.bind(this)
                            })
                        }
                        selectRow={ selectRow }
                        filter={ filterFactory() }
                    />
                    <Row>
                        <Col><Button variant="outline-primary" onClick={this.addRow.bind(this)}>Add</Button>    <Button variant="outline-primary" onClick={this.save.bind(this)}>Save</Button>   <Button variant="outline-primary" onClick={this.copy.bind(this)}>Copy</Button></Col> 
                        <Col><Button variant="outline-danger" onClick={this.confirmDelete.bind(this)}>Delete</Button></Col>
                        <Col/><Col/><Col/><Col/>
                    </Row>
                    <hr />
                    <MyExportCSV { ...props.csvProps } />
                    <br />
                    </div>
                )
          }
            </ToolkitProvider>
            
        </div>      
    );
  }
}

export default ManualChargePage;
