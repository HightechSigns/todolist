// import all reducers and host them
import { combineReducers } from 'redux'
import loadedData from './data';
import activeId from './activeId';
import toggleSwitch from './toggleSwitch';

const allReducers = combineReducers({
    data: loadedData,
    actID:activeId,
    toggle:toggleSwitch
})
export default allReducers;