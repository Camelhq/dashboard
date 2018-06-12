import  { combineReducers } from 'redux'
import auth from './authReducer'
import posts from './postReducer'
import user from './userReducer'
import { reducer as formReducer } from 'redux-form'


const rootReducer = combineReducers({
	auth: auth,
	user: user,
	posts: posts
});

export default rootReducer
