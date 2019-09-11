import React, { Component } from 'react';
import './DashboardRoute.css';
import { Link } from 'react-router-dom';
import SRContext from '../../contexts/SRContext';
import LanguageApiService from '../../services/language-api-service';

class DashboardRoute extends Component {
  static contextType = SRContext
  state={
    toggleRefresh:true,
    isAdding:false,
    newName:''
  }

  handleAddNew= (e)=>{
    if(this.state.isAdding){
      LanguageApiService.addLanguage(this.state.name)
        .then(res=>{
          return this.context.loadLangWords();
        })
        .then(res => {
          if (res !== 'success') {
            this.props.history.push('/login')
          }
        })
        .then(()=>{
          this.setState({isAdding:false})
        })
    }
    else{
      this.setState({isAdding:true})
    }
  }

  handleDelete=(e)=>{
    
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

  render() {
    return (
      <section className='DashboardSection'>
        <h2>
          <span>Dashboard</span>
          {this.state.isAdding &&
            <form>
              <label htmlFor='add-new-lang-input'>
                Name:
              </label>
              <input type='text' id='add-new-lang-input' value={this.state.newName} onChange={e=>this.setState({newName:e.target.value})}/>
            </form>

          }
          <button onClick={this.handleAddNew}className='header-undertext'>Add new Set</button>
        </h2>
        {this.context.languages &&
          this.context.languages.map((language,index) => {
            return (
              <div className='Lang-words-div' key={index}>
                <h3>
                  Language: {' ' + language.name}
                  <br></br>
                  <span className='current-score'>Total correct answers: {language.total_score}</span>
                </h3>
                <Link to={`/learn/${language.id}`}>
                  Start Practicing
                </Link>
                <h3>Words to practice</h3>
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
