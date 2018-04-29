import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormDigestValue } from '../actions/sharepoint';

import Calendar from './Calendar'; 

import '../../node_modules/semantic-ui-css/semantic.min.css'
import '../../node_modules/react-datepicker/dist/react-datepicker.css'

class App extends React.Component {
  componentDidMount() {
    var { dispatch } = this.props;
    dispatch(getFormDigestValue())
  }
  render() {
    var {FormDigestValue} = this.props
    return (
      <div>
      <div>{ FormDigestValue }</div>
      <Calendar />
      <br />
      
    </div>      
    )
  }
}

App.propTypes = {
  FormDigestValue: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  return {
    FormDigestValue: state.FormDigestValue
  }
}

export default connect(mapStateToProps)(App);



  /*constructor () {
    super()
    this.handleGetContextClick = this.handleGetContextClick.bind(this);
  }*/

  /*handleGetContextClick() {
    this.props.dispatch(ping())
  }*/
  // <button onClick={()=>this.handleGetContextClick()}>Start PING</button>