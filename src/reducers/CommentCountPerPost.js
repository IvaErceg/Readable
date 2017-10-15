import { GET_COMMENT_COUNT } from '../actions';
import _ from 'lodash'

export default function (state = 0, action) {
    switch (action.type) {
        case GET_COMMENT_COUNT:
            return action.payload;
        default:
            return state;
    }
}