import React from "react";

function Select(props) {
  const { label, name, error, options, defaultOption, handleChange } = props;

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        defaultValue={defaultOption}
        className="form-control"
        id={name}
        name={name}
        onChange={handleChange}
      >
        {options.map((op) => (
          <option value={op.name} key={op._id}>
            {op.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Select;
