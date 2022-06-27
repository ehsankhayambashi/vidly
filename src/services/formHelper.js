import Joi from "joi";
import Input from "../components/input";
import Select from "../components/select";

export function validate(schema, data) {
  const result = schema.validate(data, { abortEarly: false });
  const errors = {};
  if (!result.error) return null;
  for (let item of result.error.details) {
    errors[item.context.key] = item.message;
  }
  return Object.keys(errors).length === 0 ? null : errors;
}

export function validateField({ name, value }, fieldValidation) {
  const obj = { [name]: value };
  const propSchema = Joi.object({ [name]: fieldValidation[name] });
  const result = propSchema.validate(obj);

  const errors = {};
  if (!result.error) return null;
  for (let item of result.error.details) {
    errors[item.context.key] = item.message;
  }
  return Object.keys(errors).length === 0 ? null : errors;
}

export function renderButton(label, schema, data) {
  return (
    <button
      type="submit"
      className="btn btn-primary"
      disabled={validate(schema, data)}
    >
      {label}
    </button>
  );
}

export function renderSelect(
  name,
  label,
  error,
  options,
  defaultOption,
  handleChange
) {
  return (
    <Select
      name={name}
      label={label}
      error={error}
      options={options}
      defaultOption={defaultOption}
      handleChange={handleChange}
    />
  );
}

export function renderInput(
  label,
  name,
  handleChange,
  value,
  error,
  type = "text"
) {
  return (
    <Input
      label={label}
      name={name}
      handleChange={handleChange}
      value={value}
      type={type}
      error={error}
    />
  );
}
