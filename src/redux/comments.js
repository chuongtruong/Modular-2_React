// reducer for comments
import { COMMENTS } from "../shared/comments";
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            //state.concat(comment) is return a new instance of the state adding new comment in there
            //this prevents modify the current state.
            //this is just temporary, once page refreshed, the newly added comment will be gone
            return state.concat(comment);
        default: 
            return state;
    }
}