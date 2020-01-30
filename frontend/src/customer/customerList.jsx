import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { getList, showUpdate, showDelete } from './customerActions'
import LabelAndInput from '../common/form/labelAndInput'
import LabelAndSelect from '../common/form/labelAndSelect'
import If from '../common/operator/if'

//exemplo de container
class CustomerList extends Component {
    
    componentWillMount() {
        this.props.getList()
        this.handleSelect = this.handleSelect.bind(this)
        this.setState({
            valueSelect: 'nameCustomer'
        })
    }

    renderRows(){
        const list = this.props.list || []
        return list.map(obj => (
            <tr key={obj.id}>
                <td>{obj.name}</td>
                <td>{obj.street}</td>
                <td>{obj.registry}</td>
                <td>{obj.City.name}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(obj)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.props.showDelete(obj)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ))
    }

    handleSelect(event){
        const value = event.target.value
        this.setState({ valueSelect: value })
    }
    
    render() {
        const { handleSubmit } = this.props
        const listOptions = [
            {
                value: 'nameCustomer',
                option: 'Nome'    
            },
            {
                value: 'street',
                option: 'Endereço'    
            },
            {
                value: 'registry',
                option: 'CPF'    
            },
            {
                value: 'city',
                option: 'Município'    
            }
        ]
        return (

            <div>
                <form role='form' onSubmit={handleSubmit} >
                    <div className="box-body">
                        <LabelAndSelect name='options' 
                            label='Filtro' cols='12 4' placeholder='Informe o filtro'
                            list={listOptions} propOnChangeEvent={this.handleSelect} />
                        <If test={this.state.valueSelect === 'nameCustomer'}>
                            <Field name='nameCustomer' component={LabelAndInput} 
                                label='Nome' cols='12 4' placeholder='Informe o nome' />
                        </If>
                        <If test={this.state.valueSelect === 'street'}>
                            <Field name='street' component={LabelAndInput} 
                                label='Endereço' cols='12 4' placeholder='Informe o Endereço' />
                        </If>
                        <If test={this.state.valueSelect === 'registry'}>
                            <Field name='registry' component={LabelAndInput} 
                                label='CPF' cols='12 4' placeholder='Informe o CPF' />
                        </If>
                        <If test={this.state.valueSelect === 'city'}>
                            <Field name='city' component={LabelAndInput} 
                                label='Município' cols='12 4' placeholder='Informe o Município' />
                        </If>
                        
                        <div className="col-xs-12 col-sm-4">
                            <label style={{'visibility': 'hidden'}}>Pesquisa</label><br/>
                            <button type='submit' className='btn btn-primary'>
                                Pesquisar
                            </button>
                        </div>
                    </div>
                </form>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>CPF</th>
                            <th>Município</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

CustomerList = reduxForm({ form: 'customerSearch', destroyOnUnmount: false })(CustomerList)
//dizendo qual atributo do reducer vai se tornar um atributo desse componente, nesse caso o list
//state pega os estados de todos os componentes
const mapStateToProps = state => ({ list: state.customer.list })
//funções que eu quero fazer o dispatch, ou seja, quando a função ser chamada, a action vai ser criada e em seguida 
//será feito o dispatch, ou seja, chamará os reducers
const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdate, showDelete }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CustomerList)