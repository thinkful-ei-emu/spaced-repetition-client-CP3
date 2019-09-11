import config from '../config'
import TokenService from './token-service'

const WordApiService = {
  postWord(word) {
    return fetch(`${config.API_ENDPOINT}/word`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        word
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
  deleteWord(id) {
    return fetch(`${config.API_ENDPOINT}/ratings/${id}`,{
        method: 'DELETE',
        headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`
        }
    })
    .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res
    )
    .catch(e => console.error(e))
  }
}

export default WordApiService;