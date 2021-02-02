import * as ActionTypes from './ActionTypes';

export const Promotions = (state = {
    isLoading: true,
    errMess: null,
    promotions: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROMOS:
            // payload is object of the action, contain modification of the action
            return { ...state, isLoading: false, errMess: null, promotions: action.payload };
        case ActionTypes.PROMOS_LOADING:
            //spread operator
            //return {...parameter1, parameter2,3,4,5,} means take the current value of the parameter 1 
            // then what ever modification in parameter 2,3,4 will be apply to the parameter 1
            // the parameter 1 is not mutated
            // Example:
            // const state = {
            //     isLoading: true,
            //     errMess: null,
            //     dishes: []
            // }
            //     alert(JSON.stringify({...state, isLoading: false})); -> isLoading will be set to false
            //     alert(JSON.stringify(state));
            // }

            return { ...state, isLoading: true, errMess: null, promotions: [] }
        case ActionTypes.PROMOS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, promotions: [] };
        default: return state;
    }
}