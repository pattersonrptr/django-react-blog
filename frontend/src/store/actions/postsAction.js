import {GET_POSTS, GET_POST, CREATE_POST, UPDATE_POST, DELETE_POST, POSTS_ERROR} from '../types'
import axiosInstance from "../../axiosApi";

export const getPosts = () => async dispatch => {
    try {
        const res = await axiosInstance.get("/posts/");

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

export const getPost = (post) => async dispatch => {
    try {
        const res = await axiosInstance.get(`/posts/${post}`);

        dispatch( {
            type: GET_POST,
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
        const res = await axiosInstance.post('/posts/', post);

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
        const res = await axiosInstance.put(`/posts/${post.id}/`, post);

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
        const res = await axiosInstance.delete(`/posts/${post.id}/`);

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
