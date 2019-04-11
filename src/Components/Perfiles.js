import React, { Component } from 'react';
import Perfil from '../Pages/PerfilPage';
import {Link} from 'react-router-dom';
import logoUsuario from '../img/user_icon_small.png';
class Perfiles extends Component {
  constructor(props){
    super(props)
    console.log(this.props.perfilparam);
    this.state = {
      estadoAmigo: "Agregar amigo",
      esAmigo:false,
      class: "btn btn-outline-primary",
      class_alert: "alert alert-primary"
    }

  }

  agregarAmigoHandle(){
    if (this.state.esAmigo==false){
        this.setState({
          estadoAmigo: "Amigo",
          esAmigo:true,
          class: "btn btn-outline-success",
          class_alert: "alert alert-primary"

    })}else{
      this.setState({
        estadoAmigo: "Agregar amigo",
        esAmigo:false,
        class: "btn btn-outline-primary",
        class_alert: "alert alert-primary"
      })
    }
  }

  render() {
    let datosPerfil = this.props.perfilparam;
    return (


        <div  >

         
          
            <div class="card-deck">
              <div class="card">
                <img class="card-img-top" src={datosPerfil.FotoPerfil} alt="Card image cap" style={{width: 350, height:350}}/>
                <div class="card-body">
                  <h5 class="card-title">{this.state.estAmigo}</h5>
                  <Link to={{pathname:'/perfil/',state:{datosPerfil}}} ><h5 className="card-title">{this.props.perfilparam.Nombre}</h5></Link>
                  <a style={{width: 150}} onClick={this.agregarAmigoHandle.bind(this)} class={this.state.class}>{this.state.estadoAmigo}</a>              
                </div>
              <div class="card-footer">
                <small class="text-muted"></small>
              </div>
            </div>
          </div>
          
        </div>
    );
  }
}

export default Perfiles;
