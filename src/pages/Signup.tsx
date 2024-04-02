import React, { SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";

import TextInput from "../components/UI/TextInput";
import Button from "../components/UI/Button";
import { signup } from "../lib/api";
import { Link } from "react-router-dom";

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const emailValidity = () => {
    const re = /\S+@\S+\.\S+/;
    const result = re.test(values.email);
    return result;
  };

  const passwordValidity = () => {
    // regex for password validation (at least 1 uppercase, 1 lowercase, 1 number, 1 special character,  min 8 characters long)
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const result = re.test(values.password);
    return result;
  };

  const confirmPasswordValidity = () => {
    const result = values.password === values.confirmPassword;
    return result;
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const validE = emailValidity();
    const validP = passwordValidity();
    const validCP = confirmPasswordValidity();

    if (validE && validP && validCP) {
      const response = await signup(
        values.email,
        values.password,
        values.username
      );
      if (response.error) {
        toast.error(response.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        toast.success(response.message, {
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
  );
};

export default Signup;
