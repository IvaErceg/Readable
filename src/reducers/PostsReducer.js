import _ from 'lodash';
import { GET_POSTS } from '../actions';
import { GET_POST } from '../actions';
import { DELETE_POST } from '../actions';
import { EDIT_POST } from '../actions';
import { POST_VOTE } from '../actions';

//ideas from Stephen Grinder's Modern React with Redux course
export default function (state = {}, action) {
    const post = action.payload;
    switch (action.type) {
        case GET_POSTS:
            return (_.mapKeys(post, "id"));
        case GET_POST:
            return { ...state, [post.id]: post };
        case EDIT_POST:
            return { ...state, [post.id]: post };
        case DELETE_POST:
            return _.omit(state, [post.id]);
        case POST_VOTE:
            return {
                ...state,
                [post.id]: post
            };
        default:
            return state;
    }

}