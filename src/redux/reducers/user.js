import { SET_CURRENT_USER, SIGN_OUT, REQUEST_USERS_SUCCESS, REQUEST_USERS_PENDING, REQUEST_USERS_FAILED, DELETE_USER, TOGGLE_EDIT_MODE, TOGGLE_REAUTH_WINDOW } from '../constants/user';

const initialState = {
    editing: false,
    reauth: false,
    currentUser: null,
    isPending: false,
    users: [],
    error: ''
}

export const userReducer = (state=initialState, action={}) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case SIGN_OUT:
            return {
                ...state,
                currentUser: null
            }
        case REQUEST_USERS_PENDING:
            return {...state, isPending: true}
        case REQUEST_USERS_SUCCESS:
            return {...state, isPending: false, users: action.payload }
        case REQUEST_USERS_FAILED:
            return {...state, isPending: false, error: action.payload}
        case DELETE_USER:
            return {...state, currentUser: null}
        case TOGGLE_EDIT_MODE:
            return {...state, editing: action.payload}
        case TOGGLE_REAUTH_WINDOW:
            return {...state, reauth: action.payload}
        default:
            return state;
    } 
}