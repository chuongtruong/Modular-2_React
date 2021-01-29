
import {createStore} from 'redux';
import {Reducer, initialState} from './reducer';

export const ConfigureStore = () => {
    //creat a store, createStore takes in (reducer, and other parameter)
    const store = createStore(Reducer,initialState);
    return store;
}