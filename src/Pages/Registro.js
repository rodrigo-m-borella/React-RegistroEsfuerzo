import React, { Component } from 'react';
import {Link,Route,Router} from 'react-router-dom';
import firebase from '../Config/firebase';


class HomePage extends Component {
  constructor(props){
    super(props)

    this.state = {
        personas:[],
        nombre:'',
        apellido:'',
        telefono:'',
        email:'',
        nacionalidad:'',
        password:'',
        passwordConf:'',
        sexo:'',
        listaNacionalidades:[]
    }

    this.handleNombre = this.handleNombre.bind(this);
    this.handleApellido = this.handleApellido.bind(this);
    this.handleTelefono = this.handleTelefono.bind(this);
    this.handleNacionalidad = this.handleNacionalidad.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlepasswordConf = this.handlepasswordConf.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSexo = this.handleSexo.bind(this);
    
  
  }

  async redirectToTarget(e){
    console.log('ENTRANDO AL redirectToTarget');
    console.log("ususario estado: ", this.state.nombre);
    console.log("ususario pass: ", this.state.password);
    //let validPass= 
    if (this.validatePass(this.state.password)){
    //alert(validPass);
      firebase.database().ref('/Personas/').push({
            Nombre:this.state.nombre,
            Apellido:this.state.apellido,
            Telefono:this.state.telefono,
            Email:this.state.email,
            Nacionalidad:this.state.nacionalidad,
            Password:this.state.password,
            Sexo:this.state.sexo
          })
          
     window.location = ('/HomePage/')
     e.preventDefault();
   }
  }

  componentWillMount(){
    
    var this_class = this;
    
    firebase.database().ref("/Nacionalidades/").once('value').then(function(snapshot){
      console.log("Nacionalidades: ",snapshot.val())
      this_class.setState({
        listaNacionalidades: snapshot.val()
      })
      
      
    })
  }

  handleNacionalidad(event){
    this.setState({nacionalidad: event.target.value});
  }
  

  handlePassword(event){
    this.setState({password: event.target.value});
  }

  handlepasswordConf(event){
    this.setState({passwordConf: event.target.value});
  }
  handleNombre(event){
    this.setState({nombre: event.target.value});
    console.log(this.state.nombre);
  }
  handleEmail(event){
    this.setState({email: event.target.value})
  }

  handleSexo(event){
    this.setState({sexo: event.target.value})
  }

  handleApellido(event){
    this.setState({apellido: event.target.value})
  }

  handleTelefono(event){
    this.setState({telefono: event.target.value})
  }

  validatePass(){
    var pass=this.state.password;
    var confirmacionPass=this.state.passwordConf;
    var letters = /^[a-zA-Z0-9_]*$/;
   
    if (pass.length > 4 && letters.test(pass)) {
      
      if (pass==confirmacionPass){
        return true;
      }else{
        alert('Las passwords no coinciden');
        return false;
      }
    }else{
      alert("La contraseña tiene que ser alfanumérica y mayor a 4 caracteres");
      return false;
    }
  }

  handleSubmit(e){
    console.log('ENTRANDO AL SUBMIT');
    console.log(this.state);
    /*
    fireBase.database().ref('/Personas/').push(
    { 
      Nombre:this.state.usuario
    }

    )
  */
    e.preventDefault();

  }
  
  render() {
        const listaNacionalidades=this.state.listaNacionalidades;
        return (
          <div>
              <div class="alert alert-primary" role="alert">REGISTRO</div>
           
           <form >
             <div className="form-group">
               <label for="nombre">Nombre</label>
               <input type="text" value={this.state.nombre} onChange={this.handleNombre.bind(this)} className="form-control form-control-sm" id="nombre" aria-describedby="userHelp" placeholder="Ingrese nombre"/>      
             </div>
             <div className="form-group">
               <label for="apellido">Apellido</label>
               <input type="text" value={this.state.apellido} onChange={this.handleApellido.bind(this)} class="form-control" id="apellido" aria-describedby="userHelp" placeholder="Ingrese apellido"/>      
             </div>
             <div className="form-group">
               <label for="telefono">Telefono</label>
               <input type="text" value={this.state.telefono} onChange={this.handleTelefono.bind(this)} class="form-control" id="telefono" aria-describedby="userHelp" placeholder="Ingrese teléfono"/>      
             </div>
             <div class="form-group">
               <label for="email">E-mail</label>
               <input type="text" value={this.state.email} onChange={this.handleEmail} class="form-control" id="email" placeholder="E-Mail"/>
             </div>
             <div class="form-group">
               <label for="selectNacionalidades">Nacionalidad</label>
               <select class="custom-select" id="selectNacionalidades" value={this.state.nacionalidad} onChange={this.handleNacionalidad.bind(this)}>
                  <option selected>Nacionalidad</option>
                    {Object.keys(listaNacionalidades).map((k)=><option value={k}>{listaNacionalidades[k]}</option>)}
                </select>
             </div>
             <div class="form-group">
                 <label for="nac">Sexo</label>
                 <select class="custom-select" id="inputGroupSelect02" value={this.state.sexo} onChange={this.handleSexo.bind(this)}>
                   <option selected>Sexo...</option>
                   <option value="1">Femenino</option>
                   <option value="2">Masculino</option>
                 </select>
             </div>
             <div class="form-group">
               <label for="password">Password</label>
               <input type="password" value={this.state.password} onChange={this.handlePassword.bind(this)} class="form-control" id="password" placeholder="Password"/>
             </div>
             <div class="form-group">
               <label for="confpassword">Confirm</label>
               <input type="password" value={this.state.passwordConf} onChange={this.handlepasswordConf.bind(this)} class="form-control" id="confpassword" placeholder="Confirm password"/>
             </div>
           </form>
           <button  onClick={this.redirectToTarget.bind(this)} type="submit" value="submit" class="btn btn-primary">Submit
             
           </button><br/>
     
          </div>
          
        );
      
  }
  
}

export default HomePage;
