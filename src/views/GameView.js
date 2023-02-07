// [CMP] Import
import React, { Component } from 'react';
import { withRouter } from '../ve-react/services/withRouter';
import Moment from 'react-moment';

// Store modules
import { connect } from "react-redux"
import store from "../store/index"

// Child components
import CrudFetchClass from '../ve-react/services/fetch.service';

// [CMP] Definition
class GameView extends Component{
  // Init componenet
  constructor( props ){
    // Inject props from extended classe (ES6)
    super(props);

	// Init fetcher
    this.Fetcher = new CrudFetchClass();

    this.state = {
      step: '',
      score: 0,
    }

    // Bind this to methods
    this.onInit = this.onInit.bind( this );
    this.onStart = this.onStart.bind( this );
    this.onSaveScore = this.onSaveScore.bind( this );
  }

  componentDidMount(){
    this.onInit()
  }

  async onInit(){
    // Set request
			this.Fetcher.init(
    `http://localhost:3001/scores?author=${ this.props.connectedUser.email }`,
    )

    // Launch request
    const fetchScoreResponse = await this.Fetcher.sendRequest();

    store.dispatch({
      type: 'USER-SCORE',
      value: fetchScoreResponse
    })

    this.setState({ step: 'start' })
    this.setState({ score: 0 })
  }

  onStart( ){
    this.setState({ step: 'game' })

    setTimeout(() => {
      console.log('setTimeout', this.state)
      this.setState({ step: 'finish' })
    }, 3000)
  }

  async onSaveScore(){
    // Send Ajax request to login user (fake)
    try {
      // Set request
      this.Fetcher.init(
        `http://localhost:3001/scores`,
        'POST',
        {
          value: this.state.score,
          author: this.props.connectedUser.email,
          date: new Date()
        }
      )
  
      // Launch request
      const fetchResponse = await this.Fetcher.sendRequest();
      console.log(fetchResponse,{
        value: this.state.score,
        author: this.props.connectedUser.email
      })
      
      // Change step
      this.setState({ step: 'restart' })
    } 
    catch ( fetchError ) { 
      this.setState({ step: 'error' })
    }
  }

  // Dsiplay component
  render(){
    if(!this.props.connectedUser){
      this.props.navigate( '/' )
    }
    else{
      if( this.state.step === 'start' ){
        return(
          <section className='home-view-component'>
            <h1 className='title is-size-2'>Game play</h1>
            <button 
              className='button'
              onClick={ () => this.onStart() }
            >
              Ready to click?
            </button>
  
            <ul className='mt-5'>
              {
                this.props.userScores.map( (score, idx) => {
                  return(
                    <li key={ `item-${idx}` }>
                      <b>{ score.value }</b>
                      <Moment className='ml-2 is-size-7'>{score.date}</Moment>
                    </li>
                  )
                })
              }
            </ul>
          </section>
        )
      }
      else if( this.state.step === 'game' ){
        return(
          <section className='home-view-component'>
            <h1 className='title is-size-2'>Game play</h1>
            <button 
              className='button'
              onClick={ () => this.setState({ score: this.state.score + 1 }) }
            >
              click me { this.state.score }
            </button>
          </section>
        )
      }
      else if( this.state.step === 'finish' ){
        return(
          <section className='home-view-component'>
            <h1 className='title is-size-2'>Finish</h1>
            <p>New score: <b>{ this.state.score }</b></p>
  
            <button 
                className='button is-small' 
                type='button'
                onClick={ () => this.onSaveScore( ) }
              >
                Save new score?
              </button>
          </section>
        )
      }
      else if( this.state.step === 'restart' ){
        return(
          <section className='home-view-component'>
            <h1 className='title is-size-2'>Your score is saved</h1>
            
            <button 
                className='button is-small' 
                type='button'
                onClick={ () => this.onInit() }
              >
                Play again?
              </button>
          </section>
        )
      }
      else if( this.state.step === 'error' ){
        return(
          <section className='home-view-component'>
            <h1 className='title is-size-2'>Error</h1>
            
            <button 
                className='button is-small' 
                type='button'
                onClick={ () => this.onInit() }
              >
                Please try again
              </button>
          </section>
        )
      }
    }
  }
}

// Bind store state in classe properties
const mapStateToProps = state => {
  return{
    connectedUser: state.user,
    userScores: state.scores,
  }
}

// [CMP] export
export default withRouter ( connect( mapStateToProps )( GameView ) );
