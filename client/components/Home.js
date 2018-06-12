import React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { getPosts } from '../actions/index';

class Home extends React.Component  {
    componentDidMount(){
    this.props.getPosts()
  }


  	render(){
      // console.log(this.props.posts)
      return(
      <div>
        <ul>
        {
          this.props.posts.map((post, key) =>{
            return(
              <li key={key}>{post.name}</li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => { //const INITIAL_STATE = []; on actions/index.js
  return state
}

const mapDispatchToProps = { //this is what fires off actions in redux
   getPosts
 }


export default connect(mapStateToProps, mapDispatchToProps)(Home)
