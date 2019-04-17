import React, { Component } from 'react';
import {Modal, Button } from 'react-bootstrap';

class ModalsError extends Component {

    constructor(props){
        super(props);
        this.state = {
            show:this.props.show,
            message:this.props.message
        }
    }

    handleClose = () =>{
        this.setState({show:false})
    }


    componentWillMount(){
        console.log('componentWilllMount errorModal')
    }

    render() {
    
        return (   
            <>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error de validación</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.state.message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>                
                </Modal.Footer>
            </Modal>
            </>

        );
    }
  }
  
  export default ModalsError;
  
  