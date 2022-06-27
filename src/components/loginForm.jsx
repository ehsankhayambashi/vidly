import React, { useRef, useEffect, useState } from "react";
import Joi from "joi";
import * as Form from "../services/formHelper";

function LoginForm() {
  // const userName = useRef(null);

  const [state, setState] = useState({
    account: { username: "", password: "" },
    errors: {},
  });

  const fieldValidation = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  const schema = Joi.object({
    username: fieldValidation["username"],
    password: fieldValidation["password"],
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
    console.log("submited");
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
      <h1>Login</h1>
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
        {Form.renderButton("Submit", schema, state.account)}
      </form>
    </div>
  );
}

export default LoginForm;
