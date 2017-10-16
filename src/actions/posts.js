import axios from 'axios';
import { GET_POSTS } from './index';
import { GET_POST } from './index';
import { CREATE_POST } from './index';
import { DELETE_POST } from './index';
import { EDIT_POST } from './index';
import { POST_VOTE } from './index';
import { SORT_POSTS } from './index';

export function getPosts() {
    const request = axios.get(`http://localhost:3001/posts`, {
        headers: {
            'Authorization': 'iva',
            'Content-Type': 'application/json'
        }
    });
    return (dispatch) => {
        request.then(({ data }) => {
            dispatch({ type: GET_POSTS, payload: data })
        });
    }
}

export function getPost(id) {
    const request = axios.get(`http://localhost:3001/posts/${id}`, {
        headers: {
            'Authorization': 'iva',
            'Content-Type': 'application/json'
        }
    });
    return (dispatch) => {
        request.then(({ data }) => {
            dispatch({ type: GET_POST, payload: data })
        });
    }
}

export function createPost(values, callback) {
    const request = axios.post(`http://localhost:3001/posts`, JSON.stringify(values), {
        headers: {
            'Authorization': 'iva',
            'Content-Type': 'application/json'
        },
    });
    return (dispatch) => {
        request.then(({ data }) => {
            callback();
            dispatch({ type: CREATE_POST, payload: data })
        });
    }
}

export function editPost(id, values, callback) {
    const request = axios.put(`http://localhost:3001/posts/${id}`, JSON.stringify(values), {
        headers: {
            'Authorization': 'iva',
            'Content-Type': 'application/json'
        },
    });
    return (dispatch) => {
        request.then(({ data }) => {
            callback();
            dispatch({ type: EDIT_POST, payload: data })
        });
    }
}

export function deletePost(id, callback) {
    const request = axios.delete(`http://localhost:3001/posts/${id}`, {
        headers: {
            'Authorization': 'iva',
            'Content-Type': 'application/json'
        },
    });
    return (dispatch) => {
        request.then(({ data }) => {
            callback();
            dispatch({ type: DELETE_POST, payload: data })
        });
    }
}

export function voteForPost(id, option) {
    const request = axios.post(`http://localhost:3001/posts/${id}`, { option: option }, {
        headers: {
            'Authorization': 'iva',
            'Content-Type': 'application/json'
        }
    });
    return (dispatch) => {
        request.then(({ data }) => {
            dispatch({ type: POST_VOTE, payload: data })
        });
    }
}

export function orderPosts(by) {
    return { type: SORT_POSTS, payload: by }
}
