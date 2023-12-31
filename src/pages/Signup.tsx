import React, { SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";

import TextInput from "../components/UI/TextInput";
import Button from "../components/UI/Button";
import { signup } from "../lib/api";

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
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        toast.success(response.message, {
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
      <h1 className="text-4xl">Sign up to MovieList</h1>
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
            label: "Username",
            type: "text",
            name: "username",
            value: values.username,
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
        <TextInput
          {...{
            label: "Confirm Password",
            type: "password",
            name: "confirmPassword",
            value: values.confirmPassword,
            onChange: handleChange,
          }}
        />
        <Button
          {...{
            type: "submit",
            title: "Sign up",
          }}
        />
      </form>
      <p>Login | Resend Verification Email</p>
    </main>
  );
};

export default Signup;
