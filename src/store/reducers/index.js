import { combineReducers } from 'redux';
import burgerBuilderReducer from './burgerBuilder';
import submitedOrderReducer from './order';

export default combineReducers ({
    burgerBuilder: burgerBuilderReducer, 
    order: submitedOrderReducer
})