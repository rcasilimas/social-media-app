import { FETCH_POSTS_PENDING, FETCH_POSTS_FAILURE, FETCH_POSTS_SUCCESS, SUBMIT_POST_FAILURE, SUBMIT_POST_PENDING, SUBMIT_POST_SUCCESS } from '../constants/posts';

const initialState = {
    isPending: false,
    posts: [],
    error: ''
}

export const postsReducer = (state=initialState, action={}) => {
    switch(action.type) {
        case SUBMIT_POST_PENDING:
            return {...state, isPending: true}
        case SUBMIT_POST_SUCCESS:
            return {...state, isPending: false}
        case SUBMIT_POST_FAILURE:
            return {...state, isPending: false, error: action.payload}
        case FETCH_POSTS_PENDING:
            return {...state, isPending: true}
        case FETCH_POSTS_SUCCESS:
            return {...state, isPending: false, posts: action.payload}
        case FETCH_POSTS_FAILURE:
            return {...state, isPending: false, error: action.payload}
        default:
            return state;
    }
} 