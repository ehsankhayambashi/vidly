import React from "react";

function Input(props) {
  const { label, name, handleChange, value, type, error } = props;
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        onChange={handleChange}
        value={value}
        name={name}
        type={type}
        className="form-control"
        id={name}
        autoComplete="off"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
