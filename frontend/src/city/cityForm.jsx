import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import LabelAndInput from '../common/form/labelAndInput'
import { init } from './cityActions'

class CityForm extends Component {
    
    render(){
        const { handleSubmit, readOnly } = this.props
        
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className="box-body">
                    <Field name='name' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe o nome' />
                    <Field name='uf' component={LabelAndInput} readOnly={readOnly} type='text' 
                        label='UF' cols='12 4' placeholder='Informe o UF' />
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

CityForm = reduxForm({form: 'billingCyclesForm', destroyOnUnmount: false})(CityForm)
const selector = formValueSelector('billingCyclesForm')
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(null, mapDispatchToProps)(CityForm)