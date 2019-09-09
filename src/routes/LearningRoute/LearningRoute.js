import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import SRContext from '../../contexts/SRContext';

class LearningRoute extends Component {
  static contextType = SRContext
  render() {
    return (
      <section>
        implement and style me
      </section>
    );
  }
}

export default LearningRoute
