import { combineReducers } from 'redux'

import articlesReducer from './articlesReducer'
// import articleReducer from './articleReducer'
import signupReducer from './signupReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  articles: articlesReducer,
  // oneArticle: articleReducer,
  signup: signupReducer,
  auth: authReducer
})

export default rootReducer
