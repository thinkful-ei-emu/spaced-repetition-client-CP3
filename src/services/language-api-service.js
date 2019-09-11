import config from '../config'
import TokenService from './token-service'

const LanguageApiService = {
  deleteLanguage(id){
    return fetch(`${config.API_ENDPOINT}/language/${id}`, {
      method: 'DELETE',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      }
    })
  },
  addLanguage(name) {
    return fetch(`${config.API_ENDPOINT}/language`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        name,
      })
        
        
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => {
            if (e.error==="Unauthorized request"){
              TokenService.clearAuthToken();
              return 'unauthorized'
            }
            return Promise.reject(e)})
          : res.json()
      )
  },

  getLanguage(){
    return fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => {
            if (e.error==="Unauthorized request"){
              TokenService.clearAuthToken();
              return 'unauthorized'
            }
            return Promise.reject(e)})
          : res.json()
      )
  },
  getHead(langid){
    return fetch(`${config.API_ENDPOINT}/language/head/${langid}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => {
            if (e.error==="Unauthorized request"){
              TokenService.clearAuthToken();
              return 'unauthorized'
            }
            return Promise.reject(e)})
          : res.json()
      )
  },
  postGuess(guess,langid) {
    return fetch(`${config.API_ENDPOINT}/language/guess/${langid}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        guess,
      })
        
        
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => {
            if (e.error==="Unauthorized request"){
              TokenService.clearAuthToken();
              return 'unauthorized'
            }
            return Promise.reject(e)})
          : res.json()
      )
  },



}

export default LanguageApiService;