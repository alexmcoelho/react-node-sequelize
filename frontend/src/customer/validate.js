const validate = values => {
    const errors = {}
    if (!values.street) {
      errors.street = 'Required'
    }
    return errors
  }
  
  export default validate