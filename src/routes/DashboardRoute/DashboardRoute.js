import React, { Component } from 'react';
import './DashboardRoute.css';
import { Link } from 'react-router-dom';
import SRContext from '../../contexts/SRContext';

class DashboardRoute extends Component {
  static contextType = SRContext
  state={
    toggleRefresh:true,
    isAdding:false
  }

  handleAddNew= (e)=>{
    if(this.state.isAdding){

    }
    else{
      this.setState({isAdding:true})
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

  render() {
    return (
      <section className='DashboardSection'>
        <h2>
          <span>Dashboard</span>
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
                <Link to='/learn'>
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
