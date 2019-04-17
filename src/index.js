import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Pages/Login';
import Registro from './Pages/Registro';
import Incidencias from './Pages/IncidenciasPage';
import ManualChargeCorr from './Pages/ManualChargePageCorr';
import ManualChargeEvol from './Pages/ManualChargePageEvol';
import PruebaTabla from './Pages/PruebaTabla';
import Perfiles from './Components/Perfiles';
import Perfil from './Pages/PerfilPage';
import HomePage from './Pages/HomePage';
import Inicio from './Layout/Inicio';
import Footer from './Layout/Footer';
import ReactFontFace from 'react-font-face';
import JaneDoeFont from './fonts/JaneDoe-PersonalUse.ttf';

import { BrowserRouter, Switch, HashRouter } from 'react-router-dom';
import {Route} from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import IncidenciasPage from './Pages/IncidenciasPage';

ReactDOM.render(<HashRouter>
        <div className="container-fluid">
        
            <Route path='/GestionEsfuerzo/' component={Inicio}/>
            <Route exact path='/' component={Login} />
            {/*<Route exact path='/GestionEsfuerzo/Login/' component={Login} />*/}
            <Route exact path='/GestionEsfuerzo/Registro/' component={Registro} />
            <Route exact path='/GestionEsfuerzo/Perfiles/' component={Perfiles} />  
            <Route exact path='/GestionEsfuerzo/HomePage/' component={HomePage} />
            <Route exact path='/GestionEsfuerzo/Incidencias/' component={IncidenciasPage}/>  
            <Route exact path='/GestionEsfuerzo/Perfil/' component={Perfil} />
            <Route exact path='/GestionEsfuerzo/ManualChargeCorr/' component={ManualChargeCorr} />
            <Route exact path='/GestionEsfuerzo/ManualChargeEvol/' component={ManualChargeEvol} />
            <Route exact path='/GestionEsfuerzo/PruebaTabla/' component={PruebaTabla} />
           
            <Route path='/GestionEsfuerzo/' component={Footer}/>
        
        </div>
    </HashRouter>, document.getElementById('root'));
registerServiceWorker();
