import React from 'react';

const formInput = ({ name, id, type, label }) => {
  return <div className="form-field">
    <label htmlFor={id}>
      {label}
    </label>
    <input type={type} name={name} id={id}/>
  </div>
}

export default formInput;
