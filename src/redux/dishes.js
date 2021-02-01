import * as ActionTypes from "./ActionTypes";

//set the default state:
// initially, isLoading is true, and dishes[] is empty,
// once the dishes is not empty then isLoading is false
// if it's failed to load, then errMess will be something instead of null
export const Dishes = (state = {
    isLoading: true,
    errMess: null,
    dishes: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_DISHES:
            // payload is object of the action, contain modification of the action
            return {...state, isLoading: false, errMess: null, dishes: action.payload};
        case ActionTypes.DISHES_LOADING:
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

            return {...state, isLoading: true, errMess: null, dishes: []}
        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default: return state;
    }
}