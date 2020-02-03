import React from 'react'
import Grid from '../layout/grid'

const renderField = ({
    input,
    label,
    type,
    cols,
    placeholder,
    readOnly,
    name,
    meta: { asyncValidating, touched, error, warning }
  }) => (
    <Grid cols={cols}>

        <div className={`form-group ${touched && error ? 'has-error' : ''}`}>
            <label htmlFor={name}>{label}</label>
            <input {...input} className='form-control'
                placeholder={placeholder}
                readOnly={readOnly} type={type} />
            <div className="help-block">
            {touched &&
                ((error && <span>teste</span>) ||
                (warning && <span>{warning}</span>))}
            </div>
        </div>
    </Grid>
    
)

export default renderField