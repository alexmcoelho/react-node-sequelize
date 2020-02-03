import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import LabelAndInput from '../common/form/labelAndInput'
import { init } from './customerActions'
import { city } from '../common/form/keyAutocomplete'
import inputAutocomplete from '../common/form/inputAutocomplete'
import { getList } from '../common/form/autocompleteActions'
import { searchCNPJ } from './customerActions'
import { changeFieldValue } from './customerActions'
import validate from './validate'
import asyncValidate from './asyncValidate'
import renderField from '../common/form/labelAndInputValidate'

class CustomerForm extends Component {

    constructor(props) {
        super(props)
        this.handleFetch = this.handleFetch.bind(this)
        this.changeCpfCnpj = this.changeCpfCnpj.bind(this)
        this.state = {
            obj: { nameCustomer: '', CityId: '', street: '' }
        }
    }

    handleFetch({value}) {
       this.props.getList(value, "city", "city/name")
    }

    changeCpfCnpj(event){
        //this.props.changeFieldValue('registry', 'teste')
        const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
        const reg = new RegExp(regex);
        if(reg.test(event.target.value)){
            const value = event.target.value.replace(/[^\d]+/g,'')
            this.props.searchCNPJ(value)
            const obj = this.props.infoCustomer
            console.log('teste obj ', obj)
            if(obj){
                console.log('entrou')
                this.props.changeFieldValue('name', 'nameCustomer')    
                this.props.changeFieldValue('street', obj.street)    
            }
        }
    }

    render() {
        const { handleSubmit, suggestions } = this.props

        return (
            <form role='form' onSubmit={handleSubmit} >
                <div className="box-body">
                    <Field name='name' component={LabelAndInput} 
                        label='Nome' cols='12 4' placeholder='Informe o nome' />
                    <Field name='street' component={renderField} type='text'
                        label='Endereço' cols='12 4' placeholder='Informe o Endereço' />
                    <Field name='registry' component={LabelAndInput}  type='text'
                        label='CPF/CNPJ' cols='12 4' placeholder='Informe o CPF' 
                        onBlur={this.changeCpfCnpj} />
                    <Field name={city} component={inputAutocomplete} suggestions={suggestions}
                        handleFetch={this.handleFetch} returnName={false} valueJSON={city}
                        cols='12 4' label='Município' />
                </div>
                <div className="box-footer">
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className="btn btn-default"
                        onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

CustomerForm = reduxForm({ 
    form: 'customerForm',  
    destroyOnUnmount: false })(CustomerForm)
const selector = formValueSelector('customerForm')
const mapStateToProps = state => ({ 
    suggestions: state.autocompleteReducer.suggestions, 
    infoCustomer: state.customer.infoCustomer })
const mapDispatchToProps = dispatch => bindActionCreators({ init, getList, changeFieldValue, searchCNPJ }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm)