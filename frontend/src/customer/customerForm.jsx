import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import LabelAndInput from '../common/form/labelAndInput'
import { init } from './customerActions'
import { city } from '../common/form/keyAutocomplete'
import inputAutocomplete from '../common/form/inputAutocomplete'
import { getList } from '../common/form/autocompleteActions'

class CustomerForm extends Component {

    constructor(props) {
        super(props)
        this.handleFetch = this.handleFetch.bind(this)
    }

    handleFetch({value}) {
       this.props.getList(value, "city", "city/name")
    }

    render() {
        const { handleSubmit, suggestions } = this.props

        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className="box-body">
                    <Field name='name' component={LabelAndInput} 
                        label='Nome' cols='12 4' placeholder='Informe o nome' />
                    <Field name='street' component={LabelAndInput} type='text'
                        label='Endereço' cols='12 4' placeholder='Informe o Endereço' />
                    <Field name='registry' component={LabelAndInput}  type='text'
                        label='CPF' cols='12 4' placeholder='Informe o CPF' />
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

CustomerForm = reduxForm({ form: 'customerForm', destroyOnUnmount: false })(CustomerForm)
const selector = formValueSelector('customerForm')
const mapStateToProps = state => ({ suggestions: state.autocompleteReducer.suggestions })
const mapDispatchToProps = dispatch => bindActionCreators({ init, getList }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm)