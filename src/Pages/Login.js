import React, { Component } from "react";
import { Button, FormGroup, FormControl, Form, PageHeader, Container,Image, Row } from "react-bootstrap";
import '../Styles/Login.css';
import latigo from '../img/latigo.png';
import {Link, Route, Router,Redirect} from 'react-router';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: "",
      password: "",
      loggedin:false
    };
  }

  componentWillMount(){
    let userValue = localStorage.getItem('usersession');
    
    if ((userValue != null) && (userValue != '')){
      this.setState({loggedin:true})
    }
  }



  validateForm() {
    return this.state.usuario.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    console.log("METODO SUBMIT");
    fetch('http://10.244.48.33:5006/user/checkuser',
    {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        usuarioid: this.state.usuario,
        password: this.state.password
      })
    })
    .then(res=>res.json())
    .then(
      result=>{
        console.log("respuesta: ",result)
        if (result){
          localStorage.setItem('usersession',this.state.usuario);
          this.setState({loggedin:true})
           
        }else{
         alert("Usuario o Password incorrecta!");
        }
      },
      (error)=>{
        console.log("error: ", error)
      }
    )
    event.preventDefault();
    
    
  
      }
  

 


  /*  
  tryToSigIn(){
    var this_class = this;
        
        firebase.database().ref("/Personas/"+this.state.usuario).once('value').then(function(snapshot){
         
          if snapshot.val()==this.

        })
      }
      */


  render() {
    const CaptionElement = () => <div><h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>Gestion y control de horas</h3></div>;
    if (this.state.loggedin){
      return <Redirect to='/GestionEsfuerzo/HomePage/'/>
    }
    return (
      
      <div className="Login" >
      
      <Container>
      <CaptionElement/>
        <Row className="justify-content-md-center"> 
          <Image src={latigo} roundedCircle />
        </Row>
      </Container>
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="usuario" bsSize="large">
          <Form.Label>User</Form.Label>
          <FormControl
            autoFocus
            type="text"
            value={this.state.usuario}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <Form.Label>Password</Form.Label>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button variant="outline-primary"
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"   
        >
          Login
        </Button>
      </form>
    </div>
    );
  }
}

export default Login;
