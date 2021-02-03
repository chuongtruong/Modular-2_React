// reducer for feedback
import * as ActionTypes from './ActionTypes';

export const Feedback = (state = {
    errMess: null,
    feedbacks: []
}, action) => {
    switch (action.type) {

        case ActionTypes.FEEDBACK_FAILED:
            return {...state, isLoading: false, errMess: action.payload, feedbacks:[]};

        case ActionTypes.ADD_FEEDBACK:
            var feedback = action.payload;
            return{...state, comments: state.feedbacks.concat(feedback)};
        default:
            return state;
    }
}