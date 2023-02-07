// [CMP] Import
import React, { Component } from 'react';
import { withRouter } from '../ve-react/services/withRouter';

// Store modules
import { connect } from "react-redux"
import store from "../store/index"

// Child components
import CrudFetchClass from '../ve-react/services/fetch.service';
import BaseForm from '../ve-react/base/BaseForm';

// [CMP] Definition
class LoginView extends Component{
  // Init componenet
  constructor( props ){
    // Inject props from extended classe (ES6)
    super(props);

	// Init fetcher
    this.Fetcher = new CrudFetchClass();

    this.state = {
        step: 'form',
        formValue: [
            {
				name: 'email',
				type: 'email',
				label: `Email`,
				required: true,
				min: 5,
				max: null
            },
            {
				name: 'password',
				type: 'password',
				label: `Password`,
				required: true,
				min: 5,
				max: null
            },
        ],
    }

    // Bind this to methods
    this.onSubmit = this.onSubmit.bind( this );
  }

  // Bind form 'BaseForm' event 'submit'
  async onSubmit( event ){
    // Send Ajax request to login user (fake)
    try {
        console.log(event)
		// Set request
		this.Fetcher.init(
		`http://localhost:3001/profiles?email=${ event.email }&password=${ event.password }`,
		)

		// Launch request
		const fetchResponse = await this.Fetcher.sendRequest();

        // Check response
        if(Object.keys( fetchResponse ).length){
            store.dispatch({
                type: 'LOGIN-USER',
                value: fetchResponse[0]
            })

			// Set request
			this.Fetcher.init(
			`http://localhost:3001/scores?author=${ fetchResponse[0].email }`,
			)
	
			// Launch request
			const fetchScoreResponse = await this.Fetcher.sendRequest();

			store.dispatch({
                type: 'USER-SCORE',
                value: fetchScoreResponse
            })

            // Redirect user
            this.props.navigate( '/game' )
        }
        else{
            this.setState({ step: 'error' })
        }
	} 
	catch ( fetchError ) { 
		this.setState({ step: 'error' })
	}
  }

  // Dsiplay component
  render(){
	if( this.state.step === 'form' ){
		return(
			<section className='home-view-component'>
				<h1 className='title is-size-2'>Enter ClickReact</h1>
	
				<BaseForm
					content={ this.state.formValue }
					handleSubmit={ this.onSubmit }
				/>
			</section>
		)
	}
    else if( this.state.step === 'error' ){
		return(
			<section className='home-view-component'>
				<h1 className='title is-size-2'>User not found</h1>
				<p>Your email and password not correct</p>

				<button 
					className='button is-small mt-4' 
					type='button'
					onClick={ () => this.setState({ step: 'form' }) }
				>
					Please try again
				</button>
			</section>
		)
	}
  }
}

// Bind store state in classe properties
const mapStateToProps = state => {
  return{
    connectedUser: state.user,
    postCollection: state.posts,
  }
}

// [CMP] export
export default withRouter ( connect( mapStateToProps )( LoginView ) );
