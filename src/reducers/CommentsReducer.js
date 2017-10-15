import { GET_COMMENTS } from '../actions';
import { ADD_COMMENT } from '../actions';
import { EDIT_COMMENT } from '../actions';
import { DELETE_COMMENT } from '../actions';
import { COMMENT_VOTE } from '../actions';
import { GET_COMMENT_COUNT } from '../actions';
import _ from 'lodash'


export default function (state = [], action) {
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload;
        case GET_COMMENT_COUNT:
        return (_.mapKeys(action.payload, "parentId"));
        case ADD_COMMENT:
            return state.concat(action.payload)
        case DELETE_COMMENT:
            return state.filter(comment => comment.id !== action.payload.id);
        case EDIT_COMMENT:
            return [...state, ...action.payload];
        case COMMENT_VOTE:
            return [...state, ...action.payload];


        default:
            return state;
    }

}