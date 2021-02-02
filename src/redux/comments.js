// reducer for comments
import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
    errMess: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            // payload is object of the action, contain modification of the action
            return { ...state, isLoading: false, errMess: null, comments: action.payload };

        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, comments:[]};

        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return{...state, comments: state.comments.concat(comment)};
        default:
            return state;
    }
}