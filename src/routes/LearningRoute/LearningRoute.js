import React, { Component } from 'react'
import './LearningRoute.css';
import { Link } from 'react-router-dom';
import SRContext from '../../contexts/SRContext';
import LanguageApiService from '../../services/language-api-service';

class LearningRoute extends Component {
  state = {
    isInQuestion: true,
    currentQ: {},
    nextQ: {},
    guess: '',
    answer: '',
    error: ''
  }
  getNewHead = () => {
    return LanguageApiService.getHead()
      .then(res => {
        this.setState({
          currentQ: res,
          isInQuestion: true
        })
      })
  }

  handleGuess = (guess) => {
    
    this.setState({ guess })
  }

  submitGuess = () => {
    if(this.state.guess!==''){
      LanguageApiService.postGuess(this.state.guess)
      .then(res => {
        this.setState({
          isInQuestion: false, /* 
          currentQ: {
            ...this.state.currentQ,
            wordCorrectCount:,
            wordIncorrectCount:
          }, */
          answer: res.answer,
          nextQ: { ...res }
        })
      })
      .catch(e => this.setState({ error: e, guess: '', answer: '' }))
    }
    
  }

  moveToNextWord=()=>{
    this.setState({
      currentQ:{...this.state.nextQ},
      guess:'',
      answer:'',
      isInQuestion:true,
    })
  }

  componentDidMount() {
    this.getNewHead();
  }
  static contextType = SRContext
  render() {
    return (
      <section className='learnWordSection'>
        {this.state.isInQuestion ?

          <>
            {this.state.currentQ.nextWord &&
            <>
              <h2>Translate the word:</h2>
              <h3>
                {
                  this.state.currentQ.nextWord
                }
              </h3>
              <label htmlFor='learn-guess-input'>What's the translation for this word? </label>
              <br></br>
              <input id='learn-guess-input' value={this.state.guess} onChange={e => { this.handleGuess(e.target.value) }} />
              <br></br>
              <p>
              You have answered this word correctly <span className='green'> {this.state.currentQ.wordCorrectCount}  </span> times.
              </p>
              <p>
              You have answered this word incorrectly <span className='red'>{this.state.currentQ.wordIncorrectCount} </span> times.
              </p>
              <button className='learn-submit-guess-button' onClick={e => {
                this.submitGuess();
              }}>Submit your answer</button>
              </>
            }
          </>
          :
          (
            (this.state.answer === this.state.guess) ?
              <>
                <h2>You were correct! :D</h2>
                <p>{`The correct translation for ${this.state.currentQ.nextWord} was ${this.state.answer} and you chose ${this.state.guess}`}</p>
                <button onClick={e => {
                  this.moveToNextWord();
                }}>
                  Try another word
                </button>
                <p>Your total score is: {this.state.nextQ.totalScore}</p>
              </>
              :
              <>
                <h2>Good try, but not quite right :(</h2>
                <p>{`The correct translation for ${this.state.currentQ.nextWord} was ${this.state.answer} and you chose ${this.state.guess}`}</p>
                <button onClick={e => {
                  this.moveToNextWord();
                }}>
                  Try another word
              </button>
                <p>Your total score is: {this.state.nextQ.totalScore}</p>
              </>
          )


        }

      </section>
    );
  }
}

export default LearningRoute
