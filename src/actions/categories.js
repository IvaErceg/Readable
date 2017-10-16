import axios from 'axios';
import { GET_CATEGORIES } from './index';
import { GET_CATEGORY_POSTS } from './index';

export function getCategories() {
    const request = axios.get(`http://localhost:3001/categories`, {
        headers: {
            'Authorization': 'iva',
            'Content-Type': 'application/json'
        }
    });
    return (dispatch) => {
        request.then(({ data }) => {
            dispatch({ type: GET_CATEGORIES, payload: data })
        });
    }
}

export function getCategoryPosts(category) {
    const request = axios.get(`http://localhost:3001/${category}/posts`, {
        headers: {
            'Authorization': 'iva',
            'Content-Type': 'application/json'
        }
    });
    return (dispatch) => {
        request.then(({ data }) => {
            console.log(data);
            dispatch({ type: GET_CATEGORY_POSTS, payload: data })
        });
    }
}