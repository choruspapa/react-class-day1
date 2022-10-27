import * as types from "../actions/ActionTypes";

const initState = {
    no: -1
}

export default function (state = initState, action) {
    if (action.type == types.SELECT_CONTACT) {
        return {
            ...state,
            no: action.no
        }
    }
    return state;
}