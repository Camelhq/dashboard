import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { SignUpUser } from '../../actions/index'
import ErrorAlert from './ErrorAlert';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      error: ''
    }
    this.firstName = this.firstName.bind(this);
    this.lastName = this.lastName.bind(this);
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // componentDidMount(){
  //   console.log(this.props)
  // }
  firstName(event){
    this.setState({
      firstname: event.target.value
    });
  }
  lastName(event){
    this.setState({
      lastname: event.target.value
    });
  }
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
  this.props.SignUpUser(this.state)
}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.error && <ErrorAlert>Your username/password is incorrect</ErrorAlert>}
        <input onChange={this.firstName} type="text" name="username" className="form"/>
        <input onChange={this.lastName} type="text" name="username" className="form"/>
        <input onChange={this.email} type="text" name="username" className="form"/>
        <input onChange={this.password} type="text" name="username" className="form"/>
        <button>Sign up</button>
      </form>
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
  SignUpUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
