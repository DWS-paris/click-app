/* 
  Compter le click
  => En tant qu'utilisateur je peux créer mon compte avec email username et password
  => En tant qu'utilisateur je peux me connecter avec email et password
  => En tant qu'utilisateur je peux me deconnecter
  => En tant qu'utilisateur je peux cliquer sur un bouton pendant 30 secondes
  => En tant qu'utilisateur j'enregistre mon nombre de clic
  => En tant qu'utilisateur je vois le score des mes parties passées
*/


// [CMP] Import
import React, { Component } from 'react';

// Import component to display view component
import { Routes, Route } from "react-router-dom"

// Store modules
import store from "./store/index"

// Importe route componenets
import { withRouter } from './ve-react/services/withRouter';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import HeaderBase from './ve-react/base/HeaderBase';
import GameView from './views/GameView';

// [CMP] Definition
class App extends Component{
  // Init componenet
  constructor( props ){
    // Inject props from extended classe (ES6)
    super(props);
  }

  // Delete stae user value to logout
  onLogout(){
    store.dispatch({
      type: 'LOGOUT-USER',
      value: null
    })
  }

  // Dsiplay component
  render(){
    return(
      <div className='app-component'>
        <HeaderBase 
          onLogout={ this.onLogout } 
          changeRoute={ event => this.props.navigate( event ) }
        />
        <main>
          {/* Routes directive to define routes */}
          <Routes>
            {/* Route directive to define path and component */}
            <Route path="/" element={ <LoginView /> } />
            <Route path="/register" element={ <RegisterView /> } />
            <Route path="/game" element={ <GameView /> } />
          </Routes>
        </main>
      </div>
    )
  }
}

// [CMP] export
export default withRouter( App );
