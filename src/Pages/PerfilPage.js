import React, { Component } from 'react';
import logoUsuario from '../img/user_icon_small.png';
class Perfil extends Component {
  constructor(props){
    super(props);
  console.log(this.props.location.state.perfilPNombre);
  }

  componentDidMount () {
   

  }
  render() {
    return (


        <div className="col-11 col-sm-4">
              <th>Perfil</th>
              

            <div className="card" >
                <img className="card-img-top"  src={this.props.location.state.datosPerfil.FotoPerfil} alt="Responsive image"></img>
                <div className="card-body">
                <p className="card-text"> {this.props.location.state.datosPerfil.Nombre} {this.props.location.state.datosPerfil.Apellido}</p>
                
               
            </div>
            <ul className="list-group">
                <li className="list-group-item">{this.props.location.state.datosPerfil.Telefono}</li>
                <li className="list-group-item">{this.props.location.state.datosPerfil.Email}</li>
                <li className="list-group-item">{this.props.location.state.datosPerfil.Nacionalidad}</li>
            
            </ul>
            

        

      </div>


        </div>
    );
  }
}

export default Perfil;
