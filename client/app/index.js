import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import  { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom'
// import decode from 'jwt-deode';

import reducers from './reducers/index';
// import App from './components/App/App';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';

// import './styles/styles.scss';

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
))

const checkAuth = () => {
	const token = localStorage.getItem('token');

	if(!token){
		return false
	}
	if(token){
		console.log("its a token here")
	}
	// try{
	//
	// }catch(e){
	// 	return false;
	// }
	return true
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    checkAuth() ?
		<Component {...props} />
      : <Redirect to={{pathname: '/signin'
					// state: {from: props.location }
        }} />
  )} />
)

const app = document.getElementById('app');


ReactDOM.render(
  <Provider store={store}>
  	<Router>
      <Switch>
        <Route exact path="/" component={Home}/>
				<Route exact path="/signup" component={Signup}/>
				<Route exact path="/signin" component={Signin}/>
				<AuthRoute exact path="/dashboard" component={Dashboard}/>
        <Route component={NotFound}/>
      </Switch>
  	</Router>
  </Provider>
        ,
    app);
