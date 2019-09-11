import React, { Component } from 'react';
import './DashboardRoute.css';
import { Link } from 'react-router-dom';
import SRContext from '../../contexts/SRContext';
import WordApiService from '../../services/word-api-service';

class DashboardRoute extends Component {
  static contextType = SRContext
  state={
    toggleRefresh:true,
    addWord: false,
    original: '',
    translation: '',
    lang: {
      id: undefined,
      name: ''
    }
  }
  componentDidMount() {
    this.context.loadLangWords()
      .then(res => {
        if (res !== 'success') {
          this.props.history.push('/login')
        }
      })
      .then(res=>{
        this.setState({toggleRefresh:!this.state.toggleRefresh})
      })
  }

  renderAddWord = () => {
    return (
      <div className='addWordForm'>
        <div className='AddWord_content'>
        <h2>Add Word</h2>
        <p>For: {this.state.lang.name}</p>
        <form onSubmit={this.handleSubmit} >
          <label htmlFor='original'>Original: </label>
          <input type='text' name='original' id='original'
            value={this.state.original} required
            onChange={e => this.setState({ original: e.target.value })} />
          <label htmlFor='translation'>Translation: </label>
          <input type='text' name='translation' id='translation'
            value={this.state.translation} required
            onChange={e => this.setState({ translation: e.target.value })} />
          <div className='AddWord__buttons'>
            <button className='addbtn' type='submit'>
            Add
            </button>
            {' '}
            <button className='cancelbtn' type='button' onClick={() => this.setState({ addWord: false })}>
            Cancel
            </button>
          </div>
        </form>
        </div>
      </div>
    )
  }
  handleSubmit = e => {
    e.preventDefault()
    const { lang, original, translation } = this.state;
    const word = {
      language_id: lang.id,
      original,
      translation
    }
    WordApiService.postWord(word)
    .then(res => {
      this.context.loadLangWords()
        .then(res => {
          if (res !== 'success') {
            this.props.history.push('/login')
          }
        })
    })
    this.setState({ 
      addWord: false,
      original: '',
      translation: '',
      lang: {
        id: undefined,
        name: ''
      }
     })
  }

  handleClickAdd = (id, name) => {
    this.setState({ 
      addWord: true,
      lang: {
        id,
        name
      } 
    })
  }

  handleDelete = word_id => {
    WordApiService.deleteWord(word_id)
      .then(res => {
        this.context.loadLangWords()
          .then(res => {
            if (res !== 'success') {
              this.props.history.push('/login')
            }
          })
      })
  }

  render() {
    return (
      <section className='DashboardSection'>
        <h2>
          <span>Dashboard</span>

        </h2>
        {this.state.addWord && this.renderAddWord()}
        {this.context.languages &&
          this.context.languages.map((language,index) => {
            return (
              <div key={index}>
                <h3>
                  Language: {' ' + language.name}
                  <br></br>
                  <span className='current-score'>Total correct answers: {language.total_score}</span>
                </h3>
                <Link to={`/learn/${language.id}`}>
                  Start Practicing
                </Link>
                <h3>Words to practice</h3>
                <button onClick={() => this.handleClickAdd(language.id, language.name)}>Add Word</button>
                <ul className='dashboard-words-div'>
                  {
                    this.context.allWords[language.id].map((word, index) => {
                      return (
                        <li key={index} className='word-row-div'>
                          <div className='word-row-original'>
                            {word.original}
                          </div>
                          <div className='word-row-translation'>
                            {word.translation}
                          </div>
                          <div className='word-row-correct'>
                            <span className='green'>
                              {word.correct_count}
                            </span>,
                            <span className='red'>
                              {word.incorrect_count}
                            </span>
                          </div>
                          <div>
                            <img onClick={() => this.handleDelete(word.id)} className='deleteButton' src='https://image.flaticon.com/icons/png/512/60/60578.png' alt='delete button' />
                          </div>
                        </li>
                      )
                    })

                  }
                </ul>

              </div>
            );

          })
        }



      </section>
    );
  }
}

export default DashboardRoute
