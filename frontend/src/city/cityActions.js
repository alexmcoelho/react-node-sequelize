import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003'
const INITIAL_VALUES = { credits: [{}] }

export function getList() {
    const request = axios.get(`${BASE_URL}/city`)
    return {
        type: 'CITY_FETCHED',
        payload: request
    }
}

function submit(values, method) {
    return dispatch => {
        const id = values.id ? values.id : ''
        console.log('id e method ', id)
        axios[method](`${BASE_URL}/city/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso')
                dispatch([
                    init()
                ])
            })
            .catch(e => {
                console.log('erro ', e)
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

export function showUpdate(city) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('billingCyclesForm', city)//passa os dados para o formulário
    ]
}

export function showDelete(city) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('billingCyclesForm', city)//passa os dados para o formulário
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCyclesForm', INITIAL_VALUES)
    ]
}