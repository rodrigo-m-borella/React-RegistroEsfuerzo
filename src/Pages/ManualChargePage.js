import React, { Component } from 'react';
import {Button,Row, Container,Spinner} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory,{ Type } from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {Aplicaciones} from '../Properties/Aplicaciones';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

class ManualChargePage extends Component {
    
    constructor(props){
        super(props)
        this.state={
            listaIncidencias:[],
            nextValTableId:'0',
            currentDay:'',
            columns:[{
                /*carga_esf_inc_id*/ 
                dataField:'frontEndManualChargeTableId',
                text:'#',
                headerStyle: (colum, colIndex) => {
                    return { width: '40px', textAlign: 'center' };
                  }
                },{
                dataField:'inc_id',
                text:'Nro Inc - PRY OT',
                },{
                dataField:'fecha_actividad',
                text:'Fecha Actividad dd/mm/aaaa',
                  formatter: (cell) => {
                    let dateObj = cell;
                    if (typeof cell !== 'object') {
                        dateObj = new Date(cell);
                        dateObj.setDate(dateObj.getDate() + 1)
                    }
                    return `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
                    
                    },
                   /* formatter: (cell) =>{
                        let dateObj = cell;
                        if (typeof cell !== 'object') {
                            dateObj = new Date(cell);
                            console.log('dateObj',dateObj)
                        }
                        return `${(dateObj.toLocaleDateString())}`
                    },*/
                    editor: {
                    type: Type.DATE
                    }
                
            },{
                dataField:'horas',
                text:'Min.',
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
                text:'Titulo PPM-OT / Titulo Incidencia'
            },{
                dataField:'actividad',
                text:'Actividad',
                editor: {
                    type: Type.SELECT,
                    options: [{value: 'Análisis - Soporte suministrador para análisis', label:'Análisis - Soporte suministrador para análisis'},
                    {value: 'Certificación - Certificación proyecto', label:'Certificación - Certificación proyecto'},
                    {value: 'Certificación - Soporte a la certificación', label:'Certificación - Soporte a la certificación'},
                    {value: 'Consulta - Soporte OM', label:'Consulta - Soporte OM'},
                    {value: 'Desarrollo - Construcción de software', label:'Desarrollo - Construcción de software'},
                    {value: 'Desarrollo - Entrega DT', label:'Desarrollo - Entrega DT'},
                    {value: 'Desarrollo - Soporte del suministrador', label:'Desarrollo - Soporte del suministrador'},
                    {value: 'Faculty (MX561002)', label:'Faculty (MX561002)'},
                    {value: 'Family Medical Leave (916X00)', label:'Family Medical Leave (916X00)'},
                    {value: 'Horas Extras tomadas', label:'Horas Extras tomadas'},
                    {value: 'Illness - enfermedad)(950X00)', label:'Illness - enfermedad)(950X00)'},
                    {value: 'Implementación - Soporte a la implementación', label:'Implementación - Soporte a la implementación'},
                    {value: 'Incidencia', label:'Incidencia'},
                    {value: 'Incidencia en Guardia', label:'Incidencia en Guardia'},
                    {value: 'Licencia por examen (957X00)', label:'Licencia por examen (957X00)'},
                    {value: 'Licencia por maternidad (917X00)', label:'Licencia por maternidad (917X00)'},
                    {value: 'Licencia por paternidad (957X02)', label:'Licencia por paternidad (957X02)'},
                    {value: 'Licencia sin goce de sueldo (957X04)', label:'Licencia sin goce de sueldo (957X04)'},
                    {value: 'National Holiday - Feriados (970X00)', label:'National Holiday - Feriados (970X00)'},
                    {value: 'New Hire (Induccion) (935X00)', label:'New Hire (Induccion) (935X00)'},
                    {value: 'Otras Ausencias Autorizadas (957X06)', label:'Otras Ausencias Autorizadas (957X06)'},
                    {value: 'Otras Licencias Autorizadas (955X00)', label:'Otras Licencias Autorizadas (955X00)'},
                    {value: 'Performance Achievement', label:'Performance Achievement'},
                    {value: 'Post - implementación - Soporte Post-implementación', label:'Post - implementación - Soporte Post-implementación'},
                    {value: 'SQA', label:'SQA'},
                    {value: 'Training (MX561025)', label:'Training (MX561025)'},
                    {value: 'Vacation (900X00)', label:'Vacation (900X00)'}]
                }
                    
            },{
                dataField:'app_afectada',
                text:'Aplicación Afectada',
                editor: {
                    type: Type.SELECT,
                    options: [
                        {value: 'ADC', label: 'ADC'}, 
                        {value: 'Aplicacion 110', label: 'Aplicacion 110'},
                        {value: 'ATIS CO', label: 'ATIS CO'},
                        {value: 'ATIS FA', label: 'ATIS FA'},
                        {value: 'ATIS IN', label: 'ATIS IN'},
                        {value: 'ATIS Proceso Intermedio', label: 'ATIS Proceso Intermedio'},
                        {value: 'BANELCO', label: 'BANELCO'},
                        {value: 'CARRIER FCO', label: 'CARRIER FCO'},
                        {value: 'CARRIER FYC', label: 'CARRIER FYC'},
                        {value: 'CARRIER ITX', label: 'CARRIER ITX'},
                        {value: 'CC3 Tarificador', label: 'CC3 Tarificador'},
                        {value: 'CEAP', label: 'CEAP'},
                        {value: 'CIRCUITOS LINK', label: 'CIRCUITOS LINK'},
                        {value: 'COATIS', label: 'COATIS'},
                        {value: 'Collections Interac', label: 'Collections Interac'},
                        {value: 'Consumos Propios', label: 'Consumos Propios'},
                        {value: 'COVA Batch', label: 'COVA Batch'},
                        {value: 'CPP-Liq', label: 'CPP-Liq'},
                        {value: 'CPP-OLD', label: 'CPP-OLD'},
                        {value: 'DDA', label: 'DDA'},
                        {value: 'DOC1 AMDOCS', label: 'DOC1 AMDOCS'},
                        {value: 'DOC1 ATIS', label: 'DOC1 ATIS'},
                        {value: 'DOC1 EXMOVICOM', label: 'DOC1 EXMOVICOM'},
                        {value: 'DOC1 SIGECO', label: 'DOC1 SIGECO'},
                        {value: 'DOCUMENTOS HUERFANOS', label: 'DOCUMENTOS HUERFANOS'}, 
                        {value: 'ePagos', label: 'ePagos'},
                        {value: 'Facturacion detallada', label: 'Facturacion detallada'},
                        {value: 'Facturacion personalizada', label: 'Facturacion personalizada'},
                        {value: 'FACTURADOR PC', label: 'FACTURADOR PC'}, 
                        {value: 'FacturaElectronicaE/Facturador Plus', label: 'FacturaElectronicaE/Facturador Plus'},
                        {value: 'FC&O', label: 'FC&O'},
                        {value: 'GIT Tasador', label: 'GIT Tasador'},
                        {value: 'ITX Interconexión Movil', label: 'ITX Interconexión Movil'},
                        {value: 'MACVAL', label: 'MACVAL'},
                        {value: 'Mauliv Web', label: 'Mauliv Web'},
                        {value: 'MDR Mediador', label: 'MDR Mediador'}, 
                        {value: 'MEMCO', label: 'MEMCO'},
                        {value: 'Mercado Pago', label: 'Mercado Pago'},
                        {value: 'MOL ATM', label: 'MOL ATM'},
                        {value: 'MoviCOP', label: 'MoviCOP'},
                        {value: 'MoviDAC', label: 'MoviDAC'},
                        {value: 'On Line de Consumos', label: 'On Line de Consumos'},
                        {value: 'PANEL DE CONTROL', label: 'PANEL DE CONTROL'},
                        {value: 'POL', label: 'POL'},
                        {value: 'PSF', label: 'PSF'},
                        {value: 'RECLATIS', label: 'RECLATIS'},
                        {value: 'Reco Online', label: 'Reco Online'},
                        {value: 'RECOLECTOR DE PAGOS', label: 'RECOLECTOR DE PAGOS'},
                        {value: 'Rentas-Padron', label: 'Rentas-Padron'},
                        {value: 'Repartidor Sigres', label: 'Repartidor Sigres'},
                        {value: 'Riesgo Crediticio', label: 'Riesgo Crediticio'},
                        {value: 'RNP', label: 'RNP'},
                        {value: 'Roaming Internacional', label: 'Roaming Internacional'},
                        {value: 'Roaming Nacional', label: 'Roaming Nacional'},
                        {value: 'RUC', label: 'RUC'},
                        {value: 'RVA', label: 'RVA'},
                        {value: 'SAT/TIOR', label: 'SAT/TIOR'}, 
                        {value: 'SGU Distribucion', label: 'SGU Distribucion'}, 
                        {value: 'SGU Facturación', label: 'SGU Facturación'}, 
                        {value: 'SIGECO Clientes', label: 'SIGECO Clientes'},
                        {value: 'SIGECO Cobros', label: 'SIGECO Cobros'},
                        {value: 'SIGECO Facturacion', label: 'SIGECO Facturacion'},
                        {value: 'Simaf', label: 'Simaf'},
                        {value: 'Sipeyco', label: 'Sipeyco'},
                        {value: 'SIPEYCO Batch', label: 'SIPEYCO Batch'},
                        {value: 'Temis', label: 'Temis'},
                        {value: 'Web Facturacion Datos/Anexos AFIP', label: 'Web Facturacion Datos/Anexos AFIP'},
                        {value: 'Web Impago/Aviso de Pagos', label: 'Web Impago/Aviso de Pagos'},
                        {value: 'Web Legacy', label: 'Web Legacy'},
                        {value: 'WS Reco Impagos', label: 'WS Reco Impagos'},
                        {value: 'WSWebs', label: 'WSWebs'}]
                }
            },{
                dataField:'observaciones',
                text:'Observaciones',
                editor: {
                    type: Type.TEXTAREA
                  }
            },{
                dataField:'eid',
                text:'Enterprise Id'
            }]
            ,
            rowsValues: [],
            newSelectedRows:[],
            /*currentRowDateFieldFlag tiene 2 elementos para identificar cuando se debe corregir la
            fecha por el bug del datepicker de react table 2
            primer elemento tiene el id del row
            segundo elemento, booleano que si es que ya fue corregido*/
            currentRowDateFieldFlag:['0',false],
            currentPage:0,/*esta variable por ahora no se usa, es para el redireccionamiento a la 1er pag luego de add*/ 
            exportName:''
        }
        this.getMyIncidents = this.getMyIncidents.bind(this);
        this.loadPage = this.loadPage.bind(this);
    }

    loadPage(){
        //var url = new  URL("http://192.168.0.9:5006/informe/myincidents")
        //var url = new  URL("http://10.244.49.48:5006/informe/myincidents")
        //var url = new  URL("http://localhost:5006/informe/myincidents")
        var url = new  URL("http://10.244.48.33:5006/informe/myincidents")
        var params = {eid: localStorage.getItem('usersession')}
        url.search = new URLSearchParams(params)
        fetch(url)
        .then(res => res.json())
        .then(
        (result) => {
           var reverseResult = result.reverse()
           this.setState({rowsValues:reverseResult});
           this.setState({nextValTableId:result.length+1});   
           sessionStorage.setItem('nextValTableId',result.length+1);
           
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
        sessionStorage.setItem('newSelectedRows',[])
        }

    getMyIncidents(){
            window.localStorage('/GestionEsfuerzo/ManualCharge/')
    }
//sessionStorage.setItem('rowsValues',reverseResult);
    addRow(){
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
        /*
        var newSelectedRows = sessionStorage.getItem('newSelectedRows')
        if(newSelectedRows==''){
            newSelectedRows=[]
        }
        */
        newSelectedRows.push(nextValTableId)
        this.setState({newSelectedRows:newSelectedRows})
        //sessionStorage.setItem('newSelectedRows',newSelectedRows)
        temprowsValues.push(emptyElement)
        this.setState({rowsValues:temprowsValues.reverse()})
        nextValTableId++
        sessionStorage.setItem('nextValTableId',nextValTableId)
        this.setState({currentPage:0})
    }

    save(){
        var itemsToSave = []
        console.log('grilla total',this.state.rowsValues)
        this.state.rowsValues.map((item,key) =>{
            console.log('item.selected',item.selected)
            if(item.selected){
                itemsToSave.push(item)
            }
        }
        );
        console.log('ITEMS TO SAVE', itemsToSave)

        //fetch('http://192.168.0.9:5006/informe/updateManualCharge',
        //fetch('http://10.244.49.48:5006/informe/updateManualCharge',
        //fetch('http://localhost:5006/informe/updateManualCharge',
        fetch('http://10.244.48.33:5006/informe/updateManualCharge',
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
                //this.getMyIncidents.bind();
                //window.location='/GestionEsfuerzo/ManualCharge/'
                this.loadPage()
            },
            (error)=>{
                console.log("error: ", error)
                }
            )
            this.getMyIncidents.bind()

    }

    copy(){
        var nextValTableId = sessionStorage.getItem('nextValTableId');
        var eid = localStorage.getItem('usersession')
        var temprowsValues = this.state.rowsValues.reverse()
        var newSelectedRows = this.state.newSelectedRows
        this.state.rowsValues.map((item,key) =>{
            if(item.selected){
                var copiedElement ={
                    frontEndManualChargeTableId:nextValTableId,
                    carga_esf_inc_id:'',
                    inc_id:item.inc_id,
                    fecha_actividad:this.state.currentDay,
                    horas:'',
                    titulo:item.titulo,
                    actividad:item.actividad,
                    app_afectada:item.app_afectada,
                    observaciones:'',
                    eid: eid,
                    selected: true
                    }                      
                
                console.log('copiedElement',copiedElement.selected)
                item.selected=false
                console.log('copiedElement',copiedElement.selected)
                temprowsValues.push(copiedElement)
                
                newSelectedRows.push(nextValTableId)
                nextValTableId++
            }
            
        });
        this.setState({newSelectedRows:newSelectedRows})
        this.setState({rowsValues:temprowsValues.reverse()})
        sessionStorage.setItem('nextValTableId',nextValTableId)
        console.log('nextValTableId',nextValTableId)
        }
 
    componentDidMount(){
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year

        if(date<10){
            date=`${('0' + date)}`;
        }
        if(month<10){
            month=`${('0' + month)}`;
        }

        var fecha_combodate =  `${year}-${month}-${date}`;
        console.log('fecha_combodate',fecha_combodate)
        this.setState({
          //Setting the value of the date time
          //currentDay:year + '-' + month + '-' +date 
          currentDay:fecha_combodate 
            })
        var fecha_exportName= `${date}-${month}-${year}`;
        var exportName='Incidencias_'+localStorage.getItem('usersession')+'_'+fecha_exportName+'.csv'
        this.setState({exportName:exportName})
    }

    afterSaveCell(oldValue, newValue, row, column){
        console.log('AFTER SAVE CELL')
        console.log(this.state.rowsValues)
        console.log(this.state.currentDay)
        console.log('row', row.fecha_actividad)
/*
        if (column.dataField!=='fecha_actividad'){
            console.log('detecta no es fecha actividad ')
            if ((row.frontEndManualChargeTableId===this.state.currentRowDateFieldFlag[0]) &&
            !(this.state.currentRowDateFieldFlag[1])){
                let dateObj = row.fecha_actividad
                if (typeof dateObj !== 'object') {
                    dateObj = new Date(dateObj);
                    console.log('dateObj after save',dateObj)
                };
                dateObj.setDate(dateObj.getDate() + 1)
                row.fecha_actividad=dateObj
                this.setState({currentRowDateFieldFlag:[row.frontEndManualChargeTableId,true]})
            }
        }
*/
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


  render() {

    const CaptionElement = () => <div><h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>Lista de incidencias</h3></div>;
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
            }else{
                row.selected=true
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

    return (
        <div>
          <CaptionElement/>
          <Button variant="outline-primary" onClick={this.addRow.bind(this)}>Add</Button>  <Button variant="outline-primary" onClick={this.save.bind(this)}>Save</Button> <Button variant="outline-primary" onClick={this.copy.bind(this)}>Copy</Button>
          <ToolkitProvider
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
                    />
                    <Button variant="outline-primary" onClick={this.addRow.bind(this)}>Add</Button>  <Button variant="outline-primary" onClick={this.save.bind(this)}>Save</Button>
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
