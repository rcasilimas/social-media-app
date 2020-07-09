import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer';
import thunkMiddleware from 'redux-thunk'

const middlewares =[thunkMiddleware]

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;