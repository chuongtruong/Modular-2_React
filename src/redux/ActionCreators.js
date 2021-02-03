import * as ActionTypes from './ActionTypes';
import { DISHES } from "../shared/dishes";
import { baseUrl } from "../shared/baseUrl";

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }

    newComment.date = new Date().toISOString();
    return fetch(baseUrl + 'comments', {
        method: 'POST',//if we dont't define POST. default is GET.
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        //handling fetch post response
        .then(response => {
            if (response.ok) {
                return response; //->this response will be available for next then.
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText); // status will be the code of the error
                error.response = response;
                throw error;
            }
        },
            //there's case that the server doesn't even response.
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )

        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => console.log('Post comments ' + error.message))
};

export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {

    const newFeedback = {
        firstname : firstname, 
        lastname : lastname, 
        telnum : telnum, 
        email : email, 
        agree : agree, 
        contactType : contactType, 
        message : message
    }

    newFeedback.date = new Date().toISOString();
    return fetch(baseUrl + 'feedback', {
        method: 'POST',//if we dont't define POST. default is GET.
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        //handling fetch post response
        .then(response => {
            if (response.ok) {
                return response; //->this response will be available for next then.
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText); // status will be the code of the error
                error.response = response;
                throw error;
            }
        },
            //there's case that the server doesn't even response.
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )

        .then(response => response.json())
        .then(response => {dispatch(addFeedback(response))})
        .catch(error => console.log('Post feedback ' + error.message))
};


export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response; //->this response will be available for next then.
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText); // status will be the code of the error
                error.response = response;
                throw error;
            }
        },
            //there's case that the server doesn't even response.
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))
}


//this is a thunk - return a function of an inner function
export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));
    return fetch(baseUrl + 'dishes')
        //handling error
        .then(response => {
            if (response.ok) {
                return response; //->this response will be available for next then.
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText); // status will be the code of the error
                error.response = response;
                throw error;
            }
        },
            //there's case that the server doesn't even response.
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )

        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
}

// => function returns an action
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading(true));
    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response; //->this response will be available for next then.
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText); // status will be the code of the error
                error.response = response;
                throw error;
            }
        },
            //there's case that the server doesn't even response.
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)))
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})
export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

// thunk
//middleware = (store) => (next) => (action) => {return next(action)}
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));
    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response; //->this response will be available for next then.
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText); // status will be the code of the error
                error.response = response;
                throw error;
            }
        },
            //there's case that the server doesn't even response.
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))
} 