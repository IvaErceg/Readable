import { GET_COMMENT_COUNT } from '../actions';
// similar soultion found on slack
export default function (state = { count: 0 }, action) {
    switch (action.type) {
        case GET_COMMENT_COUNT:
            return {
                ...state,
                count: {
                    ...state['count'],
                    [action.id]: action.payload.length
                }
            };
        default:
            return state;
    }
}