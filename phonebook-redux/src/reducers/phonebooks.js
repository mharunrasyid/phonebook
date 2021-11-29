import {
    LOAD_PHONEBOOK_SUCCESS,
    LOAD_PHONEBOOK_FAILURE,
    ADD_PHONEBOOK_SUCCESS,
    ADD_PHONEBOOK_FAILURE,
    UPDATE_PHONEBOOK_SUCCESS,
    UPDATE_PHONEBOOK_FAILURE,
    REMOVE_PHONEBOOK_SUCCESS,
    REMOVE_PHONEBOOK_FAILURE,
} from '../constant'

const phonebooks = (state = [], action) => {
    switch (action.type) {
        case LOAD_PHONEBOOK_SUCCESS:
            return action.phonebooks

        case ADD_PHONEBOOK_SUCCESS:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    phone: action.phone
                }
            ]

        case UPDATE_PHONEBOOK_SUCCESS:
            return state.map(item => {
                if (item.id === action.id) {
                    item.name = action.name
                    item.phone = action.phone
                }

                return item
            })

        case REMOVE_PHONEBOOK_SUCCESS:
            return state.filter(item => action.id !== item.id)

        case LOAD_PHONEBOOK_FAILURE:
        case ADD_PHONEBOOK_FAILURE:
        case UPDATE_PHONEBOOK_FAILURE:
        case REMOVE_PHONEBOOK_FAILURE:
        default:
            return state
    }
}

export default phonebooks;