import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'
import { returnObj } from '../common/form/autocompleteActions'
import { city, description } from '../common/form/keyAutocomplete'
import { selectObj } from '../common/form/autocompleteActions'

const BASE_URL = 'http://localhost:3003'
const INITIAL_VALUES = { credits: [{}] }

export function getList() {
    const request = axios.get(`${BASE_URL}/customer`)
    return {
        type: 'CUSTOMER_FETCHED',
        payload: request
    }
}

function submit(v, method) {
    const cityId = returnObj(city)
    const values = {...v, CityId: cityId }
    
    return dispatch => {
        const id = values.id ? values.id : ''
        axios[method](`${BASE_URL}/customer/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso')
                dispatch([
                    init()
                ])
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function create(values) {
    return submit(values, 'post')
}

export function update(values) {
    return submit(values, 'patch')
}

export function remove(values) {
    return submit(values, 'delete')
}

export function showUpdate(customer) {
    let cit = {id: customer.City.id, name: customer.City.name}
    let CityId = description(cit.id, cit.name, false)
    customer = {...customer, CityId}
    //inserindo na lista
    let obj = new Object
    obj[city] = cit.id
    selectObj(obj)
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('customerForm', customer)//passa os dados para o formulário
    ]
}

export function showDelete(customer) {
    let cit = {id: customer.City.id, name: customer.City.name}
    let CityId = description(cit.id, cit.name, false)
    customer = {...customer, CityId}
    //inserindo na lista
    let obj = new Object
    obj[city] = cit.id
    selectObj(obj)
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('customerForm', customer)//passa os dados para o formulário
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('customerForm', INITIAL_VALUES)
    ]
}