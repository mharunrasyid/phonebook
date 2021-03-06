import {
    LOAD_PHONEBOOK_SUCCESS,
    LOAD_PHONEBOOK_FAILURE,
    LOAD_MORE_PHONEBOOK_SUCCESS,
    LOAD_MORE_PHONEBOOK_FAILURE,
    ADD_PHONEBOOK_SUCCESS,
    ADD_PHONEBOOK_FAILURE,
    UPDATE_PHONEBOOK_SUCCESS,
    UPDATE_PHONEBOOK_FAILURE,
    REMOVE_PHONEBOOK_SUCCESS,
    REMOVE_PHONEBOOK_FAILURE,
} from "../constant";

import * as GraphQl from "../service/graphql";

const loadPhonebookSuccess = (response) => ({
    type: LOAD_PHONEBOOK_SUCCESS,
    response
})

const loadPhonebookFailure = () => ({
    type: LOAD_PHONEBOOK_FAILURE
})

export const loadPhonebook = (name, phone, limit, offset) => {
    return dispatch => {
        return GraphQl.loadPhonebooks(name, phone, limit, offset)
            .then(function (response) {
                dispatch(loadPhonebookSuccess(response))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(loadPhonebookFailure())
            });
    }
}

const loadMorePhonebookSuccess = (response) => ({
    type: LOAD_MORE_PHONEBOOK_SUCCESS,
    response
})

const loadMorePhonebookFailure = () => ({
    type: LOAD_MORE_PHONEBOOK_FAILURE
})

export const loadMorePhonebook = (name, phone, limit, offset) => {
    return dispatch => {
        return GraphQl.loadPhonebooks(name, phone, limit, offset)
            .then(function (response) {
                dispatch(loadMorePhonebookSuccess(response))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(loadMorePhonebookFailure())
            });
    }
}

const drawAddPhonebook = (id, name, phone) => ({
    type: ADD_PHONEBOOK_SUCCESS,
    id,
    name,
    phone
})

const addPhonebookFailure = () => ({
    type: ADD_PHONEBOOK_FAILURE,
})

export const addPhonebook = (name, phone) => {
    return dispatch => {
        return GraphQl.addPhonebook(name, phone)
            .then(function (data) {
                dispatch(drawAddPhonebook(data.id, name, phone))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(addPhonebookFailure())
            });
    }
}

const updatePhonebookSuccess = (id, name, phone) => ({
    type: UPDATE_PHONEBOOK_SUCCESS,
    id,
    name,
    phone
})

const updatePhonebookFailure = () => ({
    type: UPDATE_PHONEBOOK_FAILURE
})

export const updatePhonebook = (id, name, phone) => {
    return dispatch => {
        return GraphQl.updatePhonebook(id, name, phone).then((data) => {
            dispatch(updatePhonebookSuccess(data.id, data.name, data.phone))
        }).catch(err => {
            dispatch(updatePhonebookFailure())
        })
    }
}

const removePhonebookSuccess = (id) => ({
    type: REMOVE_PHONEBOOK_SUCCESS,
    id
})

const removePhonebookFailure = () => ({
    type: REMOVE_PHONEBOOK_FAILURE
})

export const removePhonebook = (id, name, phone) => {
    return dispatch => {
        return GraphQl.removePhonebook(id, name, phone).then(() => {
            dispatch(removePhonebookSuccess(id))
        }).catch(err => {
            dispatch(removePhonebookFailure())
        })
    }
}
