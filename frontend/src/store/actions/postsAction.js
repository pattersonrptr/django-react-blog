import {GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST, POSTS_ERROR} from '../types'
import axios from 'axios'

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get("/api/posts/");

        dispatch( {
            type: GET_POSTS,
            payload: res.data
        });
    }
    catch(e){
        dispatch( {
            type: POSTS_ERROR,
            payload: console.log(e),
        })
    }
}

export const createPost = (post) => async dispatch => {
    try {
        const res = await axios.post('/api/posts/', post);

        dispatch( {
            type: CREATE_POST,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: POSTS_ERROR,
            payload: console.log(e),
        })
    }
}

export const updatePost = (post) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/${post.id}/`, post);

        dispatch( {
            type: UPDATE_POST,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: POSTS_ERROR,
            payload: console.log(e),
        })
    }
}

export const deletePost = (post) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${post.id}/`);

        dispatch( {
            type: DELETE_POST,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: POSTS_ERROR,
            payload: console.log(e),
        })
    }
}
