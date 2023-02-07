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
class RegisterView extends Component{
  // Init componenet
  constructor( props ){
    // Inject props from extended classe (ES6)
    super(props);

	// Init fetcher
    this.Fetcher = new CrudFetchClass();

    this.state = {
        step: 'form',
        formData: [
            {
				name: 'email',
				type: 'email',
				label: `User email`,
				required: true,
				min: 5,
				max: null
            },
            {
				name: 'username',
				type: 'text',
				label: `User name`,
				required: true,
				min: 5,
				max: null
            },
			{
				name: 'password',
				type: 'password',
				label: `Your password`,
				required: true,
				min: 5,
				max: null
            }
        ],
    }

    // Bind this to methods
    this.onSubmit = this.onSubmit.bind( this );
  }

  // Bind form 'BaseForm' event 'submit'
  async onSubmit( event ){
    // Send Ajax request to login user (fake)
    try {
		// Set request
		this.Fetcher.init(
		`http://localhost:3001/profiles`,
		'POST',
		event
		)

		// Launch request
		const fetchResponse = await this.Fetcher.sendRequest();

		this.setState({ step: 'success' })
		console.log( fetchResponse )
	} 
	catch ( fetchError ) { 
		this.setState({ step: 'error' })
		console.log( fetchError ) 
	}
  }

  // Dsiplay component
  render(){
	if( this.state.step === 'form' ){
		return(
			<section className='home-view-component'>
				<h1 className='title is-size-2'>Became a ClickReacter</h1>
				
				<BaseForm
					content={ this.state.formData }
					handleSubmit={ this.onSubmit }
				/>
			</section>
		)
	}
	else if( this.state.step === 'success' ){
		return(
			<section className='home-view-component'>
				<h1 className='title is-size-2'>Welcome in ClickReact!</h1>
				<p>You can now login to click</p>

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
export default withRouter ( connect( mapStateToProps )( RegisterView ) );
