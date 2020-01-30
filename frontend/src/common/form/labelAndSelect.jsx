import React from 'react'
import Grid from '../layout/grid'
import { Field } from 'redux-form'

export default props => (
    <Grid cols={props.cols}>
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <select {...props.input}
                className='form-control' 
                placeholder={props.placeholder}
                readOnly={props.readOnly} 
                onChange={props.propOnChangeEvent} >
                    <option></option>
                    {generateSelect(props.list)}
            </select>
        </div>
    </Grid>
)

function generateSelect(list) {
    return list.map(obj => (
        <option key={obj.value} value={obj.value}>{obj.option}</option>
    ))
}
