// Modules imports
import { combineReducers } from 'redux'
import user from './modules/user'
import score from './modules/score'

// Export reducer
export default combineReducers({
    user: user,
    scores: score,
});