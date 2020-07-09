import { CHANGE_SEARCH_FIELD } from '../constants/search';

export const setSearchField = text => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
})
