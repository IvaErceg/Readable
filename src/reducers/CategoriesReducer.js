import { GET_CATEGORIES } from '../actions';
import _ from 'lodash';


export default function (state = [], action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return action.payload.categories;
        default:
            return state;
    }

}