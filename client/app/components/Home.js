import React, { Component } from 'react';
// import 'whatwg-fetch';

import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Test from '../actions/index'

class Home extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount(){

}



  render() {
    console.log(this.props.auth)
    return (
      <div>
        <h1>hello</h1>
        <button >New counter</button>
        <div>
          <Link to="/signup">Sign up</Link>
          <Link to="/signin">Sign in</Link>
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // Test: protectedTest
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
