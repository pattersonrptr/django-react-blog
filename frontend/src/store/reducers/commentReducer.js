import {GET_COMMENTS, CREATE_COMMENT} from '../types'

const initialState = {
    comments: [],
    loading: true
}

export default function(state = initialState, action){

    switch(action.type){

        case GET_COMMENTS: return {
                ...state,
                comments: action.payload,
                loading: false
            }

        case CREATE_COMMENT: return {
                ...state,
                posts: action.payload,
                loading: false
            }

        default: return state
    }
}
