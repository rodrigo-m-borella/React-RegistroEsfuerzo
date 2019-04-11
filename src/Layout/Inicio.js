import React, { Component,PureComponent } from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import logoHome from '../img/smallhome.png';
import {Navbar, Nav, NavItem,ButtonGroup, DropdownButton,  Dropdown} from 'react-bootstrap';
import logo from '../logo.svg';
import  '../Styles/Inicio.css'

class Inicio extends Component {

    constructor(props){
      super(props);
      this.state={
        goHome:false
      };
    }


  quit(){
    localStorage.setItem('usersession','');
    window.location = '/';
  }




  render() {

    return (  
      
        <Navbar bg='dark' variant='dark'>
            <Nav>
              <Navbar.Brand >
                <img className="App-logo" src={logo}  alt="Responsive image"></img>
              {/*<img className="App-logo"  src={logo} alt="Responsive image"  ></img> */}
                <Link to='/GestionEsfuerzo/HomePage/' >
                  GESTION Y CONTROL DE HORAS
                </Link>
              </Navbar.Brand>
            </Nav>
      
            <Navbar.Collapse className='justify-content-end'>
              <ButtonGroup>
                <DropdownButton as={ButtonGroup} title={localStorage.getItem('usersession')} id="bg-nested-dropdown">
                  <Dropdown.Item eventKey="5">Settings</Dropdown.Item>
                  <Dropdown.Divider></Dropdown.Divider>
                  <Dropdown.Item eventKey="6" onClick={this.quit.bind(this)}>Quit</Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
            </Navbar.Collapse>
           
        </Navbar>   
        
    );
  }
}

export default Inicio;
