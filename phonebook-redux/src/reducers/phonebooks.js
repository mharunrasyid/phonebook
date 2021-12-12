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
} from '../constant'

const phonebooks = (state = {}, action) => {
    switch (action.type) {
        case LOAD_PHONEBOOK_SUCCESS:
            return {
                data: action.response.data,
                dataCount: action.response.dataCount
            }

        case LOAD_MORE_PHONEBOOK_SUCCESS:
            return {
                data: [
                    ...state.data,
                    ...action.response.data
                ],
                dataCount: action.response.dataCount
            }

        case ADD_PHONEBOOK_SUCCESS:
            return {
                data: [
                    ...state.data,
                    {
                        id: action.id,
                        name: action.name,
                        phone: action.phone
                    }
                ],
                dataCount: state.dataCount
            }

        case UPDATE_PHONEBOOK_SUCCESS:
            let dataEdit = state.data.map(item => {
                if (item.id === action.id) {
                    item.name = action.name
                    item.phone = action.phone
                }

                return item
            })

            return {
                data: [...dataEdit],
                dataCount: state.dataCount
            }

        case REMOVE_PHONEBOOK_SUCCESS:
            let dataDelete = state.data.filter(item => action.id !== item.id)
            return {
                data: [...dataDelete],
                dataCount: state.dataCount
            }

        case LOAD_PHONEBOOK_FAILURE:
        case LOAD_MORE_PHONEBOOK_FAILURE:
        case ADD_PHONEBOOK_FAILURE:
        case UPDATE_PHONEBOOK_FAILURE:
        case REMOVE_PHONEBOOK_FAILURE:
        default:
            return state
    }
}

export default phonebooks;