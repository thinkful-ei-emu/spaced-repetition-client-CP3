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
    if (this.state.guess !== '') {
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

  moveToNextWord = () => {
    this.setState({
      currentQ: { ...this.state.nextQ },
      guess: '',
      answer: '',
      isInQuestion: true,
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

                <form onSubmit={e => {
                  e.preventDefault();
                  this.submitGuess();
                }}>
                  <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
                  <br></br>
                  <input id='learn-guess-input' type='text' value={this.state.guess} onChange={e => { this.handleGuess(e.target.value) }} required />
                  <br></br>
                  <button type='submit' className='learn-submit-guess-button' >Submit your answer</button>
                </form>

                <p>Your total score is: {this.state.currentQ.totalScore}</p>
                <p>You have answered this word correctly <span className='green'> {this.state.currentQ.wordCorrectCount}  </span> times.</p>
                <p>You have answered this word incorrectly <span className='red'>{this.state.currentQ.wordIncorrectCount} </span> times.</p>
              </>
            }
          </>
          :
          (
            (this.state.nextQ.isCorrect) ?
              <>
                <h2>You were correct! :D</h2>
                <div className='DisplayFeedback'>
                <p>{`The correct translation for ${this.state.currentQ.nextWord} was ${this.state.answer} and you chose ${this.state.guess}!`}</p>
                </div>
                <button onClick={e => {
                  this.moveToNextWord();
                }}>
                  Try another word!
                </button>
                <div className='DisplayScore'>
                  <p >Your total score is: {this.state.nextQ.totalScore}</p>
                </div>
              </>
              :
              <>
                <h2>Good try, but not quite right :(</h2>
                <div className='DisplayFeedback'>
                <p>{`The correct translation for ${this.state.currentQ.nextWord} was ${this.state.answer} and you chose ${this.state.guess}!`}</p>
                </div>
                <button onClick={e => {
                  this.moveToNextWord();
                }}>
                  Try another word!
                </button>
                <div className='DisplayScore'>

                  <p >Your total score is: {this.state.nextQ.totalScore}</p>
                </div>
              </>
          )


        }

      </section>
    );
  }
}

export default LearningRoute
