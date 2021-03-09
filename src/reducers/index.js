// import all reducers and host them
import { combineReducers } from 'redux'
import loadedData from './data';

const allReducers = combineReducers({
    data: loadedData
})
export default allReducers;