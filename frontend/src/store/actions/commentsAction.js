import {GET_COMMENTS, CREATE_COMMENT, COMMENTS_ERROR} from '../types'
import axiosInstance from "../../axiosApi";

export const getComments = (post_id) => async dispatch => {
    try {
        const res = await axiosInstance.get(`/comments/?post_id=${post_id}`);

        dispatch({
            type: GET_COMMENTS,
            payload: res.data
        });
    }
    catch(e){
        dispatch({
            type: COMMENTS_ERROR,
            payload: console.log(e),
        });
    }
}

export const createComment = (comment) => async dispatch => {
    try {
        const res = await axiosInstance.post('/comments/', comment);

        console.log("COMMENT")
        console.log(comment)

        dispatch( {
            type: CREATE_COMMENT,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: COMMENTS_ERROR,
            payload: console.log(e),
        })
    }
}
