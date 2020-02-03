import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize, change } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'
import { returnObj } from '../common/form/autocompleteActions'
import { city, description } from '../common/form/keyAutocomplete'
import { selectObj } from '../common/form/autocompleteActions'

const BASE_URL = 'http://localhost:3003'
const INITIAL_VALUES = { options: 'nameCustomer' }

export function getList() {
    return [
        initialize('customerSearch', INITIAL_VALUES),
        returnList()
    ]
}

export function returnList() {
    const request = axios.get(`${BASE_URL}/customer`)
    return {
        type: 'CUSTOMER_FETCHED',
        payload: request
    }
}

export function search(values){
    let complementQuery = ''
    let param = ''
    console.log('values', values)
    switch (values.options) {
        case 'nameCustomer':
            complementQuery = 'name'
            param = values.nameCustomer
            break;
        case 'street':
            complementQuery = 'street'
            param = values.street
            break;
        case 'registry':
            complementQuery = 'registry'
            param = values.registry
            break;
        case 'city':
            complementQuery = 'city'
            param = values.city
            break;
    
        default:
            break;
    }

    const request = axios.get(`${BASE_URL}/customer/${complementQuery}/${param}`)
    return {
        type: 'CUSTOMER_SEARCH',
        payload: request
    }
}

export async function searchCNPJ(param){
    let obj = {}
    try {
        const result = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.receitaws.com.br/v1/cnpj/${param}`)
        obj = {
            nameCustomer: result.data.nome,
            CityId: result.data.municipio,
            street: result.data.logradouro
        }
    } catch (error) {
         obj = {}
    }
    return {
        type: 'CUSTOMER_SEARCH_REGISTRY',
        payload: obj
    }
}

export function changeFieldValue(field, value) {
    return [
        change('customerForm', field, value)
    ] 
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