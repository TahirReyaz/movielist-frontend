import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import TextInput from "../components/UI/TextInput";
import Button from "../components/UI/Button";
import { login } from "../lib/api";
import { loginAction } from "../store/AuthSlice";
import { Link } from "react-router-dom";

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
        setTimeout(() => {
          dispatch(
            loginAction({
              username: response.profile.username,
              token: response.token,
              profile: response.profile,
            })
          );
        }, 3000);
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(response.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } else {
      toast.warning("Invalid values", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <main className="sm:h-auto sm:w-5/12 bg-bgForeground m-0 sm:my-16 sm:m-auto rounded px-20 py-16">
      <h1 className="text-4xl font-semibold text-center mb-24">Login</h1>
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
            label: "Password",
            type: "password",
            name: "password",
            value: values.password,
            onChange: handleChange,
            divClasses: "my-4",
          }}
        />
        <div className="w-1/4 self-center my-4">
          <Button
            {...{
              type: "submit",
              title: "Login",
              classes: "px-0 py-4",
            }}
          />
        </div>
      </form>
      <p className="text-xl text-center">Forgot password?</p>
      <p className="text-xl text-center mt-24 hover:text-actionPrimary">
        Not registered?{" "}
        <Link to="/signup" className="text-actionPrimary">
          Create an account
        </Link>
      </p>
    </main>
  );
};

export default Login;
