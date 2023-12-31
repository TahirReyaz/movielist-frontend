import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import TextInput from "../components/UI/TextInput";
import Button from "../components/UI/Button";
import { login } from "../lib/api";
import { loginAction } from "../store/AuthSlice";

type Values = {
  email: string;
  password: string;
};

const Login = () => {
  const [values, setValues] = useState<Values>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const emailValidity = () => {
    const re = /\S+@\S+\.\S+/;
    const result = re.test(values.email);
    return result;
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const validE = emailValidity();

    if (validE) {
      const response = await login(values.email, values.password);
      if (!response.error) {
        localStorage.setItem("token", response.token);
        setTimeout(() => {
          dispatch(loginAction());
        }, 3000);
        toast.success(response.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } else return;
  };

  return (
    <main className="w-5/12 bg-bgSecondary mt-16 m-auto rounded p-10">
      <h1 className="text-4xl">Login</h1>
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
          }}
        />
        <TextInput
          {...{
            label: "Password",
            type: "password",
            name: "password",
            value: values.password,
            onChange: handleChange,
          }}
        />
        <Button
          {...{
            type: "submit",
            title: "Login",
          }}
        />
      </form>
      <p>Forgot password?</p>
      <p>Not registered? Create an account</p>
    </main>
  );
};

export default Login;
