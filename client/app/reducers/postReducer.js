import { RECEIVE_POSTS, FETCH_POSTS, FAILED_POSTS } from '../actions/index'

const INITIAL_STATE = {
      posts: [],
      fetched: false,
}

export default function posts(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS:
    return {
      posts: [],
  		fetched: false,
    };
    case FAILED_POSTS:
     return {
       fetched: false
     };
     case RECEIVE_POSTS:
     return {...state,
			posts: action.data.data,
			fetched: true
    };
    default:
     return state
  }
}
