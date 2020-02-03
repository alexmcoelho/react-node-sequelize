const INITIAL_STATE = { list: [], infoCustomer: {} }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CUSTOMER_FETCHED':
            return { ...state, list: action.payload.data }
        case 'CUSTOMER_SEARCH':
            return { ...state, list: action.payload.data }
        case 'CUSTOMER_SEARCH_REGISTRY':
            return { ...state, infoCustomer: action.payload }
        default:
            return state
    }
}