import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { SignInUser, getPosts } from '../actions/index'
// import ErrorAlert from './ErrorAlert';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    }
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // componentDidMount(){
  //   console.log(this.props)
  // }

  email(event){
    this.setState({
      email: event.target.value
    });
  }
  password(event){
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(event) {
  event.preventDefault()
  event.target.reset()
  this.props.SignInUser(this.state)
}

  render() {
    // console.log(this)
    return (
      <>
      <h1>sign in page</h1>
      <form onSubmit={this.handleSubmit}>
        {this.state.error && <ErrorAlert>Your username/password is incorrect</ErrorAlert>}
        <input onChange={this.email} type="text" name="username" className="form"/>
        <input onChange={this.password} type="text" name="username" className="form"/>
        <button>Sign up</button>
      </form>
      </>
    );
  }
};

// SignUpForm.propTypes = {
//   SignUpRequest: React.PropTypes.func.isRequired
// }

const mapStateToProps = state => {
  return {
    post: state.post
  }
  // return state
}

const mapDispatchToProps = {
  SignInUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
