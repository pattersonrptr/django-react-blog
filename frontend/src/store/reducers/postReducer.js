import {GET_POSTS, CREATE_POST, UPDATE_POST, DELETE_POST} from '../types'

const initialState = {
    posts: [],
    loading: true
}

export default function(state = initialState, action){

    switch(action.type){

        case GET_POSTS: return {
                ...state,
                posts: action.payload,
                loading: false
            }

        case CREATE_POST: return {
                ...state,
                posts: action.payload,
                loading: false
            }

        case UPDATE_POST: return {
                ...state,
                posts: action.payload,
                loading: false
            }

        case DELETE_POST: return {
                ...state,
                posts: action.payload,
                loading: false
            }

        default: return state
    }

}