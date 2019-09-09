import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute'
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
import LoginRoute from '../../routes/LoginRoute/LoginRoute'
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute'
import LearningRoute from '../../routes/LearningRoute/LearningRoute'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'
import SRContext from '../../contexts/SRContext';
import LanguageApiService from '../../services/language-api-service';
import './App.css'

export default class App extends Component {
  state = {
    hasError: false,
    loadLangWords:()=>{
      LanguageApiService.getLanguage()
        .then(langWords=>{
          this.setState({
            language:langWords.language,
            words: langWords.words
          })
        })
    },
    updateLangWords: () => { },
    submitAnswer: () => { },
    language: '',
    words: []
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    const { hasError } = this.state
    return (
      <SRContext.Provider value={
        this.state
      }>
        <div className='App'>
          <Header />
          <main>
            {hasError && (
              <p>There was an error! Oh no!</p>
            )}
            <Switch>
              <PrivateRoute
                exact
                path={'/'}
                component={DashboardRoute}
              />
              <PrivateRoute
                path={'/learn'}
                component={LearningRoute}
              />
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationRoute}
              />
              <PublicOnlyRoute
                path={'/login'}
                component={LoginRoute}
              />
              <Route
                component={NotFoundRoute}
              />
            </Switch>
          </main>
        </div>
      </SRContext.Provider>
    );
  }
}
