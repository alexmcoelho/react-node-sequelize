import axios from 'axios'
import { changeFieldValue } from './customerActions'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values /*, dispatch */) => {
    console.log('values ', values)
    let regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
    let reg = new RegExp(regex);

    let regexCPF = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
    let regCPF = new RegExp(regexCPF);
    
    return sleep(300).then(() => {
      if(values.registry){
        if(!reg.test(values.registry)){
          if(!regCPF.test(values.registry)){
            throw {registry: 'Número de registro inválido'}
          }
        }
        changeFieldValue('street', 'teste')
      }
    })
}

export default asyncValidate