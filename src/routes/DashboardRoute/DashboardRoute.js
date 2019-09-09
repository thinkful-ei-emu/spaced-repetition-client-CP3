import React, { Component } from 'react';
import './DashboardRoute.css';
import {Link} from 'react-router-dom';
import SRContext from '../../contexts/SRContext';

class DashboardRoute extends Component {
  static contextType = SRContext

  componentDidMount(){
    this.context.loadLangWords();
  }

  render() {
    return (
      <section className='DashboardSection'>
        <h2>
          <span>Dashboard</span>
          <span className="header-undertext">Language: {' '+this.context.language.name}</span>
        </h2>
        <Link to='/learn'>
          Start Practicing
        </Link>
        <h3>Words to practice</h3>
        <div className='dashboard-words-div'>
          {
            this.context.words.map((word,index)=>{
              return(
                <div key={index} className='word-row-div'>
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
                
                </div>
              )
            })

          }
        </div>

      </section>
    );
  }
}

export default DashboardRoute
