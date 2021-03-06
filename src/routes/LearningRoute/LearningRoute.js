import React, { Component } from 'react'
import './LearningRoute.css';
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
    return LanguageApiService.getHead(this.props.langId)
      .then(res => {
        if(res==='head is null'){
          this.setState({
            error:'Error: The first word could not be found'
          })
        }
        else{
          this.setState({
            currentQ: res,
            isInQuestion: true,
            error:''
          })
        }
        
      })
  }

  handleGuess = (guess) => {

    this.setState({ guess,
      error:'' })
  }

  submitGuess = () => {
    if (this.state.guess !== '') {
      LanguageApiService.postGuess(this.state.guess,this.props.langId)
        .then(res => {
          this.setState({
            isInQuestion: false, /* 
          currentQ: {
            ...this.state.currentQ,
            wordCorrectCount:,
            wordIncorrectCount:
          }, */
            answer: res.answer,
            nextQ: { ...res },
            error:''
          })
        })
        .catch(e => this.setState({ error: e.error, guess: '', answer: '' }))
    }

  }

  moveToNextWord = () => {
    this.setState({
      currentQ: { ...this.state.nextQ },
      guess: '',
      answer: '',
      isInQuestion: true,
      error:''
    })
  }

  componentDidMount() {
    this.getNewHead();
  }
  static contextType = SRContext
  render() {
    return (
      <section className='learnWordSection'>
        {
          this.state.error &&
          <div className='learn-error'>
            {this.state.error}
          </div>
        }
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
                <h2> <span className='green'>&#10003;</span> You were correct! <span className='green'>:D</span></h2>
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
                <h2>  <span className='red'>&#10008;</span>Good try, but not quite right <span className='red'>:(</span></h2>
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
