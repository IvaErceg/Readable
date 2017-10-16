import { SORT_POSTS } from '../actions';
import { SORT_COMMENTS } from '../actions';

export default function (state = "timestamp", action) {
    switch (action.type) {
        case SORT_POSTS:
            return action.payload;
        case SORT_COMMENTS:
            return action.payload;
        default:
            return state;
    }

}