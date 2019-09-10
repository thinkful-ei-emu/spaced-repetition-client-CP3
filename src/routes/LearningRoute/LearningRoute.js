import React, { Component } from 'react'
import './LearningRoute.css';
import {Link} from 'react-router-dom';
import SRContext from '../../contexts/SRContext';
import LanguageApiService from '../../services/language-api-service';

class LearningRoute extends Component {
  state={
    isInQuestion:true,
    currentQ:{},
    guess:''
  }
  getNewHead=()=>{
    LanguageApiService.getHead()
      .then(res=>{
        this.setState({
          currentQ:res,
          isInQuestion:true
        })
      })
  }

  handleGuess=(guess)=>{
    this.setState({guess})
  }

  submitGuess=()=>{
    LanguageApiService.postGuess(this.state.guess)
      .then(res=>{

      })
      .then(()=>{
        this.setState({
          isInQuestion:false,
        })
      })
  }

  componentDidMount(){
    this.getNewHead();
  }
  static contextType = SRContext
  render() {
    return (
      <section className='learnWordSection'>
        <h3>
          {this.state.currentQ.original &&
            this.state.currentQ.original
          }
        </h3>
        <label htmlFor='learn-guess-input'>Guess: </label>
        <input id='learn-guess-input' value={this.state.guess} onChange={e=>{this.handleGuess(e.target.value)}}/>
        <button onSubmit={e=>{
          e.preventDefault();
          this.submitGuess();
        }}>Submit</button>
      </section>
    );
  }
}

export default LearningRoute
