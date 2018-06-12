import axios from 'axios';
import { browserHistory } from 'react-router';


export const AUTH_USER = 'auth_user',
             UNAUTH_USER = 'unauth_user',
             AUTH_ERROR = 'auth_error',
             FORGOT_PASSWORD_REQUEST = 'forgot_password_request',
             RESET_PASSWORD_REQUEST = 'reset_password_request',
             PROTECTED_TEST = 'protected_test';

const API_URL = 'http://localhost:8080/api';
const SIGN_IN = 'http://localhost:8080';
const CLIENT_ROOT_URL = 'http://localhost:8080';

export function errorHandler(dispatch, error, type) {
 let errorMessage = '';

 if(error.data.error) {
   errorMessage = error.data.error;
 } else if(error.data){
   errorMessage = error.data;
 } else {
   errorMessage = error;
 }

 if(error.status === 401) {
   dispatch({
     type: type,
     payload: 'You are not authorized to do this. Please login and try again.'
   });
   logoutUser();
 } else {
   dispatch({
     type: type,
     payload: errorMessage
   });
 }
}

export function SignInUser({ email, password }) {
 return function(dispatch) {

  axios.post(`${SIGN_IN}/api/account/signin`, {
    email: email,
    password: password
  }).then(function(response) {
    // console.log(response)
    if(response.status === 200){
      console.log(response)
       localStorage.setItem('token', response.data.token);
      // cookie.save('token', response.data.token, { path: '/' });
      //  dispatch({ type: AUTH_USER });
       dispatch(receivePosts(response.data));
       window.location.href = CLIENT_ROOT_URL + '/dashboard';
     }
  }).catch((error) => {
    // console.log(error.response)
     errorHandler(dispatch, error.response, AUTH_ERROR)
   });
   }
 }

 export function SignUpUser({ firstname, lastname, email, password }) {
  return function(dispatch) {
   axios.post(`${SIGN_IN}/api/account/signup`, {
     firstName: firstname,
     lastName: lastname,
     email: email,
     password: password
   }).then(function(response) {
     console.log(response.data.message)
     if(response.status === 200){

        localStorage.setItem('token', response.data.token);
        // dispatch({ type: AUTH_USER });
        window.location.href = CLIENT_ROOT_URL + '#/dashboard';
      }
   }).catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
    }
  }

  export const FETCH_PROFILE = 'FETCH_PROFILE',
               RECEIVE_PROFILE = 'RECEIVE_PROFILE',
               FAILED_PROFILE = 'FAILED_PROFILE';

  export function userProfile() {
   return function(dispatch) {

    axios.get(`${SIGN_IN}/api/dashboard`, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
      }).then(function(response) {
        // console.log(response.data)
         dispatch(receiveProfile(response));
      }).catch((error) => {
        // console.log(error.response)
       errorHandler(dispatch, error.response, AUTH_ERROR)
     });
   }
}
   const receiveProfile = function receiveProfile(data) {
     return {
       type: RECEIVE_PROFILE,
       data: data
     }
   }


export function logoutUser() {
 return function (dispatch) {
   dispatch({ type: UNAUTH_USER });
   Storage.removeItem('token', { path: '/' });

   window.location.href = CLIENT_ROOT_URL + '/login';
 }
}

export function protectedTest() {
 return function(dispatch) {
   axios.get(`${API_URL}/protected`, {
     headers: { 'Authorization':  localStorage.getItem('token')}
   })
   .then(response => {
     dispatch({
       type: PROTECTED_TEST,
       payload: response.data.content
     });
   })
   .catch((error) => {
     errorHandler(dispatch, error.response, AUTH_ERROR)
   });
 }
}

export function Test() {
  return function(dispatch) {
    console.log("hello")
    }
}

/********************
* localhost:3000/api/posts
*
*This receive tweets from the server
*
************/
export const FETCH_POSTS = 'FETCH_POSTS',
             RECEIVE_POSTS = 'RECEIVE_POSTS',
             FAILED_POSTS = 'FAILED_POSTS';


export function getPosts() {
 return function(dispatch) {

  axios.get(`${SIGN_IN}/api/posts`).then(function(response) {
      // console.log(response.data)
      dispatch(receivePosts(response));
      //  dispatch({ type: RECEIVE_POSTS });
    }).catch((error) => {
     errorHandler(dispatch, error.response, AUTH_ERROR)
   });
   }
 }

 const receivePosts = function receivePosts(data) {
   // console.log(data)
   return {
     type: RECEIVE_POSTS,
     data: data
   }
 }
