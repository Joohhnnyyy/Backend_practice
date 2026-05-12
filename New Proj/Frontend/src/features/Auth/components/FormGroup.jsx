import React from 'react'

const FormGroup = ({ label, id, placeholder, type = 'text', required = false, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        value = {value}
        onChange = {onChange}
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}

export default FormGroup