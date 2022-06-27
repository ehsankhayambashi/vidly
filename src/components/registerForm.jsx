import React, { useState } from "react";
import * as Form from "../services/formHelper";
import Joi from "joi";

function RegisterForm() {
  const [state, setState] = useState({
    account: { username: "", password: "", name: "" },
    errors: {},
  });

  const fieldValidation = {
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().allow(null, ""),
  };
  const schema = Joi.object({
    username: fieldValidation["username"],
    password: fieldValidation["password"],
    name: fieldValidation["name"],
  });

  function handleSubmit(e) {
    e.preventDefault();

    const errors = Form.validate(schema, state.account);
    setState((prevState) => {
      return {
        ...prevState,
        errors: errors || {},
      };
    });

    if (errors) return;
    console.log("registred");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const errors = { ...state.errors };

    const errorMessage = Form.validateField(e.target, fieldValidation);
    if (errorMessage) errors[name] = errorMessage[name];
    else delete errors[name];

    const account = { ...state.account };
    account[name] = value;
    setState((prevValue) => {
      return {
        ...prevValue,
        account,
        errors,
      };
    });
  }

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {Form.renderInput(
          "Username",
          "username",
          handleChange,
          state.account.username,
          state.errors.username
        )}
        {Form.renderInput(
          "Password",
          "password",
          handleChange,
          state.account.password,
          state.errors.password,
          "password"
        )}
        {Form.renderInput(
          "Name",
          "name",
          handleChange,
          state.account.name,
          state.errors.name
        )}
        {Form.renderButton("Submit", schema, state.account)}
      </form>
    </div>
  );
}

export default RegisterForm;
