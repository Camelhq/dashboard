import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './Box/SignUpForm';


const Signup = () => (
  <>
    <h1>sign up page</h1>
    <SignUpForm  />
    <Link to="/">Go home</Link>
    <Link to="/signin">Sign in</Link>
  </>
);

export default Signup;
// export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
