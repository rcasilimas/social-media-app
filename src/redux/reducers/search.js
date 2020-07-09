import { CHANGE_SEARCH_FIELD } from '../constants/search';

const initialState = {
    searchField: ''
}

export const searchReducer = (state=initialState, action={}) => {
    switch(action.type) {
        case CHANGE_SEARCH_FIELD:
            return {...state, searchField: action.payload}
        default:
            return state;
    }
} 
