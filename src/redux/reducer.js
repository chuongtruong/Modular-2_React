//Reducer() take the current, and an action to generate a new state.

import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";

export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
};

//Reducer() take the current, and an action to generate a new state.
//state = initialState -> Make use of the ES6, define a default value for the parameter
//When the Reducer is first calledm the state is undefined. We add the default state to prevent that.
export const Reducer = (state = initialState, action) => {
    return state;
};