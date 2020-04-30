import { combineReducers } from 'redux';
import burgerBuilderReducer from './burgerBuilder';
import submitedOrderReducer from './order';
import authReducer from './auth';

export default combineReducers ({
    burgerBuilder: burgerBuilderReducer, 
    order: submitedOrderReducer,
    auth: authReducer
})