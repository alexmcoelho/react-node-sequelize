import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import DashboardReducer from '../dashboard/dashboardReducer'
import TabReducer from '../common/tab/tabReducer'
import CityReducer from '../city/cityReducer'
import CustomerReducer from '../customer/customerReducer'
import AutocompleteReducer from '../common/form/autocompleteReducer'

const rootReducer = combineReducers({
    dashboard: DashboardReducer,
    tab: TabReducer,
    city: CityReducer,
    customer: CustomerReducer,
    form: formReducer,
    autocompleteReducer: AutocompleteReducer,
    toastr: toastrReducer,
})

export default rootReducer