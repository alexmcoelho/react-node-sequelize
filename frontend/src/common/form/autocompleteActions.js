import axios from 'axios'
import { description } from './keyAutocomplete'

const BASE_URL = 'http://localhost:3003'
const objects = []

export function selectObj(obj) {
    removeRepit(obj)
    objects.push(obj)
    return {
        type: 'OBJ',
        payload: obj
    }
}

export async function getList(param, queryID, queryName) {
    let suggestions = []
    const regex = /(^[0-9]+)/g
    const reg = new RegExp(regex);
    if(reg.test(param)){
        param = regex.exec(param)[1]
        try {
            param = parseInt(param)
            const result = await axios.get(`${BASE_URL}/${queryID}/${param}`)
            suggestions = result.data.map(row => ({
                label: description(row.id, row.name, false),
                value: row.id,
                name: row.name ? row.name : row.descricao
            }))
        } catch (error) {
             suggestions = []
        }
    }
    else{
        try {
            const result = await axios.get(`${BASE_URL}/${queryName}/${param}`)
            suggestions = result.data.map(row => ({
                label: description(row.id, row.name, false),
                value: row.id,
                name: row.name ? row.name : row.descricao
            }))
        } catch (error) {
             suggestions = []
        }
    }

    return {
        type: 'LIST_AUTOCOMPLETE',
        payload: suggestions
    }
}

function removeRepit(obj){
    let index = 0
    for (let myObj of objects) {
        if(Object.keys(myObj)[0] === Object.keys(obj)[0]){
            objects.splice(index, 1)
            break
        }
        index++
    }
}

export function returnObj(key){
    for (let myObj of objects) {
        if(Object.keys(myObj)[0] === key){
            return myObj[key]
        }
    }
    return null
}