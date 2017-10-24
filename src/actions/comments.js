import axios from 'axios';
import { GET_COMMENTS } from './index';
import { ADD_COMMENT } from './index';
import { EDIT_COMMENT } from './index';
import { DELETE_COMMENT } from './index';
import { COMMENT_VOTE } from './index';
import { SORT_COMMENTS } from './index';
import { GET_COMMENT_COUNT } from './index';

export function getComments(id) {
    const request = axios.get(`http://localhost:3001/posts/${id}/comments`, {
        headers: {
            'Authorization': 'iva',
            'Content-Type': 'application/json'
        }
    });
    return (dispatch) => {
        request.then(({ data }) => {
            dispatch({ type: GET_COMMENTS, payload: data, id: id })
        });
    }
}

export function getCommentCount(id) {
    const request = axios.get(`http://localhost:3001/posts/${id}/comments`, {
        headers: {
            'Authorization': 'iva',
            'Content-Type': 'application/json'
        }
    });
    return (dispatch) => {
        request.then(({ data }) => {
            dispatch({ type: GET_COMMENT_COUNT, payload: data, id: id })
        });
    }
}

export function addComment(values, callback) {
    const request = axios.post(`http://localhost:3001/comments`, JSON.stringify(values), {
        headers: {
            'Authorization': 'iva',
            'Content-Type': 'application/json'
        },
    });
    return (dispatch) => {
        request.then(({ data }) => {
            callback();
            dispatch({ type: ADD_COMMENT, payload: data })
        });
    }
}


export function deleteComment(id, callback) {
    const request = axios.delete(`http://localhost:3001/comments/${id}`, {
        headers: {
            'Authorization': 'iva',
            'Content-Type': 'application/json'
        },
    });
    return (dispatch) => {
        request.then(({ data }) => {
            callback();
            dispatch({ type: DELETE_COMMENT, payload: data })
        });
    }
}


export function editComment(id, values, callback) {
    const request = axios.put(`http://localhost:3001/comments/${id}`, JSON.stringify(values), {
        headers: {
            'Authorization': 'iva',
            'Content-Type': 'application/json'
        },
    });
    return (dispatch) => {
        request.then(({ data }) => {
            callback();
            dispatch({ type: EDIT_COMMENT, payload: data })
        });
    }
}

export function voteForComment(id, option, callback) {
    const request = axios.post(`http://localhost:3001/comments/${id}`, { option: option }, {
        headers: {
            'Authorization': 'iva',
            'Content-Type': 'application/json'
        }
    });
    return (dispatch) => {
        request.then(({ data }) => {
            callback();
            dispatch({ type: COMMENT_VOTE, payload: data })
        });
    }
}

export function orderComments(by) {
    return { type: SORT_COMMENTS, payload: by }
}
