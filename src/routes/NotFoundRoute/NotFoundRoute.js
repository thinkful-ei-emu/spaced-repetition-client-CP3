import React, { Component } from 'react'
import './NotFoundRoute.css'

class NotFoundRoute extends Component {
  render() {
    return (
      <section className='page-not-found-section' > 
        <h2>404 - Page not found</h2>
        <p>Try going back to your previous page.</p>
      </section>
    );
  }
}

export default NotFoundRoute
