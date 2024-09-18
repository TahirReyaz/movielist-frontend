import React, { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import TextInput from "../components/UI/TextInput";
import Button from "../components/UI/Button";
import { signup } from "../lib/api";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../utils/toastUtils";
import { useLoadingBar } from "../components/UI/LoadingBar";
import { passwordValidity } from "../lib/helpers";

type Values = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const [values, setValues] = useState<Values>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const loadingBar = useLoadingBar();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const emailValidity = () => {
    const re = /\S+@\S+\.\S+/;
    const result = re.test(values.email);
    return result;
  };

  const usernameValidity = () => {
    const re = /\s/;
    const result = re.test(values.username);
    return !result;
  };

  const confirmPasswordValidity = () => {
    const result = values.password === values.confirmPassword;
    return result;
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const validU = usernameValidity();
    const validE = emailValidity();
    const validP = passwordValidity(values.password);
    const validCP = confirmPasswordValidity();

    if (validE && validP && validCP && validU) {
      try {
        loadingBar.current?.continuousStart();
        const response = await signup(
          values.email,
          values.password,
          values.username
        );
        loadingBar.current?.complete();
        showSuccessToast(response.message);
        navigate("/login");
      } catch (error: any) {
        loadingBar.current?.complete();
        showErrorToast(error.message);
      }
    } else {
      let msg = "Confirm password must be same as password";
      if (!validE) {
        msg = "Email id not valid";
      } else if (!validP) {
        msg =
          "Password must have minimum length of 8 characters, contain a capital and a small letter, contain a number and a special character";
      } else if (!validU) {
        msg = "Username must not contain whitespace";
      }
      showWarningToast(msg);
    }
  };

  return (
    <>
      <Helmet>
        <title>{"Signup · MovieList"}</title>
      </Helmet>
      <main className="sm:h-auto sm:w-5/12 bg-bgForeground m-0 sm:my-16 sm:m-auto rounded px-20 py-16">
        <h1 className="text-4xl font-semibold text-center mb-24">
          Sign up to MovieList
        </h1>
        <form
          className="flex flex-col align-center justify-center"
          onSubmit={handleSubmit}
        >
          <TextInput
            {...{
              label: "Email",
              type: "email",
              name: "email",
              value: values.email,
              onChange: handleChange,
              divClasses: "my-4",
            }}
          />
          <TextInput
            {...{
              label: "Username",
              type: "text",
              name: "username",
              value: values.username,
              onChange: handleChange,
              divClasses: "my-4",
            }}
          />
          <TextInput
            {...{
              label: "Password",
              type: "password",
              name: "password",
              value: values.password,
              onChange: handleChange,
              divClasses: "my-4",
            }}
          />
          <TextInput
            {...{
              label: "Confirm Password",
              type: "password",
              name: "confirmPassword",
              value: values.confirmPassword,
              onChange: handleChange,
              divClasses: "my-4",
            }}
          />
          <div className="flex items-center justify-center my-12">
            <input type="checkbox" />
            <span className="ms-4">
              You agree to our{" "}
              <Link to="/terms" className="hover:text-actionPrimary">
                terms of service
              </Link>
            </span>
          </div>
          <div className="w-1/4 self-center my-4">
            <Button
              {...{
                type: "submit",
                title: "Sign up",
                classes: "px-0 py-4",
              }}
            />
          </div>
        </form>
        <p className="text-xl text-center mt-24">
          <Link to="/login" className="hover:text-actionPrimary">
            Login
          </Link>{" "}
          ·{" "}
          <Link to="#" className="hover:text-actionPrimary">
            Resend Verification Email
          </Link>
        </p>
      </main>
    </>
  );
};

export default Signup;
