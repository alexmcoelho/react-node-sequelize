const INITIAL_STATE = {obj: {}, suggestions: []}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'OBJ':
            return { ...state, obj: action.payload }
        case 'LIST_AUTOCOMPLETE':
            return { ...state, suggestions: action.payload }
        default:
            return state
    }
}