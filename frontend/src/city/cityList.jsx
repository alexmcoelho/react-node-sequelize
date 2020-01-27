import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './cityActions'

//exemplo de container
class CityList extends Component {

    componentWillMount() {
        this.props.getList()
    }

    renderRows(){
        const list = this.props.list || []
        return list.map(obj => (
            <tr key={obj.id}>
                <td>{obj.name}</td>
                <td>{obj.uf}</td>
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
    
    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>UF</th>
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

//dizendo qual atributo do reducer vai se tornar um atributo desse componente, nesse caso o list
//state pega os estados de todos os componentes
const mapStateToProps = state => ({ list: state.city.list })
//funções que eu quero fazer o dispatch, ou seja, quando a função ser chamada, a action vai ser criada e em seguida 
//será feito o dispatch, ou seja, chamará os reducers
const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdate, showDelete }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CityList)