import * as types from "./ActionTypes";

export function selectContact(no) {
    return {
        type: types.SELECT_CONTACT,
        no: no
    };
}