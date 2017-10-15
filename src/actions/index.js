import axios from 'axios'
export const GET_POSTS = 'GET POSTS';
export const POST_VOTE = 'POST VOTE';
export const GET_POST = 'GET POST';
export const CREATE_POST = 'CREATE POST';
export const EDIT_POST = 'EDIT POST';
export const DELETE_POST = 'DELETE POST';
export const SORT_POSTS = 'SORT POSTS';
export const GET_CATEGORIES = 'GET CATEGORIES';
export const GET_CATEGORY_POSTS = 'GET CATEGORY POSTS';
export const GET_COMMENTS = 'GET COMMENTS';
export const ADD_COMMENT = 'ADD COMMENT';
export const DELETE_COMMENT = 'DELETE COMMENT';
export const EDIT_COMMENT = 'EDIT COMMENT';
export const COMMENT_VOTE = 'COMMENT VOTE';
export const SORT_COMMENTS = 'SORT COMMENTS';
export const GET_COMMENT_COUNT = 'GET COMMENT COUNT'

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

export function orderPosts (by) {
    console.log(by);
    return { type: SORT_POSTS, payload: by }
    }
  

export function getComments(id) {
    const request = axios.get(`http://localhost:3001/posts/${id}/comments`, {
        headers: {
            'Authorization': 'iva',
            'Content-Type': 'application/json'
        }
    });
    return (dispatch) => {
        request.then(({ data }) => {
            dispatch({ type: GET_COMMENTS, payload: data })
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
            dispatch({ type: GET_COMMENT_COUNT, payload: data.length })
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

export function orderComments (by) {
    console.log(by);
    return { type: SORT_COMMENTS, payload: by }
    }
  