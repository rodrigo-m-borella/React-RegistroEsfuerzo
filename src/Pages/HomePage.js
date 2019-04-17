import React, { Component } from 'react';
import Perfiles from '../Components/Perfiles';
import logo from '../logo.svg';
import App from '../App.css';
import {Link,Route} from 'react-router-dom';
import '../Styles/HomePage.css';
import {Redirect} from 'react-router';
import { CardGroup, CardDeck, Card, Row, Container, Button } from 'react-bootstrap';

class HomePage extends Component {

    constructor(props){
        super(props)
        this.state={
            insertResult:'',
            manualChargeIncPage:false,
            incidentsHistoricPage:false,
            manualChargeNoIncPage:false,
            manualChargeEvolPage:false,
            logged:true
        };
    
    this.insertNewRow=this.insertNewRow.bind(this);
    this.deleteRow=this.deleteRow.bind(this);
    this.updateRow=this.updateRow.bind(this);
    this.goManualChargeEvol=this.goManualChargeEvol.bind(this);
    }

  

updateRow(){
    alert("function update")
    //fetch('http://localhost:8088/informe/update?incidencia=22',
    fetch('http://10.244.48.33:5006/informe/update?incidencia=22',
    {method:'POST',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
        },
    body: JSON.stringify({
        incidencia:'22',
        emp_sop_prop:'El loco'
        })
    })
    .then(res=>res.json())
    .then(
        (result)=>{
            console.log(result)   
        },
        (error)=>{
            console.log(error)
        }
    )
}

deleteRow(){
    alert("function deleterow")
    //fetch('http://localhost:8088/informe/delincident?id=25',
    fetch('http://10.244.48.33:5006/informe/delincident?id=25',
    {method:'POST',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
        .then((result)=>
        {
            console.log(result) 
        },
        (error)=>
        {
            console.log('El Error',error)
        }
        )
}

insertNewRow(){
    alert("insertNewRow");
    fetch("http://10.244.48.33:5006/informe/incident", 
    //fetch("http://10.244.48.33:5006/informe/incident",
    {method:'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
            },
    body: JSON.stringify({
        incidencia: '25',
        emp_sop_prop: 'CompumundoHMR'
      })
    })
    .then(res => res.json())
    .then(
        (result) => {
            console.log(result);
            this.setState({insertResult:result});
        },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
        (error) => {
            console.log(error)
        }
        )
}

componentWillMount(){
    let userValue = localStorage.getItem('usersession');
    console.log("userValue: ", userValue)
    if ((userValue != null) && (userValue != '')){
        //this.setState((state,props)=>({logged:true}))
        this.setState({logged:true})
    }
    console.log('logged:',this.state.logged)
  }


goManualCharge(){
    this.setState({manualChargeIncPage:true})
    /*this.setState((state,props)=>({manualChargeIncPage:true}))*/
    /*console.log("estado de manualcharge: ",this.state.manualChargeIncPage)*/
}

goManualChargeEvol(){
    this.setState({manualChargeEvolPage:true})

}

goHistoricList(){
    this.setState({incidentsHistoricPage:true})
}

goManualChargeNoInc (){
    this.setState({manualChargeNoIncPage:true})
}

            

render() {

    if(!this.state.logged){
        return <Redirect to='/'/>
    }

    if (this.state.manualChargeIncPage){
        return <Redirect to='/GestionEsfuerzo/ManualChargeCorr/'/>
    }

    if (this.state.manualChargeEvolPage){
        return <Redirect to='/GestionEsfuerzo/ManualChargeEvol/'/>
    }
   
   
    if (this.state.incidentsHistoricPage){
        return <Redirect to='/GestionEsfuerzo/Incidencias/'/>
    }
    if (this.state.manualChargeNoIncPage){
        return <Redirect to='/GestionEsfuerzo/Incidencias/'/>
    }
    
    return (
        <div className="row" id="homeRow">
  
        <Container>
            <Row className="justify-content-md-center">
                <CardDeck >
                    <Card border="danger">
                        <Card.Body>
                            <Card.Title>CARGA MANUAL DE ESFUERZO</Card.Title>
                            <Card.Text>Carga manual de esfuerzo de incidencias.</Card.Text>
                            <br/><br/>
                            <Button variant="danger" onClick={this.goManualCharge.bind(this)}>Update</Button>
                        </Card.Body>
                        
                        <Card.Footer>
                            <small className="text-muted">Last updated ...</small>
                        </Card.Footer>
                    </Card>

                    <Card border="primary">
                        <Card.Body>
                            <Card.Title>CARGA MANUAL DE ACTIVIDADES</Card.Title>
                            <Card.Text>Carga manual de horas de OT's o actividades no relacionadas a incidencias</Card.Text>
                            
                            <Button variant="primary"  onClick={this.goManualChargeEvol.bind(this)}>Update</Button>
                            
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated ...</small>
                        </Card.Footer>
                    </Card>

                    <Card border="warning">
                        <Card.Body>
                            <Card.Title>HISTORICO DE INCIDENCIAS</Card.Title>
                            <Card.Text>Incidencias enviadas desde analytics por gestión de informes TASA</Card.Text>
                            <br/>
                            <Button variant="warning" onClick={this.goHistoricList.bind(this)}>Consult</Button>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated ...</small>
                        </Card.Footer>
                    </Card>
                </CardDeck>
            </Row>
        </Container>

        </div>

        
    );
  }
}

export default HomePage;
